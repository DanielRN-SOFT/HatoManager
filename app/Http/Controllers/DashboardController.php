<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\HealthRecord;
use App\Models\Order;
use App\Models\WeightRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user   = $request->user();
        $farmId = session('active_farm_id');
        $tab    = $request->input('tab', 'vencidas');

        /* ══════════════════════════════════════════
         *  A — ALERTAS SANITARIAS
         * ══════════════════════════════════════════ */
        $totales = ['vencidas' => 0, 'proximas' => 0];
        $alertas = null;

        if ($farmId) {
            $hoy = now()->startOfDay();
            $en7 = now()->addDays(7)->endOfDay();

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

            $totales['vencidas'] = (clone $baseQuery())->where('next_date', '<', $hoy)->count();
            $totales['proximas'] = (clone $baseQuery())->whereBetween('next_date', [$hoy, $en7])->count();

            $query = $tab === 'vencidas'
                ? (clone $baseQuery())->where('next_date', '<', $hoy)->orderBy('next_date')
                : (clone $baseQuery())->whereBetween('next_date', [$hoy, $en7])->orderBy('next_date');

            $alertas = $query
                ->paginate(7, ['id', 'animal_id', 'type', 'product', 'next_date'])
                ->through($mapRecord);
        }

        /* ══════════════════════════════════════════
         *  B — KPIs + GRÁFICAS
         * ══════════════════════════════════════════ */
        $kpis = [
            'total' => 0,
            'activos' => 0,
            'publicados' => 0,
            'reservados' => 0,
            'vendidos' => 0,
            'muertos' => 0,
            'inactivos' => 0,
            'peso_promedio' => 0,
            'vacunas_al_dia' => 0,
            'vacunas_pendientes' => 0,
            // Ventas (lógica SalesController: ordenes donde user_id != ganadero y animales son de su finca)
            'ventas_total'         => 0,
            'ventas_monto'         => 0,
            'ventas_confirmadas'   => 0,  // transacción aprobada
            'ordenes_pendientes'   => 0,
            'ordenes_confirmadas'  => 0,
        ];

        $porEstado            = [];
        $porCategoria         = [];
        $evolucionPeso        = [];
        $ventasMensuales      = [];
        $movimientosMensuales = [];


        if ($farmId) {
            /* ── Inventario por status ── */
            $statusCounts = Animal::where('farm_id', $farmId)
                ->withoutTrashed()
                ->select('status', DB::raw('count(*) as total'))
                ->groupBy('status')
                ->pluck('total', 'status');

            $kpis['total']      = $statusCounts->sum();
            $kpis['activos']    = $statusCounts->get('Activo',    0);
            $kpis['inactivos']  = $statusCounts->get('Inactivo',  0);
            $kpis['publicados'] = $statusCounts->get('Publicado', 0);
            $kpis['reservados'] = $statusCounts->get('Reservado', 0);
            $kpis['vendidos']   = $statusCounts->get('Vendido',   0);
            $kpis['muertos']    = $statusCounts->get('Muerto',    0);

            /* ── Peso promedio (último registro por animal) ── */
            $kpis['peso_promedio'] = round(
                WeightRecord::whereNull('deleted_at')
                    ->whereIn(
                        'id',
                        fn($sub) =>
                        $sub->select(DB::raw('MAX(id)'))
                            ->from('weight_records')
                            ->whereNull('deleted_at')
                            ->whereIn('animal_id', Animal::where('farm_id', $farmId)->select('id'))
                            ->groupBy('animal_id')
                    )
                    ->avg('weight') ?? 0,
                1
            );

            /* ── Vacunas ── */
            $hoy = now()->startOfDay();
            $kpis['vacunas_al_dia'] = HealthRecord::whereNull('deleted_at')
                ->whereHas('animal', fn($q) => $q->where('farm_id', $farmId)->where('status', 'Activo'))
                ->where(fn($q) => $q->whereNull('next_date')->orWhere('next_date', '>=', $hoy))
                ->distinct('animal_id')->count('animal_id');

            $kpis['vacunas_pendientes'] = HealthRecord::whereNull('deleted_at')
                ->whereHas('animal', fn($q) => $q->where('farm_id', $farmId)->where('status', 'Activo'))
                ->where('next_date', '<', $hoy)
                ->distinct('animal_id')->count('animal_id');

            /* ── Ventas (mismo criterio que SalesController) ── */
            // IDs de animales de TODAS las fincas del ganadero
            $farmIds   = $user->farms()->pluck('farms.id');
            $animalIds = Animal::whereIn('farm_id', $farmIds)->withTrashed()->pluck('id');

            // Ventas = órdenes donde el comprador es otro usuario y los animales son del ganadero
            $ventasQuery = fn() => Order::where('orders.user_id', '!=', $user->id)
                ->whereHas('animals', fn($q) => $q->whereIn('animals.id', $animalIds))
                ->with('transaction');

            $todasVentas = (clone $ventasQuery())->get();

            $kpis['ventas_total']       = $todasVentas->count();
            $kpis['ventas_monto']       = $todasVentas->sum('subtotal');
            $kpis['ventas_confirmadas'] = $todasVentas
                ->filter(fn($o) => $o->transaction?->transaction_status === 'aprobada')
                ->sum('subtotal');
            $kpis['ordenes_pendientes'] = $todasVentas
                ->filter(fn($o) => in_array($o->bussiness_status, ['Pendiente de pago', 'Pendiente de confirmacion']))
                ->count();
            $kpis['ordenes_confirmadas'] = $todasVentas
                ->filter(fn($o) => $o->bussiness_status === 'Confirmado')
                ->count();

            /* ── Gráfica: por status (todos) ── */
            $porEstado = collect([
                ['status' => 'Activo',    'total' => $kpis['activos'],    'color' => '#16a34a'],
                ['status' => 'Publicado', 'total' => $kpis['publicados'], 'color' => '#f97316'],
                ['status' => 'Reservado', 'total' => $kpis['reservados'], 'color' => '#3b82f6'],
                ['status' => 'Vendido',   'total' => $kpis['vendidos'],   'color' => '#9333ea'],
                ['status' => 'Inactivo',  'total' => $kpis['inactivos'],  'color' => '#f59e0b'],
                ['status' => 'Muerto',    'total' => $kpis['muertos'],    'color' => '#ef4444'],
            ])->filter(fn($s) => $s['total'] > 0)->values();

            /* ── Gráfica: por categoría ── */
            $porCategoria = Animal::where('farm_id', $farmId)->withoutTrashed()
                ->where('status', '!=', 'Muerto')
                ->join('animal_categories', 'animals.animal_category_id', '=', 'animal_categories.id')
                ->select('animal_categories.name as categoria', DB::raw('count(*) as total'))
                ->groupBy('animal_categories.name')
                ->get();

            /* ── Gráfica: peso promedio histórico (12 meses) ── */
            $evolucionPeso = WeightRecord::whereNull('weight_records.deleted_at')
                ->whereIn('animal_id', Animal::where('farm_id', $farmId)->select('id'))
                ->where('weight_date', '>=', now()->subMonths(12))
                ->select(
                    DB::raw("DATE_FORMAT(weight_date, '%Y-%m') as mes"),
                    DB::raw('ROUND(AVG(weight), 1) as peso_promedio')
                )
                ->groupBy('mes')->orderBy('mes')->get();

            /* ── Gráfica: ventas mensuales COP (6 meses, lógica SalesController) ── */
            $ventasMensuales = Order::where('orders.user_id', '!=', $user->id)
                ->whereHas('animals', fn($q) => $q->whereIn('animals.id', $animalIds))
                ->whereHas('transaction', fn($q) => $q->where('transaction_status', 'aprobada'))
                ->where('date', '>=', now()->subMonths(6))
                ->select(
                    DB::raw("DATE_FORMAT(date, '%Y-%m') as mes"),
                    DB::raw('SUM(subtotal) as total'),
                    DB::raw('COUNT(*) as cantidad')
                )
                ->groupBy('mes')->orderBy('mes')->get();

            /* ── Gráfica RF-27: ingresos vs salidas mensuales de animales (12 meses) ── */
            $ingresosMes = Animal::where('farm_id', $farmId)->withoutTrashed()
                ->where('created_at', '>=', now()->subMonths(12))
                ->select(DB::raw("DATE_FORMAT(created_at, '%Y-%m') as mes"), DB::raw('COUNT(*) as n'))
                ->groupBy('mes')->get()->keyBy('mes');

            $salidasMes = Animal::where('farm_id', $farmId)->withTrashed()
                ->whereIn('status', ['Vendido', 'Muerto'])
                ->where('updated_at', '>=', now()->subMonths(12))
                ->select(DB::raw("DATE_FORMAT(updated_at, '%Y-%m') as mes"), DB::raw('COUNT(*) as n'))
                ->groupBy('mes')->get()->keyBy('mes');

            $movimientosMensuales = collect(range(11, 0))->map(function ($i) use ($ingresosMes, $salidasMes) {
                $m = now()->subMonths($i)->format('Y-m');
                return ['mes' => $m, 'ingresos' => $ingresosMes[$m]->n ?? 0, 'salidas' => $salidasMes[$m]->n ?? 0];
            })->values();
        }

        return Inertia::render('Dashboard', [
            'alertas'              => $alertas,
            'totales'              => $totales,
            'tab'                  => $tab,
            'kpis'                 => $kpis,
            'porEstado'            => $porEstado,
            'porCategoria'         => $porCategoria,
            'evolucionPeso'        => $evolucionPeso,
            'ventasMensuales'      => $ventasMensuales,
            'movimientosMensuales' => $movimientosMensuales,
        ]);
    }
}
