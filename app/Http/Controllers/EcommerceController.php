<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EcommerceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $animals = Animal::with(['media', 'farm'])
            ->whereIn('status', ['Publicado'])
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($animal) {
                return [
                    'id'        => $animal->id,
                    'name'      => $animal->name,
                    'status'    => $animal->status,
                    'farm'      => $animal->farm,
                    'photo' => $animal->hasMedia('animals')
                        ? $animal->getFirstMedia('animals')?->getFullUrl()
                        : null,
                    'price' => $animal->price

                ];
            });

        return Inertia::render('InicioEcommerce/Index', ['animals' => $animals,   'cartItems' => auth()->check()
            ? Cart::forUser(auth()->id())
            ->items()
            ->pluck('animal_id')
            ->toArray()
            : [],]);
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
        //
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
