<?php

namespace Database\Seeders;

use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //* Limpiar caché de permisos de Spatie antes de crear
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        //* Permisos
        $gestionarUsuarios          = Permission::create(['name' => 'gestionar usuarios']);
        $gestionarFincas            = Permission::create(['name' => 'gestionar fincas']);
        $gestionarSanidad          = Permission::create(['name' => 'gestionar sanidad']);
        $gestionarAnimales            = Permission::create(['name' => 'gestionar animales']);
        $utilizarEcoomerce        = Permission::create(['name' => 'gestionar ecoomerce']);

        //* Roles
        $admin   = Role::create(['name' => 'admin']);
        $ganadero    = Role::create(['name' => 'ganadero']);
        $veterinario = Role::create(['name' => 'veterinario']);
        $comprador = Role::create(['name' => 'comprador']);

        //* Asignar

        //! Admin — solo gestiona la plataforma
        $admin->givePermissionTo([
            $gestionarUsuarios,
            $gestionarFincas
        ]);

        //! Ganadero
        $ganadero->givePermissionTo([
            $gestionarAnimales,
            $gestionarSanidad,
            $gestionarFincas
        ]);

        $veterinario->givePermissionTo([
            $gestionarSanidad
        ]);

        $comprador->givePermissionTo([
            $utilizarEcoomerce
        ]);
    }
}
