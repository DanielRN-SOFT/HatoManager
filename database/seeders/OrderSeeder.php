<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $transactions = Transaction::where('transaction_type', '!=', 'reembolso')
            ->orderBy('transaction_date')
            ->get();

        if ($transactions->isEmpty()) {
            $this->command->error('No hay transacciones. Ejecuta TransactionSeeder primero.');
            return;
        }

        $ganadero = User::role('ganadero')->where('email', 'ganadero@gmail.com')->first();
        $comprador = User::role('comprador')->first();

        if (!$ganadero) {
            $this->command->error('No se encontró ganadero@gmail.com.');
            return;
        }

        $otherUsers = User::role(['ganadero', 'comprador'])
            ->where('id', '!=', $ganadero->id)
            ->get();

        if ($otherUsers->isEmpty()) {
            $otherUsers = collect([$ganadero]);
        }

        $totalOrders = $transactions->count();

        // Distribución:
        // - 20 órdenes donde OTRO compra (ventas del ganadero)
        // - 15 órdenes donde el ganadero compra (compras del ganadero)
        // - resto: otros usuarios
        $ventasGanadero  = 20;
        $comprasGanadero = 15;

        foreach ($transactions as $index => $transaction) {
            $i = $index + 1;

            if ($i <= $ventasGanadero) {
                // Otro usuario compra — esto generará ventas para el ganadero
                // porque sus animales estarán en estas órdenes via AnimalOrderSeeder
                $user = $comprador ?? $otherUsers->random();
            } elseif ($i <= $ventasGanadero + $comprasGanadero) {
                // El ganadero compra animales de otros
                $user = $ganadero;
            } else {
                // Resto: otros usuarios
                $user = $otherUsers->random();
            }

            [$paymentStatus, $bussinessStatus] = $this->resolveStatuses($transaction->transaction_status);

            $dateForRef = $transaction->transaction_date->format('Ymd');

            $order = new Order([
                'date'             => $transaction->transaction_date,
                'bussiness_status' => $bussinessStatus,
                'payment_status'   => $paymentStatus,
                'subtotal'         => $transaction->amount,
                'reference'        => 'ORD-' . $dateForRef . '-' . str_pad((string) $i, 5, '0', STR_PAD_LEFT),
                'user_id'          => $user->id,
            ]);

            $order->transaction_id = $transaction->id;
            $order->save();
        }

        $this->command->info("Órdenes creadas: {$totalOrders}");
        $this->command->info("  · Ventas del ganadero (órdenes de otros): {$ventasGanadero}");
        $this->command->info("  · Compras del ganadero: {$comprasGanadero}");
        $this->command->info("  · Resto de usuarios: " . ($totalOrders - $ventasGanadero - $comprasGanadero));
    }

    private function resolveStatuses(string $transactionStatus): array
    {
        return match ($transactionStatus) {
            'aprobada'    => [
                'Aprobado',
                fake()->randomElement(['Confirmado', 'Completado', 'Pendiente de confirmacion']),
            ],
            'reembolsada' => ['Reembolsado', 'Cancelado por comprador'],
            'pendiente'   => ['Pendiente',   'Pendiente de confirmacion'],
            'rechazada'   => [
                'Rechazado',
                fake()->randomElement(['Cancelado por comprador', 'Rechazado por ganadero']),
            ],
            'expirada'    => ['Expirado', 'Cancelado por comprador'],
            default       => ['Pendiente', 'Pendiente de confirmacion'],
        };
    }
}
