<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\Paddock;
use Illuminate\Database\Seeder;

class PaddockSeeder extends Seeder
{
    public function run(): void
    {
        $farms = Farm::all();

        if ($farms->isEmpty()) {
            $this->command->error('No hay fincas. Ejecuta FarmSeeder primero.');
            return;
        }

        $grassTypes = [
            'Pasto kikuyo',
            'Pasto estrella africana',
            'Pasto brachiaria',
            'Pasto guinea',
            'Pasto imperial',
            'Pasto pangola',
            'Pasto ryegrass',
            'Pasto bermuda',
        ];

        $paddockPrefixes = ['Lote', 'Potrero', 'Manga', 'Corral'];

        $totalPaddocks = 0;

        foreach ($farms as $farm) {
            $count = rand(4, 7);

            for ($i = 1; $i <= $count; $i++) {
                $prefix = $paddockPrefixes[array_rand($paddockPrefixes)];

                Paddock::create([
                    'name'          => "{$prefix} {$i} - {$farm->name}",
                    'area'          => round(rand(10, 80) + rand(0, 99) / 100, 2),
                    'type_of_grass' => $grassTypes[array_rand($grassTypes)],
                    'capacity'      => rand(8, 25),
                    'farm_id'       => $farm->id,
                ]);
            }

            $totalPaddocks += $count;
            $this->command->info("  ✓ {$farm->name}: {$count} lotes creados.");
        }

        $this->command->info("Total: {$totalPaddocks} lotes creados en {$farms->count()} fincas.");
    }
}
