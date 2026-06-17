<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user   = $request->user();
        $farmId = session('active_farm_id');
        $tab    = $request->input('tab', 'vencidas');

        $totales = ['vencidas' => 0, 'proximas' => 0, 'subastas' => 0];
        $alertas = null;

        if ($farmId) {
            $hoy    = now()->startOfDay();
            $en7    = now()->addDays(7)->endOfDay();

            $mapRecord = fn($r) => [
                'id'        => $r->id,
                'animal_id' => $r->animal_id,
                'ear_tag'   => $r->animal?->ear_tag,
                'nombre'    => $r->animal?->name,
                'tipo'      => $r->type,
                'producto'  => $r->product,
                'next_date' => $r->next_date?->toDateString(),
                'dias'      => $tab === 'vencidas'
                    ? (int) $r->next_date->diffInDays($hoy) * -1
                    : (int) now()->startOfDay()->diffInDays($r->next_date),
            ];

            $baseQuery = fn() => HealthRecord::with(['animal:id,name,ear_tag'])
                ->whereHas('animal', fn($q) => $q->where('farm_id', $farmId)->whereNull('deleted_at'))
                ->whereNotNull('next_date')
                ->whereNull('deleted_at');

            // Totales (para los badges de los tabs)
            $totales['vencidas'] = (clone $baseQuery())
                ->where('next_date', '<', $hoy)->count();
            $totales['proximas'] = (clone $baseQuery())
                ->whereBetween('next_date', [$hoy, $en7])->count();

            // Solo paginamos el tab activo
            if ($tab === 'vencidas') {
                $query = (clone $baseQuery())
                    ->where('next_date', '<', $hoy)
                    ->orderBy('next_date');
            } else {
                $query = (clone $baseQuery())
                    ->whereBetween('next_date', [$hoy, $en7])
                    ->orderBy('next_date');
            }

            $alertas = $query
                ->paginate(10, ['id', 'animal_id', 'type', 'product', 'next_date'])
                ->through($mapRecord);
        }

        return Inertia::render('Dashboard', [
            'alertas' => $alertas,
            'totales' => $totales,
            'tab'     => $tab,
        ]);
    }
}
