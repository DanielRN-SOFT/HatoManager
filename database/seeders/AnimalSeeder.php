<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\AnimalCategory;
use App\Models\Breed;
use App\Models\Farm;
use App\Models\Paddock;
use Illuminate\Database\Seeder;

class AnimalSeeder extends Seeder
{
    public function run(): void
    {
        $farms      = Farm::all();
        $categories = AnimalCategory::all();
        $breeds     = Breed::all();

        if ($farms->isEmpty()) {
            $this->command->error('No hay fincas. Ejecuta FarmSeeder primero.');
            return;
        }

        if ($categories->isEmpty()) {
            $this->command->error('No hay categorías de animales. Ejecuta AnimalCategorySeeder primero.');
            return;
        }

        if ($breeds->isEmpty()) {
            $this->command->error('No hay razas. Ejecuta BreedSeeder primero.');
            return;
        }

        $diseases = [
            'Ninguna',
            'Fiebre aftosa (recuperado)',
            'Brucelosis (tratado)',
            'Mastitis leve (recuperado)',
            'Neumonía (tratado)',
            'Parásitos internos (desparasitado)',
            'Dermatitis (tratado)',
            'Diarrea bovina (recuperado)',
        ];

        $statuses = ['Activo', 'Inactivo', 'Vendido', 'Reservado', 'Muerto'];

        $maleNames = [
            'Tornado',
            'Trueno',
            'Rayo',
            'Ciclón',
            'Vendaval',
            'Toro',
            'Coloso',
            'Titán',
            'Goliat',
            'Sansón',
            'Maverick',
            'Rocoso',
            'Bravo',
            'Sultán',
            'Nero',
            'Atlas',
            'Zeus',
            'Ares',
            'Hércules',
            'Sócrates',
        ];

        $femaleNames = [
            'Luna',
            'Estrella',
            'Paloma',
            'Dulce',
            'Canela',
            'Mora',
            'Perla',
            'Blanca',
            'Nube',
            'Rosa',
            'Violeta',
            'Azucena',
            'Magnolia',
            'Daisy',
            'Lola',
            'Princesa',
            'Diana',
            'Reina',
            'Bella',
            'Aurora',
        ];

        $totalAnimals = 0;

        foreach ($farms as $farm) {
            // Paddocks de esta finca específica
            $paddocks = Paddock::where('farm_id', $farm->id)->get();

            if($paddocks->isEmpty()) {
                $this->command->warn("  ⚠ {$farm->name} no tiene lotes. Omitiendo animales.");
                continue;
            }

            $count = rand(20, 28);

            for ($i = 0; $i < $count; $i++) {
                $sex  = $i % 3 === 0 ? 'M' : 'H';
                $name = $sex === 'M'
                    ? $maleNames[array_rand($maleNames)]
                    : $femaleNames[array_rand($femaleNames)];

                $birthDate   = now()->subDays(rand(365, 365 * 5));
                $ageInMonths = $birthDate->diffInMonths(now());

                $baseWeight = min(100 + ($ageInMonths * 8), 550);
                $weight     = $baseWeight + rand(-30, 30);

                // Paddock aleatorio de la finca
                $paddock = $paddocks->random();

                Animal::create([
                    'name'               => $name,
                    'ear_tag'            => $this->generateUniqueEarTag(),
                    'breed_id'           => $breeds->random()->id,
                    'sex'                => $sex,
                    'photo'              => "https://placehold.co/400x300?text={$name}",
                    'birth_date'         => $birthDate,
                    'status'             => $statuses[array_rand($statuses)],
                    'description'        => "Animal en buen estado general. Criado en {$farm->city}, {$farm->department}.",
                    'previous_diseases'  => $diseases[array_rand($diseases)],
                    'price'              => round($weight * ($farm->price_weight / 1000), 4),
                    'target_weight'      => $farm->target_weight,
                    'price_weight'       => $farm->price_weight,
                    'publication_date'   => now()->subDays(rand(0, 60))->toDateString(),
                    'farm_id'            => $farm->id,
                    'animal_category_id' => $categories->random()->id,
                    'paddock_id'         => $paddock->id,
                ]);
            }

            $totalAnimals += $count;
            $this->command->info("  ✓ {$farm->name}: {$count} animales creados.");
        }

        $this->command->info("Total: {$totalAnimals} animales creados en {$farms->count()} fincas.");
    }

    private static array $usedTags = [];

    private function generateUniqueEarTag(): int
    {
        do {
            $tag = rand(10000, 99999);
        } while (
            in_array($tag, self::$usedTags) ||
            Animal::where('ear_tag', $tag)->exists()
        );

        self::$usedTags[] = $tag;
        return $tag;
    }
}
