<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\AnimalCategory;
use App\Models\Breed;
use App\Models\Farm;
use App\Models\Paddock;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class AnimalSeeder extends Seeder
{
    // -------------------------------------------------------------------------
    // Imágenes por raza (Unsplash, 400×300, fit=crop)
    // -------------------------------------------------------------------------
    private array $breedPhotos = [
        'Brahman' => [
            'M' => [
                'https://images.unsplash.com/photo-1767103843277-453cdfee20cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1767103844436-1866dd4481d0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ],
            'H' => [
                'https://plus.unsplash.com/premium_photo-1677850457283-3523ea2954bb?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1774828732384-6c0134c29425?q=80&w=1061&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ],
        ],
        'Cebú' => [
            'M' => [
                'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
            ],
        ],
        'Angus' => [
            'M' => [
                'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
            ],
        ],
        'Hereford' => [
            'M' => [
                'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
            ],
        ],
        'Simmental' => [
            'M' => [
                'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
            ],
        ],
        'Charolais' => [
            'M' => [
                'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
            ],
        ],
        'Limousin' => [
            'M' => [
                'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
            ],
        ],
        'Holstein' => [
            'M' => [
                'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
            ],
        ],
        'Gyr' => [
            'M' => [
                'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?w=400&h=300&fit=crop',
            ],
        ],
        'Romosinuano' => [
            'M' => [
                'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
            ],
        ],
        'Blanco Orejinegro' => [
            'M' => [
                'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
            ],
        ],
        'Costeño con Cuernos' => [
            'M' => [
                'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
            ],
        ],
        'Sanmartinero' => [
            'M' => [
                'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
            ],
        ],
        // Fallback genérico para razas no listadas
        '_default' => [
            'M' => [
                'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
            ],
            'H' => [
                'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
            ],
        ],
    ];

    // -------------------------------------------------------------------------
    // Datos zootécnicos por raza
    // -------------------------------------------------------------------------

    /**
     * Peso adulto promedio en kg [min, max] por raza y sexo.
     * Fuente: tablas ICA / FEDEGAN para condiciones tropicales colombianas.
     */
    private array $breedWeightRanges = [
        // [macho_min, macho_max, hembra_min, hembra_max]
        'Brahman'            => [550, 900, 380, 580],
        'Cebú'               => [500, 850, 350, 550],
        'Angus'              => [700, 1000, 450, 700],
        'Hereford'           => [680, 980, 420, 650],
        'Simmental'          => [800, 1100, 500, 750],
        'Charolais'          => [850, 1150, 550, 800],
        'Limousin'           => [750, 1050, 500, 720],
        'Holstein'           => [700, 950, 500, 700],
        'Gyr'                => [480, 800, 320, 520],
        'Romosinuano'        => [420, 700, 280, 460],
        'Blanco Orejinegro'  => [380, 620, 260, 420],
        'Costeño con Cuernos' => [400, 650, 270, 440],
        'Sanmartinero'       => [450, 720, 300, 480],
    ];

    /** Propósito principal de cada raza para construir descripciones coherentes. */
    private array $breedPurpose = [
        'Brahman'            => 'carne',
        'Cebú'               => 'carne',
        'Angus'              => 'carne',
        'Hereford'           => 'carne',
        'Simmental'          => 'doble propósito',
        'Charolais'          => 'carne',
        'Limousin'           => 'carne',
        'Holstein'           => 'leche',
        'Gyr'                => 'leche',
        'Romosinuano'        => 'carne',
        'Blanco Orejinegro'  => 'doble propósito',
        'Costeño con Cuernos' => 'doble propósito',
        'Sanmartinero'       => 'carne',
    ];

    /**
     * Enfermedades más frecuentes por propósito productivo.
     * La primera entrada ('Ninguna') pesa más gracias al array_rand ponderado.
     */
    private array $diseasesByPurpose = [
        'carne' => [
            'Ninguna',
            'Ninguna',
            'Ninguna',
            'Fiebre aftosa — vacunado y recuperado',
            'Parásitos gastrointestinales — desparasitado (Ivermectina)',
            'Tristeza bovina (Babesiosis) — tratado con Diminazeno',
            'Clostridiosis — vacunado (Clostri 8)',
            'Dermatofitosis leve — tratado con antifúngico tópico',
            'Neumonía — tratado con oxitetraciclina, recuperado',
            'Diarrea bovina — tratado con suero oral y antibiótico',
        ],
        'leche' => [
            'Ninguna',
            'Ninguna',
            'Ninguna',
            'Mastitis subclínica — tratado con cefalosporina intramamaria',
            'Cetosis posparto — tratado con propilenglicol oral',
            'Hipocalcemia (fiebre de leche) — tratado con Ca IV, recuperado',
            'Metritis — tratado con antibiótico sistémico',
            'Parásitos gastrointestinales — desparasitado (Levamisol)',
            'Brucelosis — vacunada (RB51), negativa en última prueba',
            'Leptospirosis — vacunada, sin signos clínicos',
        ],
        'doble propósito' => [
            'Ninguna',
            'Ninguna',
            'Ninguna',
            'Mastitis clínica leve — tratado y recuperado',
            'Parásitos gastrointestinales — desparasitado',
            'Tristeza bovina — tratado con Imidocarb, recuperado',
            'Fiebre aftosa — vacunado, sin secuelas',
            'Metritis leve posparto — tratado con antibiótico',
            'Dermatitis nodular — tratado con antiinflamatorio',
        ],
    ];

    /** Caché de archivos descargados: ['breedSex_index' => '/tmp/path.jpg'] */
    private array $localPhotos = [];

    // -------------------------------------------------------------------------
    // run()
    // -------------------------------------------------------------------------

    public function run(): void
    {
        $farms      = Farm::all();
        $categories = AnimalCategory::all();
        $breeds     = Breed::all()->keyBy('name'); // indexar por nombre

        if ($farms->isEmpty()) {
            $this->command->error('No hay fincas. Ejecuta FarmSeeder primero.');
            return;
        }
        if ($categories->isEmpty()) {
            $this->command->error('No hay categorías. Ejecuta AnimalCategorySeeder primero.');
            return;
        }
        if ($breeds->isEmpty()) {
            $this->command->error('No hay razas. Ejecuta BreedSeeder primero.');
            return;
        }

        $this->command->info('Descargando imágenes por raza...');
        $this->downloadAllPhotos();

        $statuses = ['Activo', 'Activo', 'Activo', 'Publicado', 'Publicado', 'Reservado', 'Vendido', 'Inactivo'];

        $totalAnimals = 0;

        foreach ($farms as $farm) {
            $paddocks = Paddock::where('farm_id', $farm->id)->get();

            if ($paddocks->isEmpty()) {
                $this->command->warn("  ⚠ {$farm->name} no tiene lotes. Omitiendo.");
                continue;
            }

            $count = rand(20, 28);

            for ($i = 0; $i < $count; $i++) {
                // 1:3 machos por cada hembra (proporción típica de rodeo de cría)
                $sex = ($i % 4 === 0) ? 'M' : 'H';

                // Elegir raza aleatoria de las disponibles
                $breed       = $breeds->random();
                $breedName   = $breed->name;
                $purpose     = $this->breedPurpose[$breedName] ?? 'carne';
                $weightRange = $this->breedWeightRanges[$breedName]
                    ?? ($sex === 'M' ? [400, 700] : [280, 480]);

                // Edad entre 8 meses y 6 años
                $ageInDays = rand(240, 365 * 6);
                $birthDate = now()->subDays($ageInDays);
                $ageMonths = (int) ($ageInDays / 30);

                // Peso proporcional a la edad (crecimiento sigmoide simplificado)
                $maturityRatio = min(1.0, $ageMonths / 36); // madura ~3 años
                if ($sex === 'M') {
                    $minW  = $weightRange[0];
                    $maxW  = $weightRange[1];
                } else {
                    $minW  = $weightRange[2];
                    $maxW  = $weightRange[3];
                }
                $baseWeight = $minW + ($maturityRatio * ($maxW - $minW));
                $weight     = (int) ($baseWeight + rand(-20, 20));
                $weight     = max($minW, min($maxW, $weight));

                $name    = $sex === 'M'
                    ? $this->maleName()
                    : $this->femaleName();

                $disease = $this->randomDisease($purpose);

                $animal = Animal::create([
                    'name'               => $name,
                    'ear_tag'            => $this->generateUniqueEarTag(),
                    'breed_id'           => $breed->id,
                    'sex'                => $sex,
                    'birth_date'         => $birthDate->toDateString(),
                    'status'             => $statuses[array_rand($statuses)],
                    'description'        => $this->buildDescription($breedName, $sex, $purpose, $weight, $ageMonths, $farm),
                    'previous_diseases'  => $disease,
                    'price'              => round($weight * ($farm->price_weight / 1000), 2),
                    'target_weight'      => $farm->target_weight,
                    'price_weight'       => $farm->price_weight,
                    'publication_date'   => now()->subDays(rand(0, 60))->toDateString(),
                    'farm_id'            => $farm->id,
                    'animal_category_id' => $categories->random()->id,
                    'paddock_id'         => $paddocks->random()->id,
                ]);

                // Adjuntar imagen de la raza correcta
                $localPath = $this->getLocalPhoto($breedName, $sex);
                if ($localPath) {
                    $tmpPath = sys_get_temp_dir() . '/' . uniqid('animal_') . '.jpg';
                    copy($localPath, $tmpPath);
                    $animal->addMedia($tmpPath)->toMediaCollection('animals');
                }
            }

            $totalAnimals += $count;
            $this->command->info("  ✓ {$farm->name}: {$count} animales creados.");
        }

        $this->command->info("Total: {$totalAnimals} animales en {$farms->count()} fincas.");
        $this->cleanupTempPhotos();
    }

    // -------------------------------------------------------------------------
    // Nombres realistas para Colombia
    // -------------------------------------------------------------------------

    private function maleName(): string
    {
        $names = [
            // Clásicos de hacienda
            'Trueno',
            'Tornado',
            'Rayo',
            'Ciclón',
            'Vendaval',
            // Fuerza / tamaño
            'Coloso',
            'Titán',
            'Goliat',
            'Sansón',
            'Atlas',
            // Deidades / héroes
            'Zeus',
            'Ares',
            'Hércules',
            'Neptuno',
            'Marte',
            // Llanos orientales
            'Llanero',
            'Morichal',
            'Caribe',
            'Orinoco',
            'Casanare',
            // Otros populares
            'Bravo',
            'Sultán',
            'Maverick',
            'Rocoso',
            'Corsario',
            'Señor',
            'Padrote',
            'Imperial',
            'Guerrero',
            'Vigía',
        ];
        return $names[array_rand($names)];
    }

    private function femaleName(): string
    {
        $names = [
            // Naturaleza
            'Luna',
            'Estrella',
            'Nube',
            'Brisa',
            'Aurora',
            'Paloma',
            'Canela',
            'Mora',
            'Perla',
            'Rosa',
            // Flores colombianas
            'Orquídea',
            'Azucena',
            'Magnolia',
            'Violeta',
            'Heliconea',
            // Dulzura / ternura
            'Dulce',
            'Miel',
            'Caramel',
            'Azúcar',
            'Vainilla',
            // Nombres de persona clásicos de finca
            'Reina',
            'Princesa',
            'Bella',
            'Diana',
            'Gloria',
            'Lucía',
            'Esperanza',
            'Consuelo',
            'Rosalba',
            'Fátima',
        ];
        return $names[array_rand($names)];
    }

    // -------------------------------------------------------------------------
    // Descripción narrativa realista
    // -------------------------------------------------------------------------

    private function buildDescription(
        string $breedName,
        string $sex,
        string $purpose,
        int    $weight,
        int    $ageMonths,
        Farm   $farm
    ): string {
        $sexLabel = $sex === 'M' ? 'macho' : 'hembra';
        $ageYears = floor($ageMonths / 12);
        $ageRem   = $ageMonths % 12;

        $ageStr = $ageYears > 0
            ? "{$ageYears} año(s) y {$ageRem} mes(es)"
            : "{$ageMonths} meses";

        $purposeMap = [
            'carne'          => 'producción de carne con excelente conformación muscular',
            'leche'          => 'producción de leche con alta capacidad lechera',
            'doble propósito' => 'doble propósito (carne y leche)',
        ];
        $purposeDesc = $purposeMap[$purpose] ?? 'producción bovina';

        $conditionScore = rand(3, 5); // Condición corporal 3–5 (escala 1–5, BCS)

        $traits = [
            'carne' => [
                'Ganancia diaria de peso dentro del rango esperado para la raza.',
                'Muy buen temperamento; fácil manejo en manga y báscula.',
                'Conformación corporal amplia con buena profundidad de costillar.',
                'Musculatura posterior bien desarrollada, apta para mercado carnicero.',
                'Patas y pezuñas en excelente estado, sin signos de cojera.',
            ],
            'leche' => [
                'Ubre bien implantada con pezones de inserción uniforme.',
                'Alta producción sostenida durante toda la lactancia.',
                'Temperamento tranquilo; se ordeña con facilidad en sala convencional.',
                'Buena persistencia de lactancia sin picos extremos.',
                'Fertilidad comprobada: intervalo parto–concepción menor a 90 días.',
            ],
            'doble propósito' => [
                'Buena producción de leche y aceptable peso al destete de la cría.',
                'Adaptada a pastoreo extensivo con gramíneas tropicales.',
                'Resistente al calor y a ectoparásitos propios de la zona.',
                'Temperamento manejable tanto en ordeño como en corral.',
                'Relación carne/leche equilibrada, rentable para la economía del productor.',
            ],
        ];

        $traitList  = $traits[$purpose] ?? $traits['carne'];
        $traitCount = rand(2, 3);
        $selected   = (array) array_rand(array_flip($traitList), $traitCount);
        $traitText  = implode(' ', $selected);

        return "Animal {$sexLabel} de raza {$breedName}, orientado a {$purposeDesc}. "
            . "Edad: {$ageStr}. Peso actual: {$weight} kg. "
            . "Condición corporal: {$conditionScore}/5. "
            . "Criado en {$farm->city}, {$farm->department}, bajo pastoreo rotacional con suplementación mineral. "
            . $traitText;
    }

    // -------------------------------------------------------------------------
    // Enfermedades ponderadas
    // -------------------------------------------------------------------------

    private function randomDisease(string $purpose): string
    {
        $pool = $this->diseasesByPurpose[$purpose] ?? $this->diseasesByPurpose['carne'];
        return $pool[array_rand($pool)];
    }

    // -------------------------------------------------------------------------
    // Gestión de fotos
    // -------------------------------------------------------------------------

    private function downloadAllPhotos(): void
    {
        foreach ($this->breedPhotos as $breed => $sexPhotos) {
            foreach ($sexPhotos as $sex => $urls) {
                foreach ($urls as $index => $url) {
                    $key     = $this->photoKey($breed, $sex, $index);
                    $tmpPath = sys_get_temp_dir() . "/cattle_{$key}.jpg";

                    if (file_exists($tmpPath)) {
                        $this->localPhotos[$key] = $tmpPath;
                        continue;
                    }

                    try {
                        $response = Http::timeout(10)->get($url);
                        if ($response->successful()) {
                            file_put_contents($tmpPath, $response->body());
                            $this->localPhotos[$key] = $tmpPath;
                            $this->command->line("  ↓ {$breed} [{$sex}][{$index}] descargada.");
                        } else {
                            $this->command->warn("  ⚠ HTTP {$response->status()} al descargar {$url}");
                        }
                    } catch (\Exception $e) {
                        $this->command->warn("  ⚠ Error: {$e->getMessage()} ({$url})");
                    }
                }
            }
        }

        $total = count($this->localPhotos);
        $this->command->info("  ✓ {$total} imágenes listas en caché.");
    }

    private function getLocalPhoto(string $breedName, string $sex): ?string
    {
        $photos = $this->breedPhotos[$breedName][$sex]
            ?? $this->breedPhotos['_default'][$sex]
            ?? [];

        if (empty($photos)) {
            return null;
        }

        $index = array_rand($photos);
        $key   = $this->photoKey($breedName, $sex, $index);

        return $this->localPhotos[$key] ?? null;
    }

    private function photoKey(string $breed, string $sex, int $index): string
    {
        // Normalizar el nombre de la raza para usarlo como clave de archivo
        return preg_replace('/[^a-zA-Z0-9]/', '_', "{$breed}_{$sex}_{$index}");
    }

    private function cleanupTempPhotos(): void
    {
        foreach ($this->localPhotos as $path) {
            if (file_exists($path)) {
                unlink($path);
            }
        }
        $this->command->info('  ✓ Archivos temporales eliminados.');
    }

    // -------------------------------------------------------------------------
    // Ear tag único
    // -------------------------------------------------------------------------

    private static array $usedTags = [];

    private function generateUniqueEarTag(): int
    {
        do {
            $tag = rand(10000, 99999);
        } while (
            in_array($tag, self::$usedTags, true) ||
            Animal::where('ear_tag', $tag)->exists()
        );

        self::$usedTags[] = $tag;
        return $tag;
    }
}
