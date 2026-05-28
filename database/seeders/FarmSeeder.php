<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FarmSeeder extends Seeder
{
    public function run(): void
    {
        // ─── 1. Crear / recuperar usuarios ───────────────────────────────────
        $ganadero = User::firstOrCreate(
            ['email' => 'ganadero@gmail.com'],
            [
                'name'              => 'Carlos Rodríguez',
                'password'          => Hash::make('12345'),
                'email_verified_at' => now(),
            ]
        );
        $ganadero->assignRole('ganadero');

        $veterinario = User::firstOrCreate(
            ['email' => 'veterinario@gmail.com'],
            [
                'name'              => 'Ana Martínez',
                'password'          => Hash::make('12345'),
                'email_verified_at' => now(),
            ]
        );
        $veterinario->assignRole('veterinario');

        // ─── 2. Datos de las 20 fincas ───────────────────────────────────────
        $fincas = [
            [
                'name'          => 'Finca La Esperanza',
                'address'       => 'Vereda El Progreso, Km 5 vía principal',
                'phone'         => '3101234567',
                'city'          => 'Montería',
                'department'    => 'Córdoba',
                'area'          => 250.50,
                'target_weight' => 480,
                'price_weight'  => 9500,
            ],
            [
                'name'          => 'Hacienda El Paraíso',
                'address'       => 'Vereda Las Palmas, Finca antigua',
                'phone'         => '3112345678',
                'city'          => 'Sincelejo',
                'department'    => 'Sucre',
                'area'          => 320.00,
                'target_weight' => 500,
                'price_weight'  => 9800,
            ],
            [
                'name'          => 'Rancho Los Pinos',
                'address'       => 'Carretera central Km 12',
                'phone'         => '3123456789',
                'city'          => 'Villavicencio',
                'department'    => 'Meta',
                'area'          => 180.75,
                'target_weight' => 450,
                'price_weight'  => 9200,
            ],
            [
                'name'          => 'Finca San Antonio',
                'address'       => 'Vereda Buenavista, sector norte',
                'phone'         => '3134567890',
                'city'          => 'Yopal',
                'department'    => 'Casanare',
                'area'          => 410.00,
                'target_weight' => 520,
                'price_weight'  => 10000,
            ],
            [
                'name'          => 'El Porvenir',
                'address'       => 'Vía alterna Km 8, finca El Porvenir',
                'phone'         => '3145678901',
                'city'          => 'Arauca',
                'department'    => 'Arauca',
                'area'          => 290.25,
                'target_weight' => 490,
                'price_weight'  => 9600,
            ],
            [
                'name'          => 'Hacienda La Ceiba',
                'address'       => 'Vereda El Cedro, calle principal',
                'phone'         => '3156789012',
                'city'          => 'Valledupar',
                'department'    => 'Cesar',
                'area'          => 375.80,
                'target_weight' => 510,
                'price_weight'  => 9900,
            ],
            [
                'name'          => 'Santa Bárbara',
                'address'       => 'Km 15 carretera antigua al río',
                'phone'         => '3167890123',
                'city'          => 'Neiva',
                'department'    => 'Huila',
                'area'          => 220.00,
                'target_weight' => 460,
                'price_weight'  => 9300,
            ],
            [
                'name'          => 'Finca La Primavera',
                'address'       => 'Vereda Los Mangos, sector sur',
                'phone'         => '3178901234',
                'city'          => 'Florencia',
                'department'    => 'Caquetá',
                'area'          => 500.00,
                'target_weight' => 540,
                'price_weight'  => 10200,
            ],
            [
                'name'          => 'Los Algarrobos',
                'address'       => 'Carretera marginal Km 3',
                'phone'         => '3189012345',
                'city'          => 'Riohacha',
                'department'    => 'La Guajira',
                'area'          => 160.50,
                'target_weight' => 430,
                'price_weight'  => 8900,
            ],
            [
                'name'          => 'El Descanso',
                'address'       => 'Vereda El Silencio, finca vieja',
                'phone'         => '3190123456',
                'city'          => 'Quibdó',
                'department'    => 'Chocó',
                'area'          => 280.00,
                'target_weight' => 470,
                'price_weight'  => 9400,
            ],
            [
                'name'          => 'Hacienda El Roble',
                'address'       => 'Km 20 vía nacional, desvío norte',
                'phone'         => '3201234567',
                'city'          => 'Bucaramanga',
                'department'    => 'Santander',
                'area'          => 195.30,
                'target_weight' => 455,
                'price_weight'  => 9100,
            ],
            [
                'name'          => 'Villa Hermosa',
                'address'       => 'Vereda San José, finca central',
                'phone'         => '3212345678',
                'city'          => 'Cúcuta',
                'department'    => 'Norte de Santander',
                'area'          => 340.00,
                'target_weight' => 505,
                'price_weight'  => 9850,
            ],
            [
                'name'          => 'Finca El Guayabo',
                'address'       => 'Carretera vieja Km 6, entrada principal',
                'phone'         => '3223456789',
                'city'          => 'Tunja',
                'department'    => 'Boyacá',
                'area'          => 130.75,
                'target_weight' => 420,
                'price_weight'  => 8800,
            ],
            [
                'name'          => 'La Isabela',
                'address'       => 'Vereda Aguadas, sector occidental',
                'phone'         => '3234567890',
                'city'          => 'Manizales',
                'department'    => 'Caldas',
                'area'          => 210.00,
                'target_weight' => 465,
                'price_weight'  => 9250,
            ],
            [
                'name'          => 'Rancho El Águila',
                'address'       => 'Vía alterna, Km 18 carretera central',
                'phone'         => '3245678901',
                'city'          => 'Pereira',
                'department'    => 'Risaralda',
                'area'          => 175.60,
                'target_weight' => 445,
                'price_weight'  => 9050,
            ],
            [
                'name'          => 'El Palmar',
                'address'       => 'Km 9 vía antigua, finca El Palmar',
                'phone'         => '3256789012',
                'city'          => 'Armenia',
                'department'    => 'Quindío',
                'area'          => 260.00,
                'target_weight' => 475,
                'price_weight'  => 9450,
            ],
            [
                'name'          => 'Hacienda Dos Ríos',
                'address'       => 'Confluencia ríos, vereda La Unión',
                'phone'         => '3267890123',
                'city'          => 'Popayán',
                'department'    => 'Cauca',
                'area'          => 430.00,
                'target_weight' => 530,
                'price_weight'  => 10100,
            ],
            [
                'name'          => 'Finca Las Margaritas',
                'address'       => 'Vereda El Prado, sector sur-oriente',
                'phone'         => '3278901234',
                'city'          => 'Pasto',
                'department'    => 'Nariño',
                'area'          => 145.20,
                'target_weight' => 435,
                'price_weight'  => 8950,
            ],
            [
                'name'          => 'El Mirador',
                'address'       => 'Alto de la loma, vereda Panorama',
                'phone'         => '3289012345',
                'city'          => 'Ibagué',
                'department'    => 'Tolima',
                'area'          => 310.00,
                'target_weight' => 495,
                'price_weight'  => 9700,
            ],
            [
                'name'          => 'Hacienda La Aurora',
                'address'       => 'Km 25 vía interregional, finca Aurora',
                'phone'         => '3290123456',
                'city'          => 'Bogotá',
                'department'    => 'Cundinamarca',
                'area'          => 385.90,
                'target_weight' => 515,
                'price_weight'  => 9950,
            ],
        ];

        // ─── 3. Crear fincas y recolectar IDs ────────────────────────────────
        $farmIds = [];
        foreach ($fincas as $data) {
            $farm      = Farm::create($data);
            $farmIds[] = $farm->id;
        }

        // ─── 4. Asociar fincas al ganadero (todas las 20) ────────────────────
        $ganadero->farms()->sync($farmIds);

        // ─── 5. Asociar fincas al veterinario (primeras 10) ──────────────────
        $veterinario->farms()->sync(array_slice($farmIds, 0, 10));

        $this->command->info('20 fincas creadas y asociadas correctamente.');
        $this->command->info("   · Ganadero ({$ganadero->email}): 20 fincas");
        $this->command->info("   · Veterinario ({$veterinario->email}): 10 fincas");
    }
}
