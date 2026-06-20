<?php

namespace App\Http\Controllers;

use App\Models\Breed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BreedController extends Controller
{
    public function index(Request $request)
    {
        $breeds = Breed::withTrashed()
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', "%{$request->search}%")
            )
            ->with(['animals'])
            ->when($request->status === 'active',  fn($q) => $q->whereNull('deleted_at'))
            ->when($request->status === 'deleted', fn($q) => $q->whereNotNull('deleted_at'))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Razas/Index', [
            'breeds'  => $breeds,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:breeds,name'],
        ]);

        Breed::create($request->only('name'));

        return redirect()->route('breeds.index')->with('success', 'Raza creada correctamente');
    }

    public function update(Request $request, Breed $breed)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', "unique:breeds,name,{$breed->id}"],
        ]);

        $breed->update($request->only('name'));

        return redirect()->route('breeds.index')->with('success', 'Raza actualizada correctamente');
    }

    public function destroy(Breed $breed)
    {
        $hasAnimals = $breed->animals()->exists();
        if ($hasAnimals) {
            return redirect()->route('breeds.index')->with('error', 'Error: Esa raza de animal ya esta asociada a uno ');
        }
        $breed->delete();

        return redirect()->route('breeds.index')->with('success', 'Raza eliminada');
    }

    public function restore($id)
    {
        $breed = Breed::onlyTrashed()->findOrFail($id);
        $breed->restore();

        return redirect()->route('breeds.index')->with('success', 'Raza restaurada');
    }
}
