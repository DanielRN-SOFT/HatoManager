<?php

namespace App\Http\Controllers;

use App\Models\TypeGrass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeGrassController extends Controller
{
    public function index(Request $request)
    {
        $grasses = TypeGrass::withTrashed()
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', "%{$request->search}%")
            )
            ->when($request->status === 'active',  fn($q) => $q->whereNull('deleted_at'))
            ->when($request->status === 'deleted', fn($q) => $q->whereNotNull('deleted_at'))
            ->with(['paddocks'])
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('TiposPasto/Index', [
            'grasses' => $grasses,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:type_grasses,name'],
        ]);

        TypeGrass::create($request->only('name'));

        return redirect()->route('type-grasses.index')->with('success', 'Tipo de pasto creado correctamente.');
    }

    public function update(Request $request, TypeGrass $typeGrass)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', "unique:type_grasses,name,{$typeGrass->id}"],
        ]);

        $typeGrass->update($request->only('name'));

        return redirect()->route('type-grasses.index')->with('success', 'Tipo de pasto actualizado correctamente.');
    }

    public function destroy(TypeGrass $typeGrass)
    {
        if ($typeGrass->paddocks()->exists()) {
            return redirect()->route('type-grasses.index')->with('error', 'No se puede eliminar: este tipo de pasto tiene potreros asociados.');
        }

        $typeGrass->delete();

        return redirect()->route('type-grasses.index')->with('success', 'Tipo de pasto eliminado.');
    }

    public function restore($id)
    {
        $grass = TypeGrass::onlyTrashed()->findOrFail($id);
        $grass->restore();

        return redirect()->route('type-grasses.index')->with('success', 'Tipo de pasto restaurado.');
    }
}
