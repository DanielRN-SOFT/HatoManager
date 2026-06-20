<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;
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
            'password' => ['required',  Password::min(8)->mixedCase()->symbols()->numbers()->uncompromised()],
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

        return redirect()->route('users.index')->with('success', 'Usuario creado correctamente');
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

        return redirect()->route('users.index')->with('success', 'Usuario actualizado correctamente');
    }

    public function destroy(User $user)
    {
        // Como comprador
        $hasActivePurchases = $user->orders()
            ->whereIn('bussiness_status', ['Pendiente de pago', 'Pendiente de confirmacion', 'Confirmado'])
            ->exists();

        // Como vendedor (sus animales están en pedidos activos)
        $hasActiveSales = $user->animalSales()
            ->whereIn('status_order', [
                'Pendiente de pago',
                'Pendiente de confirmacion',
                'Confirmado',
            ])
            ->exists();

        if ($hasActivePurchases || $hasActiveSales) {
            return redirect()->route('users.index')
                ->with('error', 'No se puede eliminar el usuario porque tiene compras o ventas activas');
        }

        $user->delete();
        return redirect()->route('users.index')->with('success', 'Usuario eliminado');
    }

    public function restore($id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();

        return redirect()->route('users.index')->with('success', 'Usuario restaurado');
    }
}
