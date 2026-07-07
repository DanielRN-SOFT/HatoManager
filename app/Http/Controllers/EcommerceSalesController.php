<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\AnimalCategory;
use App\Models\Breed;
use App\Models\Farm;
use App\Models\Cart;
use App\Models\Order;
use App\Models\WeightRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EcommerceSalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $animals = Animal::with(['media', 'farm', 'breed', 'animalCategory', 'latestWeight'])
            ->whereIn('status', ['Publicado', 'Reservado'])
            ->whereNotNull('publication_date')
            ->when(
                $request->filled('raza'),
                fn($q) =>
                $q->where('breed_id', $request->raza)
            )
            ->when(
                $request->filled('categoria'),
                fn($q) =>
                $q->where('animal_category_id', $request->categoria)
            )
            ->when(
                $request->filled('estado'),
                fn($q) =>
                $q->where('status', $request->estado)
            )
            ->when(
                $request->filled('departamento'),
                fn($q) =>
                $q->whereHas(
                    'farm',
                    fn($q) =>
                    $q->where('department', $request->departamento)
                )
            )
            ->when(
                $request->filled('peso') && (int) $request->peso < 800,
                fn($q) => $q->whereHas(
                    'latestWeight',
                    fn($q) =>
                    $q->where('weight', '<=', (int) $request->peso)
                )
            )
            ->when(
                $request->filled('precio') && (int) $request->precio < 10000000,
                fn($q) => $q->where('price', '<=', (int) $request->precio)
            )
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(fn($animal) => [
                'id'            => $animal->id,
                'name'          => $animal->name,
                'status'        => $animal->status,
                'farm'          => $animal->farm,
                'breed_name'    => $animal->breed->name,
                'category_name' => $animal->animalCategory->name,
                'weight'        => $animal->latestWeight?->weight ?? null,
                'photo'         => $animal->hasMedia('animals')
                    ? $animal->getFirstMedia('animals')?->getFullUrl()
                    : null,
                'price'         => $animal->price,
            ]);

        return Inertia::render('EcommerceVentas/Index', [
            'animals'     => $animals,
            'breeds'      => Breed::orderBy('name')->get(['id', 'name']),
            'minWeight'   => WeightRecord::orderBy('weight', 'ASC')->limit(1)->value('weight'),
            'maxWeight'   => WeightRecord::orderBy('weight', 'DESC')->limit(1)->value('weight'),
            'minPrice'   => Animal::orderBy('price', 'ASC')->limit(1)->value('price'),
            'maxPrice'   => Animal::orderBy('price', 'DESC')->limit(1)->value('price'),
            'categories'  => AnimalCategory::orderBy('name')->get(['id', 'name']),
            'departments' => Farm::distinct()->orderBy('department')->pluck('department'),
            'filters'     => $request->only(['raza', 'categoria', 'departamento', 'peso', 'precio', 'estado']),
            'cartItems' => auth()->check()
                ? Cart::forUser(auth()->id())
                ->items()
                ->pluck('animal_id')
                ->toArray()
                : [],
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $animal = Animal::with([
            'media',
            'farm',
            'breed',
            'animalCategory',
            'weightRecords',
            'healthRecords',
        ])
            ->whereIn('status', ['Publicado', 'Reservado'])
            ->whereNotNull('publication_date')
            ->findOrFail($id);

        return Inertia::render('EcommerceVentas/Show', [
            'animal' => [
                'id'               => $animal->id,
                'name'             => $animal->name,
                'status'           => $animal->status,
                'sex'              => $animal->sex,
                'ear_tag'          => $animal->ear_tag,
                'birth_date'       => $animal->birth_date,
                'publication_date' => $animal->publication_date,
                'description'      => $animal->description,
                'previous_diseases' => $animal->previous_diseases,
                'target_weight'    => $animal->target_weight,
                'price'            => $animal->price,

                'breed'           => $animal->breed?->only(['id', 'name']),
                'animal_category' => $animal->animalCategory?->only(['id', 'name']),
                'farm'            => $animal->farm?->only(['id', 'name', 'department']),

                'photos' => $animal->getMedia('animals')
                    ->map(fn($m) => $m->getFullUrl())
                    ->values(),

                'weight_records' => $animal->weightRecords->map(fn($w) => [
                    'id'          => $w->id,
                    'weight'      => $w->weight,
                    'weight_date' => $w->weight_date,
                ]),

                'health_records' => $animal->healthRecords->map(fn($h) => [
                    'id'         => $h->id,
                    'type'       => $h->type,
                    'product'    => $h->product,
                    'dose'       => $h->dose,
                    'applied_at' => $h->applied_at,
                    'next_date'  => $h->next_date,
                    'notes'      => $h->notes,
                ]),
            ],
            'cartItems' => auth()->check()
                ? Cart::forUser(auth()->id())
                ->items()
                ->pluck('animal_id')
                ->toArray()
                : [],
        ]);
    }

    public function showOrderHistory(Request $request)
    {
        $user = $request->user();

        $orders = Order::with([
            'animals' => fn($q) => $q->withTrashed()->with('media'),
            'transaction',
        ])
            ->where('user_id', $user->id)
            ->orderByDesc('date')
            ->paginate(9)
            ->through(fn($order) => [
                'id'               => $order->id,
                'date'             => $order->date->format('d/m/Y H:i'),
                'bussiness_status' => $order->bussiness_status,
                'payment_status'   => $order->payment_status,
                'subtotal'         => $order->subtotal,
                'reference'       => $order->reference,
                'animals' => $order->animals->map(fn($a) => [
                    'id'             => $a->id,
                    'name'           => $a->name,
                    'ear_tag'        => $a->ear_tag,
                    'snapshot_price' => $a->pivot->snapshot_price,
                    'status_order'   => $a->pivot->status_order,
                    'image'          => $a->getFirstMediaUrl('animals'),
                ]),
                'transaction' => $order->transaction ? [
                    'wompi_id'           => $order->transaction->wompi_id,
                    'amount'             => $order->transaction->amount,
                    'transaction_status' => $order->transaction->transaction_status,
                    'transaction_type'   => $order->transaction->transaction_type,
                    'transaction_date'   => $order->transaction->transaction_date?->format('d/m/Y H:i'),
                ] : null,
            ]);

        return Inertia::render('EcommerceVentas/OrderHistory', [
            'orders' => $orders,
        ]);
    }
    /**
     * GET /my-sales — Pedidos recibidos por el ganadero
     */
    public function sellerOrders(Request $request)
    {
        $user = $request->user();

        // IDs de animales que pertenecen a fincas del ganadero
        $farmIds   = $user->farms()->pluck('farms.id');
        $animalIds = Animal::whereIn('farm_id', $farmIds)->withTrashed()->pluck('id');

        // Líneas de pedido (animal_order) donde el ganadero es dueño
        $rows = \App\Models\AnimalOrder::whereIn('animal_id', $animalIds)
            ->with([
                'animal' => fn($q) => $q->withTrashed()->with('media'),
                'order.user',
                'order.transaction',
            ])
            ->orderByDesc('created_at')
            ->paginate(12);

        $items = $rows->through(fn($row) => [
            'animal_order_id' => $row->id,
            'status_order'    => $row->status_order,
            'snapshot_price'  => $row->snapshot_price,
            'order' => [
                'id'               => $row->order->id,
                'date'             => $row->order->date->format('d/m/Y H:i'),
                'reference'        => $row->order->reference,
                'bussiness_status' => $row->order->bussiness_status,
                'payment_status'   => $row->order->payment_status,
                'comprador'        => $row->order->user?->name,
            ],
            'animal' => [
                'id'      => $row->animal->id,
                'name'    => $row->animal->name,
                'ear_tag' => $row->animal->ear_tag,
                'image'   => $row->animal->getFirstMediaUrl('animals'),
            ],
        ]);

        return Inertia::render('EcommerceVentas/SellerOrders', [
            'items' => $items,
        ]);
    }

    /**
     * POST /seller/animal-order/{id}/confirm
     * POST /seller/animal-order/{id}/reject
     */
    public function confirmAnimalOrder(Request $request, int $id)
    {
        return $this->handleAnimalOrderAction($id, 'confirm', $request->user());
    }

    public function rejectAnimalOrder(Request $request, int $id)
    {
        return $this->handleAnimalOrderAction($id, 'reject', $request->user());
    }

    private function    handleAnimalOrderAction(int $animalOrderId, string $action, $user): \Illuminate\Http\RedirectResponse
    {
        $row = \App\Models\AnimalOrder::with(['animal.farm', 'order.transaction'])->findOrFail($animalOrderId);

        // Verificar que el ganadero autenticado es dueño del animal
        $farmIds = $user->farms()->pluck('farms.id');
        abort_unless($farmIds->contains($row->animal->farm_id), 403);

        // Solo se puede actuar si está pendiente
        abort_unless($row->status_order === 'Pendiente de confirmacion', 422);

        try {
            \Illuminate\Support\Facades\DB::transaction(function () use ($row, $action, $user) {
                $this->applyAnimalOrderAction($row, $action, $user);
            });
        } catch (\RuntimeException $e) {
            // El reembolso con Wompi falló: la transacción hizo rollback completo
            // (el animal sigue reservado, status_order sigue "Pendiente de confirmacion").
            // No liberamos el animal para no dejar al comprador sin animal y sin plata.
            return back()->with('error', 'No se pudo procesar el reembolso con Wompi. Intenta de nuevo en unos minutos o contacta soporte. (' . $e->getMessage() . ')');
        }

        return back()->with('success', $action === 'confirm' ? 'Animal confirmado.' : 'Animal rechazado y reembolso registrado.');
    }

    private function applyAnimalOrderAction($row, string $action, $user): void
    {
        if ($action === 'confirm') {
            // ── Confirmar ──────────────────────────────────────────
            $row->update(['status_order' => 'Confirmado']);
            $row->animal->update(['status' => 'Vendido']);

            // Recalcular bussiness_status del pedido:
            // Si TODOS los animales del pedido están confirmados → Completado
            $order      = $row->order;
            $allAnimals = $order->animals;
            $allDone    = $allAnimals->every(
                fn($a) => in_array($a->pivot->status_order, ['Confirmado', 'Rechazado'])
            );

            if ($allDone) {
                $anyConfirmed = $allAnimals->some(fn($a) => $a->pivot->status_order === 'Confirmado');
                $order->update([
                    'bussiness_status' => $anyConfirmed ? 'Completado' : 'Rechazado por ganadero',
                ]);
            }

            // Notificar al comprador
            $order->user?->notify(new \App\Notifications\AnimalConfirmadoNotification($row));
        } else {
            $row->update(['status_order' => 'Rechazado']);
            $row->animal->update(['status' => 'Publicado']);

            $order = $row->order;
            $originalTx = $order->transaction;

            if ($originalTx && $originalTx->wompi_id) {
                $wompiService = app(\App\Services\WompiService::class);
                $reembolso = $wompiService->solicitarReembolso(
                    $originalTx,
                    'rechazo_ganadero',
                    (float) $row->snapshot_price
                );

                // Actualizar payment_status del pedido si el reembolso fue exitoso
                if ($reembolso->transaction_status === 'reembolsada') {
                    $order->update(['payment_status' => 'Reembolsado']);
                }
            }

            // Recalcular bussiness_status (código que ya tienes)...

            // Notificar al comprador (ya existe AnimalRechazadoNotification)
            $order->user?->notify(new \App\Notifications\AnimalRechazadoNotification($row));
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    /**
     * POST /orders/{id}/cancel — RF-28
     * Solo cancelable en estado "Pendiente de pago".
     * Animales vuelven a "Publicado". Ganadero(s) reciben notificación.
     */
    public function cancelOrder(Request $request, int $id)
    {
        $user  = $request->user();
        $order = Order::with(['animals.farm.users', 'animals' => fn($q) => $q->withTrashed()])
            ->where('user_id', $user->id)
            ->findOrFail($id);

        abort_unless(
            $order->bussiness_status === 'Pendiente de pago',
            422,
            'Solo puedes cancelar pedidos en estado "Pendiente de pago".'
        );

        \Illuminate\Support\Facades\DB::transaction(function () use ($order) {
            $order->update(['bussiness_status' => 'Cancelado por comprador']);

            foreach ($order->animals as $animal) {
                if ($animal->status !== 'Vendido') {
                    $animal->update(['status' => 'Publicado']);
                }
                $order->animals()->updateExistingPivot($animal->id, [
                    'status_order' => 'Cancelado',
                ]);
            }

            $ganaderos = $order->animals
                ->map(fn($a) => $a->farm?->users ?? collect())
                ->flatten()
                ->unique('id');

            foreach ($ganaderos as $ganadero) {
                $ganadero->notify(new \App\Notifications\PedidoCanceladoNotification($order));
            }
        });

        return back()->with('success', 'Pedido cancelado correctamente.');
    }
}
