<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FarmController extends Controller
{
    /* ══════════════════════════════════════════════════════════
     |  INDEX — Página "Mis Fincas"
     ╚═════════════════════════════════════════════════════════ */
    public function index(): Response
    {
        $ganadero = Auth::user();

        $farms = $ganadero->farms()
            ->withTrashed()
            ->orderByRaw('deleted_at IS NOT NULL')
            ->orderBy('farms.created_at', 'desc')
            ->get([
                'farms.id',
                'farms.name',
                'farms.city',
                'farms.department',
                'farms.address',
                'farms.phone',
                'farms.area',
                'farms.target_weight',
                'farms.price_weight',
                'farms.deleted_at'
            ]);

        return Inertia::render('Fincas/MisFincas', [
            'farms' => $farms,
        ]);
    }

    /* ══════════════════════════════════════════════════════════
     |  STORE — Crear finca
     ╚═════════════════════════════════════════════════════════ */
    public function store(Request $request): RedirectResponse
    {
        $ganadero = Auth::user();

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'address'      => 'required|string|max:255',
            'phone'        => 'nullable|string|max:20',
            'city'         => 'required|string|max:255',
            'department'   => 'required|string|max:255',
            'area'         => 'required|numeric|gt:0',
            'target_weight' => 'required|integer|gt:0',
            'price_weight' => 'required|numeric|gt:0',
        ]);

        $farm = Farm::create($validated);
        $ganadero->farms()->attach($farm->id);

        return back()->with('success', "Finca \"{$farm->name}\" creada exitosamente.");
    }

    /* ══════════════════════════════════════════════════════════
     |  UPDATE — Editar finca
     ╚═════════════════════════════════════════════════════════ */
    public function update(Request $request, Farm $farm): RedirectResponse
    {
        $ganadero = Auth::user();

        abort_unless(
            $ganadero->farms()->where('farm_id', $farm->id)->exists(),
            403,
            'No tienes acceso a esta finca.'
        );

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'address'      => 'required|string|max:255',
            'phone'        => 'nullable|string|max:20',
            'city'         => 'required|string|max:255',
            'department'   => 'required|string|max:255',
            'area'         => 'required|numeric|gt:0',
            'target_weight' => 'required|integer|gt:0',
            'price_weight' => 'required|numeric|gt:0',
        ]);

        $farm->update($validated);

        return back()->with('success', "Finca \"{$farm->name}\" actualizada correctamente.");
    }

    /* ══════════════════════════════════════════════════════════
     |  DESTROY — Desactivar finca (soft delete)
     ╚═════════════════════════════════════════════════════════ */
    /* ══════════════════════════════════════════════════════════════
 |  DESTROY — Desactivar finca (soft delete)
 ╚═════════════════════════════════════════════════════════════ */
    public function destroy(Farm $farm): RedirectResponse
    {
        $ganadero = Auth::user();

        abort_unless(
            $ganadero->farms()->where('farm_id', $farm->id)->exists(),
            403,
            'No tienes acceso a esta finca.'
        );

        // ── Validaciones antes de desactivar ─────────────────────
        $tieneAnimalesActivos = $farm->animals()
            ->whereNotIn('status', ['Inactivo', 'Muerto'])
            ->exists();

        if ($tieneAnimalesActivos) {
            return redirect()->route('farms.index')
                ->with('error', "No se puede desactivar \"{$farm->name}\": tiene animales activos. Da de baja o retira los animales primero.");
        }

        $tienePedidosPendientes = \App\Models\Order::whereHas('animals', function ($q) use ($farm) {
            $q->where('animals.farm_id', $farm->id);
        })->whereIn('bussiness_status', ['Pendiente de pago', 'Pendiente de confirmacion'])->exists();

        if ($tienePedidosPendientes) {
            return redirect()->route('farms.index')
                ->with('error', "No se puede desactivar \"{$farm->name}\": tiene pedidos pendientes asociados a sus animales.");
        }

        $farm->delete();

        // ── Manejo de sesión ─────────────────────────────────────
        if (session('active_farm_id') === $farm->id) {

            // Buscar otra finca activa del ganadero
            $otra = $ganadero->farms()
                ->whereNull('farms.deleted_at')
                ->where('farms.id', '!=', $farm->id)
                ->first(['farms.id', 'farms.name']);

            if ($otra) {
                session(['active_farm_id' => $otra->id]);
                return redirect()->route('farms.index')
                    ->with('success', "Finca \"{$farm->name}\" desactivada. Ahora estás en \"{$otra->name}\".");
            }

            // Sin más fincas activas
            session()->forget('active_farm_id');
            return redirect()->route('farms.index')
                ->with('info', "Finca \"{$farm->name}\" desactivada. No tienes más fincas activas, crea una nueva para continuar.");
        }

        return back()->with('success', "Finca \"{$farm->name}\" desactivada. Puedes consultarla en modo solo lectura.");
    }

    /* ══════════════════════════════════════════════════════════════
 |  SET ACTIVE — Guardar finca activa en sesión
 ╚═════════════════════════════════════════════════════════════ */
    public function setActive(Farm $farm): RedirectResponse
    {
        $ganadero = Auth::user();

        abort_unless(
            $ganadero->farms()->where('farm_id', $farm->id)->whereNull('farms.deleted_at')->exists(),
            403,
            'No tienes acceso a esta finca o está inactiva.'
        );

        session(['active_farm_id' => $farm->id]);

        return back();
    }

    /* ══════════════════════════════════════════════════════════════
 |  LIST — JSON con fincas activas del ganadero (para el selector)
 ╚═════════════════════════════════════════════════════════════ */
    public function list(): \Illuminate\Http\JsonResponse
    {
        $farms = Auth::user()
            ->farms()
            ->whereNull('farms.deleted_at')
            ->get(['farms.id', 'farms.name', 'farms.city', 'farms.department']);

        return response()->json($farms);
    }
    public function restore(int $id)
    {
        $ganadero = Auth::user();

        $farm = Farm::withTrashed()->findOrFail($id);

        abort_unless(
            $ganadero->farms()->withTrashed()->where('farm_id', $farm->id)->exists(),
            403,
            'No tienes acceso a esta finca.'
        );

        $farm->restore();

        return back()->with('success', "Finca \"{$farm->name}\" restaurada correctamente.");
    }
}
