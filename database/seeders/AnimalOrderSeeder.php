<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\AnimalOrder;
use App\Models\Order;
use Illuminate\Database\Seeder;

class AnimalOrderSeeder extends Seeder
{
    public function run(): void
    {
        $orders  = Order::all();
        $animals = Animal::all();

        if ($orders->isEmpty()) {
            $this->command->error('No hay órdenes. Ejecuta OrderSeeder primero.');
            return;
        }

        if ($animals->isEmpty()) {
            $this->command->error('No hay animales. Ejecuta AnimalSeeder primero.');
            return;
        }

        $totalLines = 0;

        foreach ($orders as $order) {
            $statusOrder = $this->statusOrderFor($order->bussiness_status);

            // Entre 1 y 3 animales por orden (sin exceder el total disponible)
            $cantidad = min(rand(1, 3), $animals->count());
            $animalsForOrder = $animals->random($cantidad);

            foreach ($animalsForOrder as $animal) {
                AnimalOrder::create([
                    'animal_id'      => $animal->id,
                    'order_id'       => $order->id,
                    'user_id'        => $order->user_id,
                    'status_order'   => $statusOrder,
                    'snapshot_price' => $animal->price,
                ]);

                $totalLines++;
            }
        }

        $this->command->info("Líneas animal_order creadas: {$totalLines}");
    }

    /**
     * Deriva el estado de cada línea animal_order a partir del estado de negocio de la orden.
     */
    private function statusOrderFor(string $bussinessStatus): string
    {
        return match ($bussinessStatus) {
            'Confirmado', 'Completado' => 'Confirmado',
            'Cancelado por comprador', 'Rechazado por ganadero' => 'Rechazado',
            default => 'Pendiente de confirmacion',
        };
    }
}
