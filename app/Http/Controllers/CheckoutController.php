<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\PedidoRecibidoNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /* ─────────────────────────────────────────────
     * GET /checkout
     * Página de checkout — genera la firma de integridad
     * ───────────────────────────────────────────── */
    public function index()
    {
        $user  = auth()->user();
        $cart  = Cart::forUser($user->id);
        $items = $cart->items()
            ->with(['animal' => fn($q) => $q->with('farm')])
            ->get();

        // Validar que todos los ítems siguen disponibles
        $disponibles = $items->filter(
            fn($i) => $i->animal
                && ! $i->animal->trashed()
                && $i->animal->status === 'Publicado'
                && $i->animal->publication_date !== null
        );

        if ($disponibles->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Tu carrito no tiene animales disponibles.');
        }

        $totalCOP    = (int) ($disponibles->sum('price_snapshot') * 100); // Wompi trabaja en centavos
        $reference   = 'HM-' . strtoupper(Str::random(10));
        $amountStr   = (string) $totalCOP;
        $currency    = 'COP';
        $integritySecret = config('services.wompi.integrity_secret');

        // Firma de integridad SHA-256: reference + amount_in_cents + currency + integrity_secret
        $signature = hash('sha256', $reference . $amountStr . $currency . $integritySecret);

        return Inertia::render('Checkout/Index', [
            'publicKey'     => config('services.wompi.public_key'),
            'reference'     => $reference,
            'amountInCents' => $totalCOP,
            'currency'      => $currency,
            'signature'     => $signature,
            'redirectUrl'   => route('checkout.result'),
            'userEmail'     => $user->email,
            'userName'      => $user->name,
            'total'         => $disponibles->sum('price_snapshot'),
            'itemCount'     => $disponibles->count(),
        ]);
    }

    /* ─────────────────────────────────────────────
     * GET /checkout/resultado
     * Wompi redirige aquí con ?id=TRANSACTION_ID
     * ───────────────────────────────────────────── */
    public function result(Request $request)
    {
        $wompiTransactionId = $request->query('id');

        if (! $wompiTransactionId) {
            return redirect()->route('cart.index');
        }

        // Consultar el estado real a la API de Wompi
        $wompiData = $this->fetchWompiTransaction($wompiTransactionId);

        if (! $wompiData) {
            return Inertia::render('Checkout/Result', [
                'status'    => 'error',
                'message'   => 'No se pudo verificar el pago. Contacta a soporte.',
                'reference' => null,
            ]);
        }

        $reference = $wompiData['reference'] ?? null;
        $status    = strtolower($wompiData['status'] ?? 'error');

        // Si la transacción ya fue procesada, mostrar resultado sin re-procesar
        $existingTx = Transaction::where('wompi_id', $wompiTransactionId)->first();
        if ($existingTx) {
            $order = Order::where('transaction_id', $existingTx->id)->first();
            return Inertia::render('Checkout/Result', [
                'status'    => $status,
                'reference' => $reference,
                'orderId'   => $order?->id,
            ]);
        }

        if ($status === 'approved') {
            $order = $this->createOrderFromCart(auth()->user(), $wompiData, $reference);
            return Inertia::render('Checkout/Result', [
                'status'    => 'approved',
                'reference' => $reference,
                'orderId'   => $order?->id,
            ]);
        }

        return Inertia::render('Checkout/Result', [
            'status'    => $status, // pending, declined, voided, error
            'reference' => $reference,
            'orderId'   => null,
        ]);
    }

    /* ─────────────────────────────────────────────
     * POST /webhook/wompi
     * Webhook de eventos Wompi (transaction.updated)
     * ───────────────────────────────────────────── */
    public function webhook(Request $request)
    {
        // 1. Verificar firma del webhook
        $payload   = $request->all();
        $event     = $payload['event'] ?? '';
        $timestamp = $payload['timestamp'] ?? '';
        $signature = $payload['signature']['checksum'] ?? '';
        $secret    = config('services.wompi.events_secret');

        $expectedSignature = hash(
            'sha256',
            ($payload['data']['transaction']['id'] ?? '') . $timestamp . $secret
        );

        if (! hash_equals($expectedSignature, $signature)) {
            Log::warning('Wompi webhook: firma inválida', compact('payload'));
            return response()->json(['ok' => false], 401);
        }

        if ($event !== 'transaction.updated') {
            return response()->json(['ok' => true]);
        }

        $tx     = $payload['data']['transaction'];
        $status = strtolower($tx['status']);
        $wompiId   = $tx['id'];
        $reference = $tx['reference'];

        // Idempotencia: si ya procesamos esta transacción con este estado, salir
        $existingTx = Transaction::where('wompi_id', $wompiId)->first();

        if ($status === 'approved' && ! $existingTx) {
            // Buscar el usuario por referencia temporal — la guardamos en el carrito o la inferimos
            // La referencia tiene formato HM-XXXXXXXXXX; buscamos la orden si ya fue creada desde /resultado
            $order = Order::where('reference', $reference)->first();
            if (! $order) {
                // El usuario llegó directo sin pasar por /resultado — crear la orden ahora
                // Necesitamos el user_id: Wompi no lo envía, pero podemos encontrarlo
                // via customer_email del payload
                $email = $tx['customer_email'] ?? null;
                $user  = $email ? User::where('email', $email)->first() : null;
                if ($user) {
                    $this->createOrderFromCart($user, $tx, $reference);
                }
            }
        } elseif (in_array($status, ['declined', 'voided', 'error']) && $existingTx) {
            // Actualizar estado de la transacción y el pedido
            $existingTx->update(['transaction_status' => $status === 'voided' ? 'reembolsada' : 'rechazada']);
            $order = Order::where('transaction_id', $existingTx->id)->first();
            if ($order) {
                $order->update(['payment_status' => $status === 'declined' ? 'Rechazado' : 'Reembolsado']);
            }
        }

        return response()->json(['ok' => true]);
    }

    /* ─────────────────────────────────────────────
     * Helpers privados
     * ───────────────────────────────────────────── */

    private function fetchWompiTransaction(string $wompiId): ?array
    {
        $sandbox = config('services.wompi.sandbox', true);
        $baseUrl = $sandbox
            ? 'https://sandbox.wompi.co/v1'
            : 'https://production.wompi.co/v1';

        try {
            $response = \Illuminate\Support\Facades\Http::withToken(config('services.wompi.private_key'))
                ->get("{$baseUrl}/transactions/{$wompiId}");

            if ($response->successful()) {
                return $response->json('data');
            }
        } catch (\Throwable $e) {
            Log::error('Wompi fetchTransaction error', ['error' => $e->getMessage()]);
        }

        return null;
    }

    private function createOrderFromCart(User $user, array $wompiTx, string $reference): ?Order
    {
        $cart  = Cart::forUser($user->id);
        $items = $cart->items()
            ->with(['animal' => fn($q) => $q->with('farm')])
            ->get();

        $disponibles = $items->filter(
            fn($i) => $i->animal
                && ! $i->animal->trashed()
                && $i->animal->status === 'Publicado'
                && $i->animal->publication_date !== null
        );

        if ($disponibles->isEmpty()) {
            return null;
        }

        return DB::transaction(function () use ($user, $wompiTx, $reference, $disponibles, $cart) {
            // 1. Crear la transacción
            $amountCents = $wompiTx['amount_in_cents'] ?? ($wompiTx['amount'] ?? 0);
            $amountPesos = is_int($amountCents) && $amountCents > 999999
                ? $amountCents / 100   // viene en centavos de Wompi
                : $amountCents;

            $transaction = Transaction::create([
                'wompi_id'            => $wompiTx['id'],
                'internal_reference'  => $reference,
                'transaction_date'    => now(),
                'moneda'              => $wompiTx['currency'] ?? 'COP',
                'amount'              => $amountPesos,
                'transaction_status'  => 'aprobada',
                'transaction_type'    => 'compra',
            ]);

            // 2. Crear el pedido
            $order = Order::create([
                'date'             => now(),
                'bussiness_status' => 'Pendiente de confirmacion',
                'payment_status'   => 'Aprobado',
                'subtotal'         => $disponibles->sum('price_snapshot'),
                'reference'        => $reference,
                'user_id'          => $user->id,
                'transaction_id'   => $transaction->id,
            ]);

            // 3. Adjuntar animales y marcarlos como Reservado
            //    Agrupar por ganadero (farm->user_id) para notificaciones
            $ganaderoAnimales = [];

            foreach ($disponibles as $item) {
                $animal   = $item->animal;
                $farmUser = $animal->farm?->users()->first(); // dueño de la finca

                $order->animals()->attach($animal->id, [
                    'user_id'        => $farmUser?->id ?? $user->id,
                    'status_order'   => 'Pendiente de confirmacion',
                    'snapshot_price' => $item->price_snapshot,
                ]);

                // Cambiar estado del animal a Reservado
                $animal->update(['status' => 'Reservado']);

                // Acumular para notificación agrupada por ganadero
                if ($farmUser) {
                    $ganaderoAnimales[$farmUser->id][] = [
                        'id'             => $animal->id,
                        'name'           => $animal->name,
                        'snapshot_price' => $item->price_snapshot,
                    ];
                }
            }

            // 4. Notificar a cada ganadero (agrupado — un solo aviso por ganadero)
            foreach ($ganaderoAnimales as $ganaderoId => $animales) {
                $ganadero = User::find($ganaderoId);
                $ganadero?->notify(new PedidoRecibidoNotification($order, $animales));
            }

            // 5. Vaciar el carrito
            $cart->items()->delete();

            return $order;
        });
    }
}
