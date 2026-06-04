<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnimalRequest;
use App\Models\Animal;
use App\Models\AnimalCategory;
use App\Models\Breed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $farm_id = session('active_farm_id');

        $query = Animal::with(['animalCategory', 'breed', 'media'])
            ->withTrashed()
            ->where('farm_id', $farm_id)
            ->when($request->ear_tag, fn($q, $v) => $q->where(
                fn($q2) =>
                $q2->where('ear_tag', 'like', $v . '%')
                    ->orWhere('name', 'like', $v . "%")
            ))
            ->when($request->breed_id, fn($q, $v) => $q->where('breed_id', $v))
            ->when($request->animal_category_id, fn($q, $v) => $q->where('animal_category_id', $v))
            ->when($request->status, fn($q, $v) => $q->where('status', $request->status, $v))
            ->when($request->birth_from, fn($q, $v) => $q->where('birth_date', '>=', $v))
            ->when($request->birth_to,   fn($q, $v) => $q->where('birth_date', '<=', $v))
            ->orderByRaw('
        CASE status
            WHEN "Activo"    THEN 1
            WHEN "Reservado" THEN 2
            WHEN "Vendido"   THEN 3
            WHEN "Muerto"    THEN 4
            WHEN "Inactivo"  THEN 5
            ELSE 6
        END ASC
    ');

        $razas = Breed::all();
        $categorias = AnimalCategory::all();


        $animales = $query->latest()->paginate(8)->withQueryString()
            ->through(fn($animal) => [
                'id'                 => $animal->id,
                'name'               => $animal->name,
                'ear_tag'            => $animal->ear_tag,
                'breed_id'              => $animal->breed_id,
                'sex'                => $animal->sex,
                'birth_date'         => $animal->birth_date?->format('Y-m-d'),
                'status'             => $animal->status,
                'animal_category_id' => $animal->animal_category_id,
                'animal_category'    => $animal->animalCategory?->name,
                'breed'              => $animal->breed?->name,
                'photo'              => $animal->getFirstMediaUrl('animals') ?: null,
            ]);

        return Inertia::render('Animales/Index', [
            'animales'   => $animales,
            'filters'    => $request->only(['status', 'breed', 'category']),
            'finca'      => [
                'id'     => $farm_id,
                'nombre' => auth()->user()->farm?->name ?? 'Mi finca',
            ],
            'razas'      => $razas,
            'categorias' => $categorias
        ]);
    }

    public function create()
    {
        return Inertia::render('Animales/Create', [
            'razas' => Breed::all(),
            'categoriasAnimales' => AnimalCategory::all(),
        ]);
    }

    public function edit(Animal $animal)
    {
        return Inertia::render('Animales/Edit', [
            'animal' => [
                ...$animal->load('breed', 'animalCategory')->toArray(),
                'photo' => $animal->getFirstMediaUrl('animals'),
            ],
            'razas' => Breed::all(),
            'categoriasAnimales' => AnimalCategory::all(),
        ]);
    }

    /**
     * Show information about the resource.
     */
    public function show(Animal $animal)
    {
        return Inertia::render('Animales/Show', [
            'animal' => [
                ...$animal->load([
                    'animalCategory',
                    'breed',
                    'healthRecords',
                    'paddock',
                    'weightRecords'
                ])->toArray(),
                'photo' => $animal->getFirstMediaUrl('animals'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AnimalRequest $request)
    {
        $farm_id = session('active_farm_id');
        $validated = $request->validated();

        $animal = Animal::create([
            ...$validated,
            'farm_id' => $farm_id
        ]);

        if ($request->hasFile('photo')) {
            $animal->addMediaFromRequest('photo')
                ->toMediaCollection('animals');
        }

        return redirect()->route('animals.index')->with('success', 'Animal creado exitosamente');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Animal $animal, AnimalRequest $request)
    {
        $validated = $request->validated();

        $animal->update($validated);

        if ($request->hasFile('photo')) {
            $animal->clearMediaCollection('animals');
            $animal->addMediaFromRequest('photo')
                ->toMediaCollection('animals');
        }

        return redirect()->route('animals.index')->with('success', 'Animal editado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Animal $animal)
    {
        // $animal->clearMediaCollection('animals');
        $animal->delete();
        $animal->update([
            'status' => 'Inactivo'
        ]);

        return redirect()->route('animals.index')->with('success', "Animal eliminado exitosamente");
    }
    public function restore($id)
    {
        $animal = Animal::withTrashed()->findOrFail($id);
        $animal->restore();
        $animal->update(['status' => 'Activo']);
        return redirect()->route('animals.index')
            ->with('success', "Animal restaurado exitosamente");
    }
}
