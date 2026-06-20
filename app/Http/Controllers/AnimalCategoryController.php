<?php

namespace App\Http\Controllers;

use App\Models\AnimalCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalCategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = AnimalCategory::withTrashed()
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', "%{$request->search}%")
            )
            ->when($request->status === 'active',  fn($q) => $q->whereNull('deleted_at'))
            ->when($request->status === 'deleted', fn($q) => $q->whereNotNull('deleted_at'))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('CategoriasAnimales/Index', [
            'categories' => $categories,
            'filters'    => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:animal_categories,name'],
        ]);

        AnimalCategory::create($request->only('name'));

        return redirect()->route('animal-categories.index')->with('success', 'Categorias creada correctamente');
    }

    public function update(Request $request, AnimalCategory $animalCategory)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', "unique:animal_categories,name,{$animalCategory->id}"],
        ]);

        $animalCategory->update($request->only('name'));

        return redirect()->route('animal-categories.index')->with('success', 'Categorias actualizada correctamente');
    }

    public function destroy(AnimalCategory $animalCategory)
    {
        $animalCategory->delete();

        return redirect()->route('animal-categories.index')->with('success', 'Categorias eliminada');
    }

    public function restore($id)
    {
        $category = AnimalCategory::onlyTrashed()->findOrFail($id);
        $category->restore();

        return redirect()->route('animal-categories.index')->with('success', 'Categorias restaurada');
    }
}
