<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EcommerceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $animals = Animal::with(['media', 'farm'])
            ->whereIn('status', ['Activo', 'Reservado', 'Vendido'])
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($animal) {
                return [
                    'id'        => $animal->id,
                    'name'      => $animal->name,
                    'status'    => $animal->status,
                    'farm'      => $animal->farm,
                    'photo' => $animal->hasMedia('animals')
                        ? $animal->getFirstMedia('animals')?->getFullUrl()
                        : null,
                    'price' => $animal->price

                ];
            });

        return Inertia::render('InicioEcommerce/Index', ['animals' => $animals]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
