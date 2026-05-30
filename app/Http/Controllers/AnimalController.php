<?php

namespace App\Http\Controllers;

use App\Models\Animal;
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
        $query = Animal::with(['animalCategory', 'media'])
            ->where('farm_id', $farm_id);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('breed')) {
            $query->when('breed', $request->breed);
        }

        if ($request->filled('category')) {
            $query->when('animal_category_id', $request->category);
        }

        $animales = $query->latest()->paginate(15)->withQueryString()
            ->through(fn($animal) => [
                'id'                 => $animal->id,
                'ear_tag'            => $animal->ear_tag,
                'breed'              => $animal->breed,
                'sex'                => $animal->sex,
                'birth_date'         => $animal->birth_date?->format('Y-m-d'),
                'status'             => $animal->status,
                'animal_category_id' => $animal->animal_category_id,
                'animal_category'    => $animal->animalCategory?->name,
                'photo'              => $animal->getFirstMediaUrl('animals'),
            ]);


        $stats = [
            'total_biomasa'           => 0,
            'nacimientos_mes'         => Animal::where('farm_id', auth()->user()->farm_id)
                ->whereMonth('birth_date', now()->month)
                ->count(),
            'nacimientos_crecimiento' => 0,
            'tareas_pendientes'       => 0,
        ];


        return Inertia::render('Animales/Index', [
            'animales' => $animales,
            'filters'  => $request->only(['status', 'breed', 'category']),
            'stats'    => $stats,
            'finca'    => ['nombre' => auth()->user()->farm?->name ?? 'Mi finca'],
        ]);
    }

    /**
     * Show information about the resource.
     */
    public function show(Animal $animal)
    {
        return Inertia::render('Animales/Index', [
            'animal' => [
                ...$animal->load('animalCategory')->toArray(),
                'photo' => $animal->getFirstMediaUrl('animals'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $farm_id = session('active_farm_id');
        $validated = $request->validate([
            'ear_tag' => 'required|integer|unique:animals, ear_tag',
            'breed'              => 'required|string|max:100',
            'sex'                => 'required|in:M,H',
            'birth_date'         => 'required|date',
            'status'             => 'required|string|max:50',
            'animal_category_id' => 'required|exists:animal_categories,id',
            'photo'              => 'nullable|image|max:4096',
        ]);

        $animal = Animal::create([
            ...$validated,
            'farm_id' => $farm_id
        ]);

        if ($request->hasFile('photo')) {
            $animal->addMediaFromRequest('photo')
                ->toMediaCollection('animals');
        }

        return redirect()->route('animales.index');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Animal $animal)
    {
        $validated = $request->validate([
            'ear_tag'            => 'required|integer|unique:animals,ear_tag,' . $animal->id,
            'breed'              => 'required|string|max:100',
            'sex'                => 'required|in:M,H',
            'birth_date'         => 'required|date',
            'status'             => 'required|string|max:50',
            'animal_category_id' => 'required|exists:animal_categories,id',
            'photo'              => 'nullable|image|max:4096',
        ]);

        $animal->update($validated);

        if ($request->hasFile('photo')) {
            $animal->clearMediaCollection('animals');
            $animal->addMediaFromRequest('photo')
                ->toMediaCollection('animals');
        }

        return redirect()->route('animales.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Animal $animal)
    {
        $animal->clearMediaCollection('animals');
        $animal->delete();

        return redirect()->route('animales.index');
    }

    public function pdf(Animal $animal)
    {
        // tu lógica de dompdf aquí
    }
}
