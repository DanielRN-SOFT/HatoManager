<?php

namespace App\Http\Controllers;

use App\Http\Requests\HealthRecordRequest;
use App\Models\Animal;
use App\Models\HealthAlert;
use App\Models\HealthRecord;
use App\Models\Farm;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
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
            ->withTrashed()
            ->where('animal_id', $animalId)
            ->latest()
            ->paginate(8)
            ->withQueryString();

        $allAlerts = HealthAlert::with([
            'healthRecord' => fn($q) => $q->select('id', 'product'),
            'animal'       => fn($q) => $q->select('id', 'ear_tag', 'name'),
        ])
            ->whereHas('healthRecord')
            ->whereHas('animal', fn($q) => $q->where('farm_id', $farmId))
            ->where('status', 'pendiente')
            ->orderBy('alert_date')
            ->get();

        $alerts      = $allAlerts->take(10);
        $alertsTotal = $allAlerts->count();

        return Inertia::render('Sanidad/SanidadAnimal', [
            'animals'        => $animals,
            'selectedAnimal' => $animalId,
            'records'        => $records,
            'alerts'      => $allAlerts->take(10),
            'allAlerts'   => $allAlerts,
            'alertsTotal' => $alertsTotal,
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
    public function certificadoIndividual(Animal $animal, Request $request)
    {
        $farmId = session('active_farm_id');
        abort_if($animal->farm_id !== $farmId, 403);

        $animal->load([
            'farm',
            'breed',
            'animalCategory',
            'healthRecords' => fn($q) => $q->with('registeredBy:id,name')->latest(),
        ]);

        $ganadero = auth()->user()->hasRole('ganadero')
            ? auth()->user()
            : $animal->farm->users()->whereHas('roles', fn($q) => $q->where('name', 'ganadero'))->first();

        $veterinario = $animal->farm->veterinarios()->first();
        $modo = $request->get('modo', 'color'); // 'color' | 'byn'
        $vista = $modo === 'byn' ? 'pdf.certificado-individual-byn' : 'pdf.certificado-individual';

        $pdf = Pdf::loadView($vista, [
            'animal'      => $animal,
            'ganadero'    => $ganadero,
            'veterinario' => $veterinario,
            'fecha'       => now()->format('d/m/Y'),
        ])->setPaper('a4', 'portrait');

        return $pdf->download("certificado-{$animal->ear_tag}.pdf");
    }

    public function certificadoLote(Farm $farm, Request $request)
    {
        abort_if($farm->id !== session('active_farm_id'), 403);

        $animals = Animal::where('farm_id', $farm->id)
            ->where('status', 'activo')
            ->with([
                'breed',
                'animalCategory',
                'healthRecords' => fn($q) => $q->with('registeredBy:id,name')->latest(),
            ])
            ->orderBy('ear_tag')
            ->get();

        $ganadero = auth()->user()->hasRole('ganadero')
            ? auth()->user()
            : $farm->users()->whereHas('roles', fn($q) => $q->where('name', 'ganadero'))->first();

        $veterinario = $farm->veterinarios()->first();
        $modo = $request->get('modo', 'color');
        $vista = $modo === 'byn' ? 'pdf.certificado-lote-byn' : 'pdf.certificado-lote';

        $pdf = Pdf::loadView($vista, [
            'farm'        => $farm,
            'animals'     => $animals,
            'ganadero'    => $ganadero,
            'veterinario' => $veterinario,
            'fecha'       => now()->format('d/m/Y'),
        ])->setPaper('a4', 'portrait');

        return $pdf->download("certificado-lote-{$farm->name}.pdf");
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
