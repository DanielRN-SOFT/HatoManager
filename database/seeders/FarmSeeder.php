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
        // ─── 1. Usuarios ─────────────────────────────────────────────────────
        $ganadero = User::firstOrCreate(
            ['email' => 'ganadero@gmail.com'],
            [
                'name'              => 'Carlos Rodríguez',
                'password'          => Hash::make('12345'),
                'email_verified_at' => now(),
            ]
        );
        $ganadero->assignRole('ganadero');

        // Segundo ganadero — dueño de fincas "ajenas" para simular compras
        $ganadero2 = User::firstOrCreate(
            ['email' => 'ganadero2@gmail.com'],
            [
                'name'              => 'Pedro Gómez',
                'password'          => Hash::make('12345'),
                'email_verified_at' => now(),
            ]
        );
        $ganadero2->assignRole('ganadero');

        $veterinario = User::firstOrCreate(
            ['email' => 'veterinario@gmail.com'],
            [
                'name'              => 'Ana Martínez',
                'password'          => Hash::make('12345'),
                'email_verified_at' => now(),
            ]
        );
        $veterinario->assignRole('veterinario');

        // ─── 2. Fincas ───────────────────────────────────────────────────────
        $fincasGanadero1 = [
            ['name' => 'Finca La Esperanza',   'city' => 'Montería',      'department' => 'Córdoba',            'address' => 'Vereda El Progreso Km 5',       'phone' => '3101234567', 'area' => 250.50, 'target_weight' => 480, 'price_weight' => 9500],
            ['name' => 'Hacienda El Paraíso',  'city' => 'Sincelejo',     'department' => 'Sucre',              'address' => 'Vereda Las Palmas',             'phone' => '3112345678', 'area' => 320.00, 'target_weight' => 500, 'price_weight' => 9800],
            ['name' => 'Rancho Los Pinos',      'city' => 'Villavicencio', 'department' => 'Meta',               'address' => 'Carretera central Km 12',       'phone' => '3123456789', 'area' => 180.75, 'target_weight' => 450, 'price_weight' => 9200],
            ['name' => 'Finca San Antonio',     'city' => 'Yopal',         'department' => 'Casanare',           'address' => 'Vereda Buenavista sector norte', 'phone' => '3134567890', 'area' => 410.00, 'target_weight' => 520, 'price_weight' => 10000],
            ['name' => 'El Porvenir',           'city' => 'Arauca',        'department' => 'Arauca',             'address' => 'Vía alterna Km 8',              'phone' => '3145678901', 'area' => 290.25, 'target_weight' => 490, 'price_weight' => 9600],
            ['name' => 'Hacienda La Ceiba',     'city' => 'Valledupar',    'department' => 'Cesar',              'address' => 'Vereda El Cedro',               'phone' => '3156789012', 'area' => 375.80, 'target_weight' => 510, 'price_weight' => 9900],
            ['name' => 'Santa Bárbara',         'city' => 'Neiva',         'department' => 'Huila',              'address' => 'Km 15 carretera antigua',       'phone' => '3167890123', 'area' => 220.00, 'target_weight' => 460, 'price_weight' => 9300],
            ['name' => 'Finca La Primavera',    'city' => 'Florencia',     'department' => 'Caquetá',            'address' => 'Vereda Los Mangos',             'phone' => '3178901234', 'area' => 500.00, 'target_weight' => 540, 'price_weight' => 10200],
            ['name' => 'Los Algarrobos',        'city' => 'Riohacha',      'department' => 'La Guajira',         'address' => 'Carretera marginal Km 3',       'phone' => '3189012345', 'area' => 160.50, 'target_weight' => 430, 'price_weight' => 8900],
            ['name' => 'El Descanso',           'city' => 'Quibdó',        'department' => 'Chocó',              'address' => 'Vereda El Silencio',            'phone' => '3190123456', 'area' => 280.00, 'target_weight' => 470, 'price_weight' => 9400],
        ];

        $fincasGanadero2 = [
            ['name' => 'Hacienda El Roble',     'city' => 'Bucaramanga',   'department' => 'Santander',          'address' => 'Km 20 vía nacional',            'phone' => '3201234567', 'area' => 195.30, 'target_weight' => 455, 'price_weight' => 9100],
            ['name' => 'Villa Hermosa',         'city' => 'Cúcuta',        'department' => 'Norte de Santander', 'address' => 'Vereda San José',               'phone' => '3212345678', 'area' => 340.00, 'target_weight' => 505, 'price_weight' => 9850],
            ['name' => 'Finca El Guayabo',      'city' => 'Tunja',         'department' => 'Boyacá',             'address' => 'Carretera vieja Km 6',          'phone' => '3223456789', 'area' => 130.75, 'target_weight' => 420, 'price_weight' => 8800],
            ['name' => 'La Isabela',            'city' => 'Manizales',     'department' => 'Caldas',             'address' => 'Vereda Aguadas',                'phone' => '3234567890', 'area' => 210.00, 'target_weight' => 465, 'price_weight' => 9250],
            ['name' => 'Rancho El Águila',      'city' => 'Pereira',       'department' => 'Risaralda',          'address' => 'Vía alterna Km 18',             'phone' => '3245678901', 'area' => 175.60, 'target_weight' => 445, 'price_weight' => 9050],
            ['name' => 'El Palmar',             'city' => 'Armenia',       'department' => 'Quindío',            'address' => 'Km 9 vía antigua',              'phone' => '3256789012', 'area' => 260.00, 'target_weight' => 475, 'price_weight' => 9450],
            ['name' => 'Hacienda Dos Ríos',     'city' => 'Popayán',       'department' => 'Cauca',              'address' => 'Confluencia ríos vereda Unión', 'phone' => '3267890123', 'area' => 430.00, 'target_weight' => 530, 'price_weight' => 10100],
            ['name' => 'Finca Las Margaritas',  'city' => 'Pasto',         'department' => 'Nariño',             'address' => 'Vereda El Prado',               'phone' => '3278901234', 'area' => 145.20, 'target_weight' => 435, 'price_weight' => 8950],
            ['name' => 'El Mirador',            'city' => 'Ibagué',        'department' => 'Tolima',             'address' => 'Alto de la loma vereda Panorama', 'phone' => '3289012345', 'area' => 310.00, 'target_weight' => 495, 'price_weight' => 9700],
            ['name' => 'Hacienda La Aurora',    'city' => 'Bogotá',        'department' => 'Cundinamarca',       'address' => 'Km 25 vía interregional',       'phone' => '3290123456', 'area' => 385.90, 'target_weight' => 515, 'price_weight' => 9950],
        ];

        // ─── 3. Crear y asociar fincas ───────────────────────────────────────
        $farmIds1 = [];
        foreach ($fincasGanadero1 as $data) {
            $farm       = Farm::create($data);
            $farmIds1[] = $farm->id;
        }
        $ganadero->farms()->sync($farmIds1);

        $farmIds2 = [];
        foreach ($fincasGanadero2 as $data) {
            $farm       = Farm::create($data);
            $farmIds2[] = $farm->id;
        }
        $ganadero2->farms()->sync($farmIds2);

        $veterinario->farms()->sync(array_slice($farmIds1, 0, 5));

        $this->command->info('20 fincas creadas y asociadas.');
        $this->command->info("  · {$ganadero->email}: 10 fincas");
        $this->command->info("  · {$ganadero2->email}: 10 fincas");
        $this->command->info("  · {$veterinario->email}: 5 fincas (compartidas)");
    }
}
