<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SelectFarmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $farms = $user->farms;

        if ($farms->count() > 1) {
            return Inertia::render('Auth/SelectFarm', [
                'farms' => $farms
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'farm_id' => 'required|exists:farms,id'
        ]);
        $user = auth()->user();

        $belongsToUser = $user->farms()
            ->where('farms.id', $request->farm_id)
            ->exists();

        if (!$belongsToUser) {
            abort(403);
        }

        $farm = Farm::find($request->farm_id);

        session([
            'active_farm_id'   => $farm->id,
            'active_farm_name' => $farm->name,
        ]);

        return redirect()->route('dashboard');
    }
}
