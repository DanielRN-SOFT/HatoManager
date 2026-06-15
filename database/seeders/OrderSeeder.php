<?php
// OrderSeeder.php
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

        $mainUser = User::role('comprador')->first()
            ?? User::role('ganadero')->first();

        if (!$mainUser) {
            $this->command->error('No hay usuarios con rol comprador o ganadero.');
            return;
        }

        $otherUsers = User::role(['ganadero', 'comprador'])
            ->where('id', '!=', $mainUser->id)
            ->get();

        if ($otherUsers->isEmpty()) {
            $otherUsers = collect([$mainUser]);
        }

        $totalOrders    = $transactions->count();
        $mainUserOrders = min(30, $totalOrders);

        foreach ($transactions as $index => $transaction) {
            $i    = $index + 1;
            $user = $i <= $mainUserOrders ? $mainUser : $otherUsers->random();

            [$paymentStatus, $bussinessStatus] = $this->resolveStatuses($transaction->transaction_status);

            // La referencia usa la fecha real de la transacción, no now()
            $dateForRef = $transaction->transaction_date->format('Ymd');

            $order                 = new Order([
                'date'             => $transaction->transaction_date,
                'bussiness_status' => $bussinessStatus,
                'payment_status'   => $paymentStatus,
                // El subtotal lo actualizará AnimalOrderSeeder con la suma real
                // Por ahora usamos el monto de la transacción como placeholder
                'subtotal'         => $transaction->amount,
                'reference'        => 'ORD-' . $dateForRef . '-' . str_pad((string) $i, 5, '0', STR_PAD_LEFT),
                'user_id'          => $user->id,
            ]);
            $order->transaction_id = $transaction->id;
            $order->save();
        }

        $this->command->info("Órdenes creadas: {$totalOrders}");
        $this->command->info(
            "  · {$mainUser->email} ({$mainUser->getRoleNames()->first()}): {$mainUserOrders} órdenes"
        );
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
