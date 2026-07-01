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

        // Si ya existe un pedido pendiente de pago para este carrito, reutilizarlo
        $order = Order::where('user_id', $user->id)
            ->where('bussiness_status', 'Pendiente de pago')
            ->latest()
            ->first();

        if (! $order) {
            $reference = 'HM-' . strtoupper(Str::random(10));

            $order = DB::transaction(function () use ($user, $disponibles, $reference) {
                $o = Order::create([
                    'date'             => now(),
                    'bussiness_status' => 'Pendiente de pago',
                    'payment_status'   => 'Pendiente',
                    'subtotal'         => $disponibles->sum('price_snapshot'),
                    'reference'        => $reference,
                    'user_id'          => $user->id,
                    'transaction_id'   => null,
                ]);

                foreach ($disponibles as $item) {
                    $animal   = $item->animal;
                    $farmUser = $animal->farm?->users()->first();

                    $o->animals()->attach($animal->id, [
                        'user_id'        => $farmUser?->id ?? $user->id,
                        'status_order'   => 'Pendiente de pago',
                        'snapshot_price' => $item->price_snapshot,
                    ]);

                    $animal->update(['status' => 'Reservado']);
                }

                return $o;
            });
        }

        $totalCOP        = (int) ($order->subtotal * 100);
        $amountStr       = (string) $totalCOP;
        $currency        = 'COP';
        $integritySecret = config('services.wompi.integrity_secret');
        $signature       = hash('sha256', $order->reference . $amountStr . $currency . $integritySecret);

        return Inertia::render('Checkout/Index', [
            'publicKey'     => config('services.wompi.public_key'),
            'reference'     => $order->reference,
            'amountInCents' => $totalCOP,
            'currency'      => $currency,
            'signature'     => $signature,
            'redirectUrl'   => route('checkout.result'),
            'userEmail'     => $user->email,
            'userName'      => $user->name,
            'total'         => $order->subtotal,
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

        Log::info('Wompi result', ['id' => $wompiTransactionId, 'data' => $wompiData]);

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
            $order = Order::where('reference', $reference)
                ->where('bussiness_status', 'Pendiente de pago')
                ->first();

            if ($order) {
                $this->approveOrder($order, $wompiData);
            }

            return Inertia::render('Checkout/Result', [
                'status'    => 'approved',
                'reference' => $reference,
                'orderId'   => $order?->id,
            ]);
        }

        return Inertia::render('Checkout/Result', [
            'status'    => $status,
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

        $tx        = $payload['data']['transaction'];
        $status    = strtolower($tx['status']);
        $wompiId   = $tx['id'];
        $reference = $tx['reference'];

        $existingTx = Transaction::where('wompi_id', $wompiId)->first();

        if ($status === 'approved' && ! $existingTx) {
            $order = Order::where('reference', $reference)
                ->where('bussiness_status', 'Pendiente de pago')
                ->first();

            if (! $order) {
                $email = $tx['customer_email'] ?? null;
                $user  = $email ? User::where('email', $email)->first() : null;
                if ($user) {
                    $order = Order::where('user_id', $user->id)
                        ->where('bussiness_status', 'Pendiente de pago')
                        ->latest()
                        ->first();
                }
            }

            if ($order) {
                $this->approveOrder($order, $tx);
            }
        } elseif (in_array($status, ['declined', 'voided', 'error']) && $existingTx) {
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

    private function approveOrder(Order $order, array $wompiTx): void
    {
        DB::transaction(function () use ($order, $wompiTx) {
            // 1. Crear la transacción
            $amountCents = $wompiTx['amount_in_cents'] ?? ($wompiTx['amount'] ?? 0);
            $amountPesos = is_int($amountCents) && $amountCents > 999999
                ? $amountCents / 100
                : $amountCents;

            $transaction = Transaction::create([
                'wompi_id'           => $wompiTx['id'],
                'internal_reference' => $order->reference,
                'transaction_date'   => now(),
                'moneda'             => $wompiTx['currency'] ?? 'COP',
                'amount'             => $amountPesos,
                'transaction_status' => 'aprobada',
                'transaction_type'   => 'compra',
            ]);

            // 2. Actualizar el pedido
            $order->update([
                'bussiness_status' => 'Pendiente de confirmacion',
                'payment_status'   => 'Aprobado',
                'transaction_id'   => $transaction->id,
            ]);

            // 3. Actualizar status_order en pivot y notificar ganaderos
            $ganaderoAnimales = [];

            foreach ($order->animals as $animal) {
                $farmUser = $animal->farm?->users()->first();

                $order->animals()->updateExistingPivot($animal->id, [
                    'status_order' => 'Pendiente de confirmacion',
                ]);

                if ($farmUser) {
                    $ganaderoAnimales[$farmUser->id][] = [
                        'id'             => $animal->id,
                        'name'           => $animal->name,
                        'snapshot_price' => $animal->pivot->snapshot_price,
                    ];
                }
            }

            // 4. Notificar ganaderos
            foreach ($ganaderoAnimales as $ganaderoId => $animales) {
                $ganadero = User::find($ganaderoId);
                $ganadero?->notify(new PedidoRecibidoNotification($order, $animales));
            }

            // 5. Vaciar el carrito
            $cart = Cart::forUser($order->user_id);
            $cart->items()->delete();
        });
    }
}
