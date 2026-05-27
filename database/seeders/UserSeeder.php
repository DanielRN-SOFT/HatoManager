<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar imágenes anteriores
        Storage::disk('public')->deleteDirectory('users');
        Storage::disk('public')->makeDirectory('users');


        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name'     => 'Administrador',
                'password' => Hash::make('12345'),
                'email_verified_at' => now()
            ]
        );

        $ganadero = User::firstOrCreate(
            ['email' => 'ganadero@gmail.com'],
            [
                'name'     => 'Ganadero',
                'password' => Hash::make('12345'),
                'email_verified_at' => now()
            ]
        );

        $veterinario = User::firstOrCreate(
            ['email' => 'veterinario@gmail.com'],
            [
                'name'     => 'Veterinario',
                'password' => Hash::make('12345'),
                'email_verified_at' => now()

            ]
        );

        $comprador = User::firstOrCreate(
            ['email' => 'comprador@gmail.com'],
            [
                'name'     => 'Comprador',
                'password' => Hash::make('12345'),
                'email_verified_at' => now()
            ]
        );


        // Asignar roles a usuarios base
        $ganadero->assignRole('ganadero');
        $admin->assignRole('admin');
        $veterinario->assignRole('veterinario');
        $comprador->assignRole('comprador');
    }
}
