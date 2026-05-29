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
    public function destroy(Farm $farm): RedirectResponse
    {
        $ganadero = Auth::user();

        abort_unless(
            $ganadero->farms()->where('farm_id', $farm->id)->exists(),
            403,
            'No tienes acceso a esta finca.'
        );

        // ── Verificar dependencias activas ───────────────────
        // (aquí irán las validaciones de animales, pedidos y subastas
        //  cuando esos módulos estén implementados)

        $farm->delete(); // soft delete

        return back()->with('success', "Finca \"{$farm->name}\" desactivada. Puedes consultarla en modo solo lectura.");
    }
}
