<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::query()
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', "%{$request->search}%")
            )
            ->withCount('users')
            ->with([
                'permissions:id,name',
                'users:id,name,email',
            ])
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Roles/Index', [
            'roles'       => $roles,
            'permissions' => Permission::orderBy('name')->get(['id', 'name']),
            'filters'     => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'          => ['required', 'string', 'max:255', 'unique:roles,name'],
            'guard_name'    => ['nullable', 'string', 'max:255'],
            'permissions'   => ['array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        $role = Role::create([
            'name'       => $data['name'],
            'guard_name' => $data['guard_name'] ?? 'web',
        ]);

        $role->syncPermissions($data['permissions'] ?? []);

        return redirect()->route('roles.index')->with('success', 'Rol creado correctamente.');
    }

    public function update(Request $request, Role $role)
    {
        $data = $request->validate([
            'name'          => ['required', 'string', 'max:255', "unique:roles,name,{$role->id}"],
            'permissions'   => ['array'],
            'permissions.*' => ['exists:permissions,name'],
        ]);

        $role->update(['name' => $data['name']]);
        $role->syncPermissions($data['permissions'] ?? []);

        return redirect()->route('roles.index')->with('success', 'Rol actualizado correctamente.');
    }

    public function destroy(Role $role)
    {
        abort_if($role->users()->exists(), 422, 'No puedes eliminar un rol asignado a usuarios.');

        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Rol eliminado correctamente.');
    }
}
