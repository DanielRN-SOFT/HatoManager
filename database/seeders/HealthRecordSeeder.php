<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\HealthAlert;
use App\Models\HealthRecord;
use Illuminate\Database\Seeder;

class HealthRecordSeeder extends Seeder
{
    public function run(): void
    {
        $animals = Animal::with('farm.users')->get();
        $types   = ['vacuna', 'desparasitacion', 'tratamiento'];
        $products = [
            'vacuna'          => ['Vacuna Aftosa', 'Vacuna Brucelosis', 'Vacuna Carbunco', 'Vacuna IBR', 'Vacuna Leptospira', 'Vacuna Rotavirus'],
            'desparasitacion' => ['Ivermectina', 'Albendazol', 'Doramectina', 'Fenbendazol', 'Ivermectina Plus'],
            'tratamiento'     => ['Penicilina', 'Oxitetraciclina', 'Enrofloxacina', 'Florfenicol', 'Vitamina AD3E'],
        ];

        foreach ($animals as $animal) {
            $count = rand(5, 12);

            for ($i = 0; $i < $count; $i++) {
                $type      = $types[array_rand($types)];
                $product   = $products[$type][array_rand($products[$type])];
                $appliedAt = now()->subDays(rand(30, 365));
                $nextDate  = rand(0, 1) ? $appliedAt->copy()->addDays(rand(7, 90)) : null;
                $registeredBy = $animal->farm->users->first()?->id ?? 2;

                $record = HealthRecord::create([
                    'animal_id'     => $animal->id,
                    'registered_by' => $registeredBy,
                    'type'          => $type,
                    'product'       => $product,
                    'dose'          => rand(2, 15) . 'ml',
                    'applied_at'    => $appliedAt,
                    'next_date'     => $nextDate,
                    'notes'         => rand(0, 1) ? 'Aplicación rutinaria' : null,
                ]);

                if ($nextDate) {
                    HealthAlert::create([
                        'health_record_id' => $record->id,
                        'animal_id'        => $animal->id,
                        'type'             => $type,
                        'alert_date'       => $nextDate,
                        'status'           => 'pendiente',
                    ]);
                }
            }
        }
    }
}
