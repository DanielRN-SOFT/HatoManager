<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /* ── GET /carrito ────────────────────────────────────────── */

    public function index()
    {
        $cart  = Cart::forUser(auth()->id());
        $items = $cart->items()
            ->with([
                'animal' => fn($q) => $q->withTrashed()->with([
                    'breed',
                    'animalCategory',
                    'farm',
                    'media',
                    'latestWeight',
                ]),
            ])
            ->get();

        $itemsMapped = $items->map(function ($item) {
            $animal     = $item->animal;
            $disponible = $animal
                && ! $animal->trashed()
                && $animal->status === 'Publicado'
                && $animal->publication_date !== null;

            return [
                'id'             => $item->id,
                'animal_id'      => $item->animal_id,
                'price_snapshot' => $item->price_snapshot,
                'disponible'     => $disponible,
                'animal'         => $animal ? [
                    'id'            => $animal->id,
                    'name'          => $animal->name,
                    'status'        => $animal->status,
                    'breed_name'    => $animal->breed?->name,
                    'category_name' => $animal->animalCategory?->name,
                    'weight'        => $animal->latestWeight?->weight ?? null,
                    'photo'         => $animal->hasMedia('animals')
                        ? $animal->getFirstMedia('animals')?->getFullUrl()
                        : null,
                    'farm'          => $animal->farm ? [
                        'id'         => $animal->farm->id,
                        'name'       => $animal->farm->name,
                        'city'       => $animal->farm->city,
                        'department' => $animal->farm->department,
                    ] : null,
                ] : null,
            ];
        });

        // Agrupar por ganadero para subtotales
        $grupos = $itemsMapped
            ->filter(fn($i) => $i['animal'] !== null)
            ->groupBy(fn($i) => $i['animal']['farm']['id'])
            ->map(fn($grupo) => [
                'farm'     => $grupo->first()['animal']['farm'],
                'subtotal' => $grupo->sum('price_snapshot'),
                'items'    => $grupo->values(),
            ])
            ->values();

        $total = $itemsMapped->sum('price_snapshot');

        return Inertia::render('Carrito/Index', [
            'grupos' => $grupos,
            'total'  => $total,
            'count'  => $itemsMapped->count(),
        ]);
    }

    /* ── POST /carrito/agregar ───────────────────────────────── */

    public function add(Request $request)
    {
        $request->validate([
            'animal_id' => ['required', 'integer', 'exists:animals,id'],
        ]);

        $animal = Animal::where('status', 'Publicado')
            ->whereNotNull('publication_date')
            ->find($request->animal_id);

        if ($animal) {
            $cart = Cart::forUser(auth()->id());
            $existente = $cart->items()->withTrashed()->where('animal_id', $animal->id)->first();

            if ($existente && $existente->trashed()) {
                $existente->restore();
                $existente->update(['price_snapshot' => $animal->price]);
            } elseif (!$existente) {
                $cart->items()->create([
                    'animal_id'      => $animal->id,
                    'price_snapshot' => $animal->price,
                ]);
            }
        }

        return back();
    }

    /* ── DELETE /carrito/{itemId} ────────────────────────────── */

    public function remove(int $itemId)
    {
        $cart = Cart::forUser(auth()->id());

        // Solo puede eliminar ítems de su propio carrito
        $item = $cart->items()->findOrFail($itemId);
        $item->delete();

        return back()->with('success', 'Animal eliminado del carrito.');
    }

    /* ── GET /carrito/sync ───────────────────────────────────── */

    /**
     * Endpoint ligero que el frontend consulta cada 30s para detectar
     * animales retirados de venta mientras el carrito está abierto.
     */
    public function sync()
    {
        $cart  = Cart::forUser(auth()->id());
        $items = $cart->items()
            ->with(['animal' => fn($q) => $q->withTrashed()])
            ->get();

        $result = $items->map(function ($item) {
            $animal     = $item->animal;
            $disponible = $animal
                && ! $animal->trashed()
                && $animal->status === 'Activo'
                && $animal->publication_date !== null;

            return [
                'item_id'    => $item->id,
                'animal_id'  => $item->animal_id,
                'disponible' => $disponible,
            ];
        });

        return response()->json(['items' => $result]);
    }
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (auth()->check() && auth()->user()->hasRole('veterinario')) {
                abort(403);
            }
            return $next($request);
        })->only(['add']);
    }
}
