<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    // ─── Pública ──────────────────────────────────────────────────────────────

    public function create()
    {
        return Inertia::render('Contacto/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'    => ['required', 'string', 'max:100'],
            'email'   => ['required', 'email', 'max:100'],
            'phone'   => ['nullable', 'string', 'max:20'],
            'topic'   => ['required', 'string'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        Contact::create($request->only('name', 'email', 'phone', 'topic', 'message'));

        return back()->with('success', 'Mensaje enviado correctamente.');
    }

    // ─── Admin ────────────────────────────────────────────────────────────────

    public function index(Request $request)
    {
        $contacts = Contact::query()
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%")
                    ->orWhere('topic', 'like', "%{$request->search}%")
            )
            ->when(
                $request->topic,
                fn($q) =>
                $q->where('topic', $request->topic)
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $topics = Contact::query()
            ->select('topic')
            ->distinct()
            ->orderBy('topic')
            ->pluck('topic');

        return Inertia::render('Contacto/Index', [
            'contacts' => $contacts,
            'topics'   => $topics,
            'filters'  => $request->only(['search', 'topic']),
        ]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contacts.index')->with('success', 'Mensaje eliminado.');
    }
}
