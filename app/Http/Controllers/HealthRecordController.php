<?php

namespace App\Http\Controllers;

use App\Http\Requests\HealthRecordRequest;
use App\Models\Animal;
use App\Models\HealthAlert;
use App\Models\HealthRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HealthRecordController extends Controller
{
    public function index(Request $request)
    {
        $farmId = session('active_farm_id');

        $animals = Animal::where('farm_id', $farmId)
            ->orderBy('ear_tag')
            ->get(['id', 'ear_tag', 'name']);

        $animalId = $request->get('animal_id', $animals->first()?->id);

        $records = HealthRecord::with('registeredBy:id,name')
            ->where('animal_id', $animalId)
            ->latest()
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('Sanidad/Index', [
            'animals'         => $animals,
            'selectedAnimal'  => $animalId,
            'records'         => $records,
        ]);
    }

    public function create(Request $request)
    {
        $farmId = session('active_farm_id');

        $animals = Animal::where('farm_id', $farmId)
            ->orderBy('ear_tag')
            ->get(['id', 'ear_tag', 'name']);

        return Inertia::render('Sanidad/Create', [
            'animals'         => $animals,
            'selectedAnimal'  => $request->get('animal_id'),
        ]);
    }

    public function store(HealthRecordRequest $request)
    {
        $data = $request->validated();
        $data['registered_by'] = auth()->id();

        $record = HealthRecord::create($data);

        $this->syncAlert($record);

        return redirect()->route('health.index', ['animal_id' => $record->animal_id])
            ->with('success', 'Registro sanitario guardado correctamente.');
    }

    public function edit(HealthRecord $health)
    {
        $farmId = session('active_farm_id');

        $animals = Animal::where('farm_id', $farmId)
            ->orderBy('ear_tag')
            ->get(['id', 'ear_tag', 'name']);

        return Inertia::render('Sanidad/Edit', [
            'record'  => $health->load('registeredBy:id,name'),
            'animals' => $animals,
        ]);
    }

    public function update(HealthRecordRequest $request, HealthRecord $health)
    {
        $health->update($request->validated());

        $this->syncAlert($health);

        return redirect()->route('health.index', ['animal_id' => $health->animal_id])
            ->with('success', 'Registro sanitario actualizado correctamente.');
    }

    public function destroy(HealthRecord $health)
    {
        $animalId = $health->animal_id;
        $health->alert()->delete();
        $health->delete();

        return redirect()->route('health.index', ['animal_id' => $animalId])
            ->with('success', 'Registro eliminado correctamente.');
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private function syncAlert(HealthRecord $record): void
    {
        if ($record->next_date) {
            HealthAlert::updateOrCreate(
                ['health_record_id' => $record->id],
                [
                    'animal_id'  => $record->animal_id,
                    'type'       => $record->type,
                    'alert_date' => $record->next_date,
                    'status'     => 'pendiente',
                ]
            );
        } else {
            $record->alert()->delete();
        }
    }
}
