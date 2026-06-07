<?php

namespace App\Http\Controllers;

use App\Http\Requests\WeightRecordRequest;
use App\Models\Animal;
use App\Models\ProductiveStage;
use App\Models\WeightMethod;
use App\Models\WeightRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeightRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $farmId = session('active_farm_id');

        $animals = Animal::with(['media', 'breed'])->where('farm_id', $farmId)
            ->orderBy('ear_tag')
            ->get(['id', 'name', 'ear_tag']);

        $animalId = $request->get('animal_id', $animals->first()?->id);

        $weightRecords = WeightRecord::with(['animal.media', 'weightMethod', 'productiveStage'])
            ->withTrashed()->where('animal_id', $animalId)
            ->latest()
            ->orderBy('deleted_at', "asc")
            ->paginate(8)
            ->withQueryString();

        $productiveStages = ProductiveStage::all();
        $weightMethods = WeightMethod::all();

        return Inertia::render('HistorialPesos/Index', [
            'animals' => $animals,
            'selectedAnimal' => $animalId,
            'weightRecords' => $weightRecords,
            'productiveStages' => $productiveStages,
            'weightMethods' => $weightMethods
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WeightRecordRequest $request)
    {

        $validated = $request->validated();

        $record = WeightRecord::create($validated);

        return redirect()->route('weight-records.index', ['animal_id' => $record->animal_id])->with('success', 'Registro de pesaje creado exitosamante');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WeightRecordRequest $request, WeightRecord $weightRecord)
    {
        $validated = $request->validated();
        $weightRecord->update($validated);

        return redirect()->route('weight-records.index')
            ->with('success', 'Registro de pesaje actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WeightRecord $weightRecord)
    {
        $animalId = $weightRecord->animal_id;
        $weightRecord->delete();
        return redirect()->route('weight-records.index', ['animal_id' => $animalId])->with('success', "Registro de pesaje eliminado correctamente");
    }

    public function restore(WeightRecord $weightRecord)
    {
        $weightRecord->restore();

        return redirect()
            ->route('weight-records.index', ['animal_id' => $weightRecord->animal_id])
            ->with('success', 'Registro de pesaje restaurado correctamente');
    }
}
