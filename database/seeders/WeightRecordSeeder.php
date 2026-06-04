<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\ProductiveStage;
use App\Models\WeightMethod;
use App\Models\WeightRecord;
use Illuminate\Database\Seeder;

class WeightRecordSeeder extends Seeder
{
    public function run(): void
    {
        $animals = Animal::all();
        $stages  = ProductiveStage::all();
        $methods = WeightMethod::all();

        if ($animals->isEmpty()) {
            $this->command->error('No hay animales. Ejecuta AnimalSeeder primero.');
            return;
        }

        if ($stages->isEmpty()) {
            $this->command->error('No hay etapas productivas. Ejecuta ProductiveStageSeeder primero.');
            return;
        }

        if ($methods->isEmpty()) {
            $this->command->error('No hay métodos de pesaje. Ejecuta WeightMethodSeeder primero.');
            return;
        }

        $bodyScores   = ['1', '2', '3', '4', '5'];
        $totalRecords = 0;

        foreach ($animals as $animal) {
            $recordCount    = rand(3, 8);
            $previousDate   = $animal->birth_date->copy()->addDays(rand(30, 90));
            $previousWeight = rand(40, 80);

            for ($i = 0; $i < $recordCount; $i++) {
                $weightDate = $previousDate->copy()->addDays(rand(30, 90));

                if ($weightDate->greaterThan(now())) {
                    break;
                }

                $daysDiff      = max(1, $previousDate->diffInDays($weightDate));
                $dailyGain     = round(rand(3, 12) / 10, 2);
                $currentWeight = round($previousWeight + ($dailyGain * $daysDiff), 2);
                $currentWeight = min($currentWeight, 650);

                // Elegir etapa coherente con el sexo del animal
                $eligibleStages = $animal->sex === 'M'
                    ? $stages->whereIn('name', ['Neonato', 'Lactancia', 'Destete', 'Levante', 'Ceba', 'Finalización'])
                    : $stages; // hembras pueden tener cualquier etapa

                $stage = $eligibleStages->isEmpty()
                    ? $stages->random()
                    : $eligibleStages->random();

                WeightRecord::create([
                    'weight_date'          => $weightDate,
                    'weight'               => $currentWeight,
                    'body_condition_score' => $bodyScores[array_rand($bodyScores)],
                    'observations'         => $this->randomObservation($currentWeight, $dailyGain),
                    'animal_id'           => $animal->id,
                    'productive_stage_id' => $stage->id,
                    'weight_method_id'    => $methods->random()->id,
                    'previous_fast'        => (bool) rand(0, 1),
                    'room_temperature'     => round(rand(180, 350) / 10, 2),
                ]);

                $previousDate   = $weightDate;
                $previousWeight = $currentWeight;
                $totalRecords++;
            }
        }

        $this->command->info("✓ {$totalRecords} registros de pesaje creados para {$animals->count()} animales.");
    }

    private function randomObservation(float $weight, float $dailyGain): string
    {
        $observations = [
            "Animal con buena condición general. GDP de {$dailyGain} kg/día.",
            "Pesaje rutinario sin novedades. Peso registrado: {$weight} kg.",
            "Animal activo y alerta durante el pesaje.",
            "Se recomienda revisar alimentación. GDP inferior al esperado.",
            "Excelente ganancia de peso. Animal en óptimas condiciones.",
            "Animal tranquilo durante el pesaje. Sin observaciones relevantes.",
            "Pesaje post-tratamiento. Evolución favorable.",
            "Animal con leve barro en pezuñas. Sin afectación en peso.",
        ];

        return $observations[array_rand($observations)];
    }
}
