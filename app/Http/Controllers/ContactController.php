<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contacto/Index');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:100',
            'phone'   => 'nullable|string|max:20',
            'topic'   => 'required|string',
            'message' => 'required|string|max:2000',
        ]);

        Contact::create($validated);

        return back()->with('success', 'Mensaje enviado correctamente.');
    }
}
