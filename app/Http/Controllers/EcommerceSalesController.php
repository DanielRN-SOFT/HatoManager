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
            ->paginate(12)
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

        return Inertia::render('Ventas/Index', [
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

        return Inertia::render('Ventas/Show', [
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

        return Inertia::render('Ventas/OrderHistory', [
            'orders' => $orders,
        ]);
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
}
