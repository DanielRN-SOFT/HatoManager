<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\AnimalCategory;
use App\Models\Breed;
use App\Models\Farm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EcommerceSalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $breed = Breed::all();
        $categories = AnimalCategory::all();
        $departments = Farm::distinct()->orderBy('department')->pluck('department');
        $animals = Animal::with(['media', 'farm'])
            ->whereIn('status', ['Activo', 'Reservado', 'Vendido'])
            ->whereNotNull('publication_date')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($animal) {
                return [
                    'id'        => $animal->id,
                    'name'      => $animal->name,
                    'status'    => $animal->status,
                    'farm'      => $animal->farm,
                    'breed_name'     => $animal->breed->name,
                    'category_name' => $animal->animalCategory->name,
                    'weight' => $animal->latestWeight?->weight ?? null,
                    'photo' => $animal->getFirstMediaUrl('animals'),
                    'price' => $animal->price

                ];
            });

        return Inertia::render(
            'Ventas/Index',
            [
                'animals' => $animals,
                'breeds' => $breed,
                'categories' => $categories,
                'departments' => $departments
            ]
        );
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
}
