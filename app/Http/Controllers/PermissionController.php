<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $permissions = Permission::query()
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', "%{$request->search}%")
            )
            ->withCount('roles')
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Permisos/Index', [
            'permissions' => $permissions,
            'filters'     => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => ['required', 'string', 'max:255', 'unique:permissions,name'],
            'guard_name' => ['nullable', 'string', 'max:255'],
        ]);

        Permission::create([
            'name'       => $data['name'],
            'guard_name' => $data['guard_name'] ?? 'web',
        ]);

        return redirect()->route('permissions.index')->with('success', 'Permiso creado correctamente');
    }

    public function update(Request $request, Permission $permission)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', "unique:permissions,name,{$permission->id}"],
        ]);

        $permission->update($data);

        return redirect()->route('permissions.index')->with('success', 'Permiso actualizado correctamente');
    }

    public function destroy(Permission $permission)
    {
        abort_if($permission->roles()->exists(), 422, 'No puedes eliminar un permiso asignado a roles.');

        $permission->delete();

        return redirect()->route('permissions.index')->with('success', 'Permiso elminado correctamente');
    }
}
