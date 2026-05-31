<?php

namespace Database\Seeders;

use App\Models\AnimalCategory;
use Illuminate\Database\Seeder;

class AnimalCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Bovino',
            'Ovino',
            'Caprino',
            'Aviar',
            'Porcino',
        ];
        foreach ($categories as $name) {
            AnimalCategory::firstOrCreate(['name' => $name]);
        }
        $this->command->info(count($categories) . ' categorías de animales creadas.');
    }
}
