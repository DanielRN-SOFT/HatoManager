<?php

namespace Database\Seeders;

use App\Models\WeightMethod;
use Illuminate\Database\Seeder;

class WeightMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            'Báscula electrónica',
            'Báscula mecánica',
            'Cinta morfométrica',
            'Estimación visual',
            'Báscula de manga',
        ];

        foreach ($methods as $method) {
            WeightMethod::create(['name' => $method]);
        }

        $this->command->info('✓ ' . count($methods) . ' métodos de pesaje creados.');
    }
}
