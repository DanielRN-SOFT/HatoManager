<?php

namespace Database\Seeders;

use App\Models\AnimalCategory;
use Illuminate\Database\Seeder;

class AnimalCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Ternero',      // Macho, 0-12 meses
            'Ternera',      // Hembra, 0-12 meses
            'Novillo',      // Macho, 12-24 meses
            'Novilla',      // Hembra, 12-24 meses
            'Torete',       // Macho, 24-36 meses
            'Toro',         // Macho adulto reproductor
            'Vaca',         // Hembra adulta reproductora
            'Vaca Horra',   // Hembra adulta no gestante/no productiva
            'Buey',         // Macho castrado
        ];

        foreach ($categories as $name) {
            AnimalCategory::firstOrCreate(['name' => $name]);
        }

        $this->command->info(count($categories) . ' categorías de animales creadas.');
    }
}
