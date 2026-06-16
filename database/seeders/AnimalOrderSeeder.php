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
        $orders = Order::with('user')->get();

        if ($orders->isEmpty()) {
            $this->command->error('No hay órdenes. Ejecuta OrderSeeder primero.');
            return;
        }

        $availableAnimals = Animal::whereIn('status', ['Publicado', 'Reservado'])
            ->whereNotNull('price')
            ->with(['farm.users'])
            ->get()
            ->filter(function ($animal) {
                return $animal->farm
                    && $animal->farm->users->isNotEmpty()
                    && $animal->farm->users->contains(fn($u) => $u->hasRole('ganadero'));
            })->values();

        if ($availableAnimals->isEmpty()) {
            $this->command->error('Ningún animal tiene finca con ganadero asignado.');
            return;
        }

        $totalLines    = 0;
        $usedAnimalIds = [];

        foreach ($orders as $order) {
            $statusOrder = $this->statusOrderFor($order->bussiness_status);
            $orderUser   = $order->user;
            $isGanadero  = $orderUser && $orderUser->hasRole('ganadero');

            if ($isGanadero) {
                // Compra: animales de fincas ajenas al ganadero comprador
                $pool = $availableAnimals
                    ->filter(fn($a) => $a->farm->users->doesntContain('id', $orderUser->id))
                    ->whereNotIn('id', $usedAnimalIds)
                    ->values();

                // Fallback sin restricción de usedAnimalIds
                if ($pool->isEmpty()) {
                    $pool = $availableAnimals
                        ->filter(fn($a) => $a->farm->users->doesntContain('id', $orderUser->id))
                        ->values();
                }
            } else {
                // Venta: cualquier animal disponible
                $pool = $availableAnimals->whereNotIn('id', $usedAnimalIds)->values();

                if ($pool->isEmpty()) {
                    $pool = $availableAnimals;
                }
            }

            if ($pool->isEmpty()) {
                continue;
            }

            $maxAnimals      = in_array($order->bussiness_status, ['Confirmado', 'Completado']) ? 3 : 1;
            $cantidad        = min(rand(1, $maxAnimals), $pool->count());
            $animalsForOrder = $pool->random($cantidad);
            $subtotal        = 0;

            foreach ($animalsForOrder as $animal) {
                $ganadero = $animal->farm->users->first(fn($u) => $u->hasRole('ganadero'));

                AnimalOrder::create([
                    'animal_id'      => $animal->id,
                    'order_id'       => $order->id,
                    'user_id'        => $ganadero->id,
                    'status_order'   => $statusOrder,
                    'snapshot_price' => $animal->price,
                ]);

                $subtotal        += $animal->price;
                $usedAnimalIds[]  = $animal->id;
                $totalLines++;

                $newAnimalStatus = $this->animalStatusFor($order->bussiness_status, $animal->status);
                if ($newAnimalStatus !== $animal->status) {
                    $animal->update(['status' => $newAnimalStatus]);
                }
            }

            $order->update(['subtotal' => $subtotal]);
        }

        $this->command->info("Líneas animal_order creadas: {$totalLines}");
    }

    private function statusOrderFor(string $bussinessStatus): string
    {
        return match ($bussinessStatus) {
            'Confirmado', 'Completado'                          => 'Confirmado',
            'Cancelado por comprador', 'Rechazado por ganadero' => 'Rechazado',
            default                                              => 'Pendiente de confirmacion',
        };
    }

    private function animalStatusFor(string $bussinessStatus, string $currentStatus): string
    {
        return match ($bussinessStatus) {
            'Completado'                                        => 'Vendido',
            'Confirmado'                                        => 'Reservado',
            'Cancelado por comprador', 'Rechazado por ganadero',
            'Expirado'                                          => 'Publicado',
            default                                             => 'Reservado',
        };
    }
}
