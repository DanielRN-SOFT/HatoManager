<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $id = $request->user()->id;
        $users = User::with('roles')
        ->where('id', "!=", $id)
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%")
            )
            ->when(
                $request->role,
                fn($q) =>
                $q->whereHas('roles', fn($r) => $r->where('name', $request->role))
            )
            ->when(
                $request->status,
                fn($q) =>
                $request->status === 'verified'
                    ? $q->whereNotNull('email_verified_at')
                    : $q->whereNull('email_verified_at')
            )
            ->withTrashed()
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Usuarios/Index', [
            'usuarios' => $users,
            'roles'    => Role::orderBy('name')->get(['id', 'name']),
            'filters'  => $request->only(['search', 'role', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users'],
            'password' => ['required', Rules\Password::defaults()],
            'role'     => ['nullable', 'string', 'exists:roles,name'],
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if (!empty($data['role'])) {
            $user->assignRole($data['role']);
        }

        return back()->with('flash', ['type' => 'success', 'message' => 'Usuario creado correctamente.']);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', "unique:users,email,{$user->id}"],
            'password' => ['nullable', Rules\Password::defaults()],
            'role'     => ['nullable', 'string', 'exists:roles,name'],
        ]);

        $user->update([
            'name'  => $data['name'],
            'email' => $data['email'],
            ...(!empty($data['password']) ? ['password' => Hash::make($data['password'])] : []),
        ]);

        $user->syncRoles($data['role'] ? [$data['role']] : []);

        return back()->with('flash', ['type' => 'success', 'message' => 'Usuario actualizado correctamente.']);
    }

    public function destroy(User $user)
    {
        abort_if($user->id === auth()->id(), 403, 'No puedes eliminarte a ti mismo.');

        $user->delete();

        return back()->with('flash', ['type' => 'success', 'message' => 'Usuario eliminado.']);
    }

    public function restore($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();

        return back()->with('flash', ['type' => 'success', 'message' => 'Usuario restaurado.']);
    }
}
