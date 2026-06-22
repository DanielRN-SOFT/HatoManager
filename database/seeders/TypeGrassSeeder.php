<?php

namespace Database\Seeders;

use App\Models\TypeGrass;
use Illuminate\Database\Seeder;

class TypeGrassSeeder extends Seeder
{
    public function run(): void
    {
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

        foreach ($grassTypes as $name) {
            TypeGrass::create(['name' => $name]);
        }

        $this->command->info('✓ ' . count($grassTypes) . ' tipos de pasto creados.');
    }
}
