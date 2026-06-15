<?php
// AnimalOrderSeeder.php
namespace Database\Seeders;

use App\Models\Animal;
use App\Models\AnimalOrder;
use App\Models\Order;
use Illuminate\Database\Seeder;

class AnimalOrderSeeder extends Seeder
{
    public function run(): void
    {
        $orders = Order::all();

        if ($orders->isEmpty()) {
            $this->command->error('No hay órdenes. Ejecuta OrderSeeder primero.');
            return;
        }

        // Solo animales publicados o reservados tienen sentido en una orden
        $availableAnimals = Animal::whereIn('status', ['Publicado', 'Reservado'])
            ->whereNotNull('price')
            ->get();

        if ($availableAnimals->isEmpty()) {
            $this->command->error('No hay animales publicados con precio. Ejecuta AnimalSeeder primero.');
            return;
        }

        $totalLines    = 0;
        $usedAnimalIds = []; // Evita asignar el mismo animal a dos órdenes distintas

        foreach ($orders as $order) {
            $statusOrder = $this->statusOrderFor($order->bussiness_status);

            // Animales aún no usados
            $pool = $availableAnimals->whereNotIn('id', $usedAnimalIds)->values();

            if ($pool->isEmpty()) {
                // Si se agotaron los animales únicos, reutilizamos (edge case en seeds pequeños)
                $pool = $availableAnimals;
            }

            // Órdenes "completadas" pueden llevar hasta 3 animales;
            // las pendientes/rechazadas suelen ser 1 (el comprador no llegó a confirmar más)
            $maxAnimals = in_array($order->bussiness_status, ['Confirmado', 'Completado']) ? 3 : 1;
            $cantidad   = min(rand(1, $maxAnimals), $pool->count());

            $animalsForOrder = $pool->random($cantidad);
            $subtotal        = 0;

            foreach ($animalsForOrder as $animal) {
                AnimalOrder::create([
                    'animal_id'      => $animal->id,
                    'order_id'       => $order->id,
                    'user_id'        => $order->user_id,
                    'status_order'   => $statusOrder,
                    'snapshot_price' => $animal->price,
                ]);

                $subtotal        += $animal->price;
                $usedAnimalIds[]  = $animal->id;
                $totalLines++;

                // Actualizar estado del animal según resultado de la orden
                $newAnimalStatus = $this->animalStatusFor($order->bussiness_status, $animal->status);
                if ($newAnimalStatus !== $animal->status) {
                    $animal->update(['status' => $newAnimalStatus]);
                }
            }

            // Recalcular subtotal de la orden con los precios reales de los animales
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

    /**
     * El estado del animal en el catálogo debe reflejar qué pasó con su orden.
     * - Completado → Vendido (ya no aparece en el catálogo)
     * - Confirmado → Reservado (está en proceso, pero no libre)
     * - Cancelado/Rechazado/Expirado → vuelve a Publicado
     * - Pendiente → Reservado (se muestra como no disponible temporalmente)
     */
    private function animalStatusFor(string $bussinessStatus, string $currentStatus): string
    {
        return match ($bussinessStatus) {
            'Completado'                                         => 'Vendido',
            'Confirmado'                                         => 'Reservado',
            'Cancelado por comprador', 'Rechazado por ganadero',
            'Expirado'                                           => 'Publicado',
            default                                              => 'Reservado',
        };
    }
}
