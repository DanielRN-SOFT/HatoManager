<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\AnimalCategory;
use App\Models\Breed;
use App\Models\Farm;
use App\Models\Paddock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class AnimalSeeder extends Seeder
{
    private array $cattlePhotos = [
        'M' => [
            'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
        ],
        'H' => [
            'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
        ],
    ];

    /** Rutas locales cacheadas: ['M' => [...paths], 'H' => [...paths]] */
    private array $localPhotos = ['M' => [], 'H' => []];

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

        // Descargar todas las imágenes una sola vez antes de crear animales
        $this->command->info('Descargando imágenes de ganado...');
        $this->downloadAllPhotos();

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

        $statuses = ['Activo', 'Inactivo', 'Vendido', 'Reservado', 'Muerto', 'Publicado'];

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
            $paddocks = Paddock::where('farm_id', $farm->id)->get();

            if ($paddocks->isEmpty()) {
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

                $paddock = $paddocks->random();

                $animal = Animal::create([
                    'name'               => $name,
                    'ear_tag'            => $this->generateUniqueEarTag(),
                    'breed_id'           => $breeds->random()->id,
                    'sex'                => $sex,
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

                // Adjuntar imagen desde disco local — sin petición HTTP por animal
                $localPaths = $this->localPhotos[$sex];

                if (!empty($localPaths)) {
                    $sourcePath = $localPaths[array_rand($localPaths)];

                    // Copiar a un temporal para que Spatie no borre el original
                    $tmpPath = sys_get_temp_dir() . '/' . uniqid('animal_') . '.jpg';
                    copy($sourcePath, $tmpPath);

                    $animal
                        ->addMedia($tmpPath)
                        ->toMediaCollection('animals');
                }
            }

            $totalAnimals += $count;
            $this->command->info("  ✓ {$farm->name}: {$count} animales creados.");
        }

        $this->command->info("Total: {$totalAnimals} animales creados en {$farms->count()} fincas.");

        // Limpiar archivos temporales de caché
        $this->cleanupTempPhotos();
    }

    /**
     * Descarga cada URL una sola vez y la guarda en /tmp.
     * Los animales posteriores usan los archivos locales — sin reintentar HTTP.
     */
    private function downloadAllPhotos(): void
    {
        foreach ($this->cattlePhotos as $sex => $urls) {
            foreach ($urls as $index => $url) {
                $tmpPath = sys_get_temp_dir() . "/cattle_{$sex}_{$index}.jpg";

                // Reusar si ya existe de una ejecución previa en la misma sesión
                if (file_exists($tmpPath)) {
                    $this->localPhotos[$sex][] = $tmpPath;
                    continue;
                }

                try {
                    $response = Http::timeout(10)->get($url);

                    if ($response->successful()) {
                        file_put_contents($tmpPath, $response->body());
                        $this->localPhotos[$sex][] = $tmpPath;
                        $this->command->line("  ↓ Imagen {$sex}[{$index}] descargada.");
                    } else {
                        $this->command->warn("  ⚠ No se pudo descargar {$url} (HTTP {$response->status()})");
                    }
                } catch (\Exception $e) {
                    $this->command->warn("  ⚠ Error descargando {$url}: {$e->getMessage()}");
                }
            }
        }

        $totalM = count($this->localPhotos['M']);
        $totalH = count($this->localPhotos['H']);
        $this->command->info("  ✓ Imágenes listas: {$totalM} machos, {$totalH} hembras.");
    }

    /**
     * Elimina los archivos de caché temporal al finalizar.
     */
    private function cleanupTempPhotos(): void
    {
        foreach ($this->localPhotos as $paths) {
            foreach ($paths as $path) {
                if (file_exists($path)) {
                    unlink($path);
                }
            }
        }
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
