<?php

namespace App\Http\Controllers;

use App\Models\WeightMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeightMethodController extends Controller
{
    public function index(Request $request)
    {
        $methods = WeightMethod::withTrashed()
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', "%{$request->search}%")
            )
            ->when($request->status === 'active',   fn($q) => $q->whereNull('deleted_at'))
            ->when($request->status === 'deleted',  fn($q) => $q->whereNotNull('deleted_at'))
            ->with(['weightRecords'])
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('MetodosPesajes/Index', [
            'methods' => $methods,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:weight_methods,name'],
        ]);

        WeightMethod::create($request->only('name'));

        return redirect()->route('weight-methods.index')->with('success', 'Método de pesaje creado correctamente');
    }

    public function update(Request $request, WeightMethod $weightMethod)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', "unique:weight_methods,name,{$weightMethod->id}"],
        ]);

        $weightMethod->update($request->only('name'));

        return redirect()->route('weight-methods.index')->with('success', 'Método de pesaje actualizado correctamente');
    }

    public function destroy(WeightMethod $weightMethod)
    {
        $hasWeightRecords = $weightMethod->weightRecords()->exists();
        if ($hasWeightRecords) {
            return redirect()->route('weight-methods.index')->with('error', 'Ese metodo de pesaje tiene registros asociados');
        }
        $weightMethod->delete();

        return redirect()->route('weight-methods.index')->with('success', 'Método de pesaje eliminado');
    }

    public function restore($id)
    {
        $method = WeightMethod::onlyTrashed()->findOrFail($id);
        $method->restore();

        return redirect()->route('weight-methods.index')->with('success', 'Método de pesaje restaurado');
    }
}
