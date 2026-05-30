<?php

namespace Database\Seeders;

use App\Models\AnimalCategory;
use Illuminate\Database\Seeder;

class AnimalCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Levante',
            'Ceba',
            'Cría',
            'Vientre',
            'Reproductor',
            'Lechero',
            'Doble propósito',
        ];

        foreach ($categories as $name) {
            AnimalCategory::firstOrCreate(['name' => $name]);
        }

        $this->command->info(count($categories) . ' categorías de animales creadas.');
    }
}
