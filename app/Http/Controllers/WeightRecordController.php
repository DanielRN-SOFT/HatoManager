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

        $animals = Animal::where('farm_id', $farmId)
            ->orderBy('ear_tag')
            ->get(['id', 'name', 'ear_tag']);

        $animalId = $request->get('animal_id', $animals->first()?->id);

        $weightRecords = WeightRecord::with(['weightMethod', 'productiveStage'])->where('animal_id', $animalId)
            ->latest()
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
        dd($request);
        $validated = $request->validated();

        WeightRecord::create($validated);

        return redirect()->route('weight-records.index')->with('success', 'Registro de pesaje creado exitosamante');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
