<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $farmId = session('active_farm_id');

        $alertas = ['vencidas' => [], 'proximas' => [], 'subastas' => []];

        if ($farmId) {
            $hoy = now()->startOfDay();
            $en7dias = now()->addDays(7)->endOfDay();

            // Vacunas vencidas
            $alertas['vencidas'] = HealthRecord::with(['animal:id,name,ear_tag'])
                ->whereHas('animal', fn($q) => $q->where('farm_id', $farmId)->whereNull('deleted_at'))
                ->whereNotNull('next_date')
                ->where('next_date', '<', $hoy)
                ->whereNull('deleted_at')
                ->orderBy('next_date')
                ->get(['id', 'animal_id', 'type', 'product', 'next_date'])
                ->map(fn($r) => [
                    'id'         => $r->id,
                    'animal_id'  => $r->animal_id,
                    'ear_tag'    => $r->animal?->ear_tag,
                    'nombre'     => $r->animal?->name,
                    'tipo'       => $r->type,
                    'producto'   => $r->product,
                    'next_date'  => $r->next_date?->toDateString(),
                    'dias'       => (int) $r->next_date->diffInDays($hoy) * -1,
                ]);

            // Vacunas próximas (7 días)
            $alertas['proximas'] = HealthRecord::with(['animal:id,name,ear_tag'])
                ->whereHas('animal', fn($q) => $q->where('farm_id', $farmId)->whereNull('deleted_at'))
                ->whereNotNull('next_date')
                ->whereBetween('next_date', [$hoy, $en7dias])
                ->whereNull('deleted_at')
                ->orderBy('next_date')
                ->get(['id', 'animal_id', 'type', 'product', 'next_date'])
                ->map(fn($r) => [
                    'id'         => $r->id,
                    'animal_id'  => $r->animal_id,
                    'ear_tag'    => $r->animal?->ear_tag,
                    'nombre'     => $r->animal?->name,
                    'tipo'       => $r->type,
                    'producto'   => $r->product,
                    'next_date'  => $r->next_date?->toDateString(),
                    'dias'       => (int) now()->startOfDay()->diffInDays($r->next_date),
                ]);

            // Subastas próximas a cerrar (extensible — vacío por ahora)
            $alertas['subastas'] = [];
        }

        return Inertia::render('Dashboard', [
            'alertas' => $alertas,
        ]);
    }
}
