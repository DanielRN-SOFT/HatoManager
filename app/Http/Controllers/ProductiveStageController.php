<?php

namespace App\Http\Controllers;

use App\Models\ProductiveStage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductiveStageController extends Controller
{
    public function index(Request $request)
    {
        $stages = ProductiveStage::withTrashed()
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

        return Inertia::render('EtapasProductivas/Index', [
            'stages'  => $stages,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'              => ['required', 'string', 'max:255', 'unique:productive_stages,name'],
            'lactation_days'    => ['nullable', 'integer', 'min:0', 'max:1000'],
            'number_of_births'  => ['nullable', 'integer', 'min:0', 'max:50'],
        ]);

        ProductiveStage::create($data);

        return redirect()->route('productive-stages.index')->with('success', 'Etapa productiva creada correctamente.');
    }

    public function update(Request $request, ProductiveStage $productiveStage)
    {
        $data = $request->validate([
            'name'              => ['required', 'string', 'max:255', "unique:productive_stages,name,{$productiveStage->id}"],
            'lactation_days'    => ['nullable', 'integer', 'min:0', 'max:1000'],
            'number_of_births'  => ['nullable', 'integer', 'min:0', 'max:50'],
        ]);

        $productiveStage->update($data);

        return redirect()->route('productive-stages.index')->with('success', 'Etapa productiva actualizada correctamente.');
    }

    public function destroy(ProductiveStage $productiveStage)
    {
        $productiveStage->delete();

        return redirect()->route('productive-stages.index')->with('success', 'Etapa productiva eliminada.');
    }

    public function restore($id)
    {
        $stage = ProductiveStage::onlyTrashed()->findOrFail($id);
        $stage->restore();

        return redirect()->route('productive-stages.index')->with('success', 'Etapa productiva restaurada.');
    }
}
