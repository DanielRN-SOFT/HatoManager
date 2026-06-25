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
        $gestionarDashboard          = Permission::create(['name' => 'gestionar dashboard']);
        $gestionarUsuarios          = Permission::create(['name' => 'gestionar usuarios']);
        $gestionarRazas             = Permission::create(['name' => 'gestionar razas']);
        $gestionarLotes            = Permission::create(['name' => 'gestionar lotes']);
        $gestionarMensajes            = Permission::create(['name' => 'gestionar mensajes']);
        $gestionarMetodosPesajes    = Permission::create(['name' => 'gestionar metodos de pesajes']);
        $gestionarCategoriasAnimales = Permission::create(['name' => 'gestionar categorias de animales']);
        $gestionarPermisos          = Permission::create(['name' => 'gestionar permisos']);
        $gestionarRoles             = Permission::create(['name' => 'gestionar roles']);
        $gestionarEtapasProductivas = Permission::create(['name' => 'gestionar etapas productivas']);
        $gestionarVeterinarios      = Permission::create(['name' => 'gestionar veterinarios']);
        $gestionarFincas            = Permission::create(['name' => 'gestionar fincas']);
        $gestionarSanidad          = Permission::create(['name' => 'gestionar sanidad']);
        $gestionarAnimales            = Permission::create(['name' => 'gestionar animales']);
        $gestionarPesajes           = Permission::create(['name' => 'gestionar pesos']);
        $gestionarVentas            = Permission::create(['name' => 'gestionar ventas']);
        $gestionarSubastas           = Permission::create(['name' => 'gestionar subastas']);
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
            $gestionarPermisos,
            $gestionarRoles,
            $gestionarMensajes,
            $gestionarRazas,
            $gestionarEtapasProductivas,
            $gestionarMetodosPesajes,
            $gestionarCategoriasAnimales
        ]);

        //! Ganadero
        $ganadero->givePermissionTo([
            $gestionarDashboard,
            $gestionarAnimales,
            $gestionarLotes,
            $gestionarSanidad,
            $gestionarFincas,
            $gestionarPesajes,
            $gestionarVeterinarios,
            $gestionarVentas,
            $gestionarSubastas
        ]);

        $veterinario->givePermissionTo([
            $gestionarSanidad,
            $gestionarAnimales,
            $gestionarPesajes
        ]);

        $comprador->givePermissionTo([
            $utilizarEcoomerce
        ]);
    }
}
