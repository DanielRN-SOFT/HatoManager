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
        // Transacciones "de pago" (no reembolsos) disponibles para asociar 1 a 1 con órdenes
        $transactions = Transaction::where('transaction_type', '!=', 'reembolso')
            ->orderBy('id')
            ->get();

        if ($transactions->isEmpty()) {
            $this->command->error('No hay transacciones. Ejecuta TransactionSeeder primero.');
            return;
        }

        // Usuario que tendrá al menos 30 órdenes (y por lo tanto 30 transacciones propias)
        $mainUser = User::role('comprador')->first()
            ?? User::role('ganadero')->first();

        if (!$mainUser) {
            $this->command->error('No hay usuarios con rol ganadero o comprador. Ejecuta RolesAndPermissionsSeeder y UserSeeder primero.');
            return;
        }

        // Resto de usuarios (ganadero/comprador) para las demás órdenes
        $otherUsers = User::role(['ganadero', 'comprador'])
            ->where('id', '!=', $mainUser->id)
            ->get();

        if ($otherUsers->isEmpty()) {
            $otherUsers = collect([$mainUser]);
        }

        $totalOrders    = $transactions->count();
        $mainUserOrders = min(30, $totalOrders);

        foreach ($transactions as $index => $transaction) {
            $i = $index + 1;

            $user = $i <= $mainUserOrders
                ? $mainUser
                : $otherUsers->random();

            [$paymentStatus, $bussinessStatus] = $this->resolveStatuses($transaction->transaction_status);

            $order = new Order([
                'date'             => $transaction->transaction_date,
                'bussiness_status' => $bussinessStatus,
                'payment_status'   => $paymentStatus,
                'subtotal'         => $transaction->amount,
                'referencia'       => 'ORD-' . now()->format('Ymd') . '-' . str_pad((string) $i, 5, '0', STR_PAD_LEFT),
                'user_id'          => $user->id,
            ]);

            // transaction_id no está en $fillable del modelo, se asigna directamente
            $order->transaction_id = $transaction->id;
            $order->save();
        }

        $this->command->info("Órdenes creadas: {$totalOrders}");
        $this->command->info("  · {$mainUser->email} (rol {$mainUser->getRoleNames()->first()}): {$mainUserOrders} órdenes / transacciones");
    }

    /**
     * Mapea el estado de la transacción a los estados de pago/negocio de la orden.
     *
     * @return array{0: string, 1: string}
     */
    private function resolveStatuses(string $transactionStatus): array
    {
        return match ($transactionStatus) {
            'aprobada' => [
                'Aprobado',
                fake()->randomElement(['Confirmado', 'Completado', 'Pendiente de confirmacion']),
            ],
            'reembolsada' => ['Reembolsado', 'Cancelado por comprador'],
            'pendiente'   => ['Pendiente', 'Pendiente de confirmacion'],
            'rechazada'   => [
                'Rechazado',
                fake()->randomElement(['Cancelado por comprador', 'Rechazado por ganadero']),
            ],
            'expirada' => ['Expirado', 'Cancelado por comprador'],
            default    => ['Pendiente', 'Pendiente de confirmacion'],
        };
    }
}
