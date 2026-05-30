<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class VeterinarianSeeder extends Seeder
{
    public function run(): void
    {
        // ─── 1. Veterinarios a crear ─────────────────────────────────────────
        $veterinarios = [
            ['name' => 'Ana Martínez',    'email' => 'veterinario@gmail.com'],
            ['name' => 'Luis Herrera',    'email' => 'lherrera@vet.com'],
            ['name' => 'Sofía Castillo',  'email' => 'scastillo@vet.com'],
            ['name' => 'Jorge Patiño',    'email' => 'jpatino@vet.com'],
            ['name' => 'Valentina Ríos',  'email' => 'vrios@vet.com'],
        ];

        $users = [];
        foreach ($veterinarios as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name'              => $data['name'],
                    'password'          => Hash::make('12345'),
                    'email_verified_at' => now(),
                ]
            );
            $user->syncRoles(['veterinario']);
            $users[] = $user;
        }

        // ─── 2. Obtener todas las fincas activas ─────────────────────────────
        $farms = Farm::whereNull('deleted_at')->get();

        if ($farms->isEmpty()) {
            $this->command->warn('No hay fincas disponibles. Ejecuta FarmSeeder primero.');
            return;
        }

        $farmIds = $farms->pluck('id')->toArray();
        $total   = count($farmIds);

        // ─── 3. Distribuir fincas entre veterinarios ─────────────────────────
        // Cada vet recibe un bloque de fincas (con solapamiento para simular
        // que varias fincas tienen más de un veterinario asignado)
        $distribuciones = [
            // Ana        → fincas 1–10  (primeras 10)
            array_slice($farmIds, 0, 10),
            // Luis       → fincas 6–15  (bloque medio)
            array_slice($farmIds, 5, 10),
            // Sofía      → fincas 11–20 (últimas 10)
            array_slice($farmIds, 10, 10),
            // Jorge      → fincas 1–5 y 16–20 (primeras y últimas 5)
            array_merge(array_slice($farmIds, 0, 5), array_slice($farmIds, 15, 5)),
            // Valentina  → todas las fincas (vet principal)
            $farmIds,
        ];

        foreach ($users as $index => $vet) {
            $asignadas = $distribuciones[$index] ?? $farmIds;
            $vet->farms()->syncWithoutDetaching($asignadas);

            $this->command->info(
                "   · {$vet->name} ({$vet->email}): " . count($asignadas) . ' fincas asignadas'
            );
        }

        $this->command->info('VeterinarianSeeder ejecutado correctamente.');
    }
}
