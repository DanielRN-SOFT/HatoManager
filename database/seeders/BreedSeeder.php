<?php

namespace Database\Seeders;

use App\Models\Breed;
use Illuminate\Database\Seeder;

class BreedSeeder extends Seeder
{
    public function run(): void
    {
        $breeds = [
            'Brahman',
            'Cebú',
            'Angus',
            'Hereford',
            'Simmental',
            'Charolais',
            'Limousin',
            'Holstein',
            'Gyr',
            'Romosinuano',
            'Blanco Orejinegro',
            'Costeño con Cuernos',
            'Sanmartinero',
        ];

        foreach ($breeds as $breed) {
            Breed::firstOrCreate(['name' => $breed]);
        }

        $this->command->info('✓ ' . count($breeds) . ' razas creadas.');
    }
}
