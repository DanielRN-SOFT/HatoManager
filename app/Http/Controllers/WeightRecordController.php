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
     * Verifica que el usuario autenticado tenga acceso a la finca
     * a la que pertenece el animal indicado.
     */
    private function authorizeAnimalFarm(int $animalId): Animal
    {
        $animal = Animal::findOrFail($animalId);

        abort_unless(
            auth()->user()->farms()->where('farm_id', $animal->farm_id)->exists(),
            403,
            'No tienes acceso a la finca de este animal.'
        );

        return $animal;
    }

    /**
     * Verifica que el usuario autenticado tenga acceso a la finca
     * del animal asociado a un registro de pesaje ya existente.
     */
    private function authorizeWeightRecordFarm(WeightRecord $weightRecord): void
    {
        $animal = Animal::withTrashed()->findOrFail($weightRecord->animal_id);

        abort_unless(
            auth()->user()->farms()->where('farm_id', $animal->farm_id)->exists(),
            403,
            'No tienes acceso a la finca de este registro de pesaje.'
        );
    }

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

        $this->authorizeAnimalFarm($validated['animal_id']);

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
        $this->authorizeWeightRecordFarm($weightRecord);

        $validated = $request->validated();

        // El animal del registro no puede cambiarse a uno de otra finca ajena.
        if (isset($validated['animal_id']) && $validated['animal_id'] != $weightRecord->animal_id) {
            $this->authorizeAnimalFarm($validated['animal_id']);
        }

        $weightRecord->update($validated);

        return redirect()->route('weight-records.index')
            ->with('success', 'Registro de pesaje actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WeightRecord $weightRecord)
    {
        $this->authorizeWeightRecordFarm($weightRecord);

        $animalId = $weightRecord->animal_id;
        $weightRecord->delete();
        return redirect()->route('weight-records.index', ['animal_id' => $animalId])->with('success', "Registro de pesaje eliminado correctamente");
    }

    public function restore(WeightRecord $weightRecord)
    {
        $this->authorizeWeightRecordFarm($weightRecord);

        $weightRecord->restore();

        return redirect()
            ->route('weight-records.index', ['animal_id' => $weightRecord->animal_id])
            ->with('success', 'Registro de pesaje restaurado correctamente');
    }
}
