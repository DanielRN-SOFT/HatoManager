<?php

namespace Database\Seeders;

use App\Models\ProductiveStage;
use Illuminate\Database\Seeder;

class ProductiveStageSeeder extends Seeder
{
    public function run(): void
    {
        $stages = [
            // Etapas sin datos reproductivos (machos o etapas tempranas)
            ['name' => 'Neonato',       'lactation_days' => null, 'number_of_births' => null],
            ['name' => 'Lactancia',     'lactation_days' => 90,   'number_of_births' => null],
            ['name' => 'Destete',       'lactation_days' => null, 'number_of_births' => null],
            ['name' => 'Levante',       'lactation_days' => null, 'number_of_births' => null],
            ['name' => 'Ceba',          'lactation_days' => null, 'number_of_births' => null],
            ['name' => 'Finalización',  'lactation_days' => null, 'number_of_births' => null],
            // Etapas reproductivas (hembras)
            ['name' => 'Gestación',     'lactation_days' => null, 'number_of_births' => 0],
            ['name' => 'Primer parto',  'lactation_days' => 305,  'number_of_births' => 1],
            ['name' => 'Producción',    'lactation_days' => 305,  'number_of_births' => 2],
            ['name' => 'Multípara',     'lactation_days' => 280,  'number_of_births' => 4],
            ['name' => 'Secado',        'lactation_days' => 60,   'number_of_births' => 3],
        ];

        foreach ($stages as $stage) {
            ProductiveStage::create($stage);
        }

        $this->command->info('✓ ' . count($stages) . ' etapas productivas creadas.');
    }
}
