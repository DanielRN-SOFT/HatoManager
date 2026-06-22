<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use App\Models\Paddock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaddockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $farm_id = session('active_farm_id');
        $paddoks = Paddock::where('farm_id', $farm_id)
            ->withTrashed()
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($query) use ($request) {
                    $query->where('name', 'like', "%{$request->search}%")
                        ->orWhere('area', 'like', "%{$request->search}%")
                        ->orWhere('type_of_grass', 'like', "%{$request->search}%")
                        ->orWhere('capacity', 'like', "%{$request->search}%");
                });
            })
            ->when($request->status === 'active', fn($q) => $q->whereNull('deleted_at'))
            ->when($request->status === 'deleted', fn($q) => $q->whereNotNull('deleted_at'))
            ->with('farm')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $farms = Farm::all();

        return Inertia::render('Lotes/Index', [
            'paddocks' => $paddoks,
            'filters' => $request->only(['search', 'status']),
            'farms' => $farms
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $farm_id = session('active_farm_id');
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:paddocks,name',
            'area' => 'required|numeric|min:0|max:9999.99',
            'type_of_grass' => 'required|string',
            'capacity' => 'required|integer|min:0|max:2147483647',
        ]);

        Paddock::create([
            ...$data,
            'farm_id' => $farm_id
        ]);

        return redirect()->route('paddocks.index')->with('success', 'Lote creado correctamente');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paddock $paddock)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:paddocks,name,' . $paddock->id,
            'area' => 'required|numeric|min:0|max:9999.99',
            'type_of_grass' => 'required|string',
            'capacity' => 'required|integer|min:0|max:2147483647',
        ], [], ["capacity" => "capacidad", "type_of_grass" => "tipo de pasto"]);

        $paddock->update($data);
        return redirect()->route('paddocks.index')->with('success', 'Lote actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paddock $paddock)
    {
        $paddock->delete();
        return redirect()->route('paddocks.index')->with('success', 'Lote eliminado');
    }

    public function restore($id)
    {
        $paddock = Paddock::onlyTrashed()->findOrFail($id);
        $paddock->restore();
        return redirect()->route('paddocks.index')->with('success', 'Lote restaurado');
    }
}
