<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['compra', 'pago_subasta', 'deposito_subasta'];

        // Distribución de estados para las transacciones de pago (60 en total)
        $statusPool = array_merge(
            array_fill(0, 42, 'aprobada'),  // 70%
            array_fill(0, 6, 'pendiente'),  // 10%
            array_fill(0, 6, 'rechazada'),  // 10%
            array_fill(0, 6, 'expirada'),   // 10%
        );
        shuffle($statusPool);

        foreach ($statusPool as $index => $status) {
            $i = $index + 1;

            Transaction::create([
                'wompi_id'           => 'wompi_' . Str::upper(Str::random(18)) . "_{$i}",
                'internal_reference' => 'TRX-' . now()->format('Ymd') . '-' . str_pad((string) $i, 5, '0', STR_PAD_LEFT),
                'transaction_date'   => now()->subDays(rand(1, 120))->subMinutes(rand(0, 1440)),
                'moneda'             => 'COP',
                'amount'             => round(rand(80000, 850000) / 100, 2),
                'transaction_status' => $status,
                'transaction_type'   => $types[array_rand($types)],
            ]);
        }

        // Generar reembolsos para algunas transacciones aprobadas
        $approved = Transaction::where('transaction_status', 'aprobada')
            ->inRandomOrder()
            ->take(8)
            ->get();

        foreach ($approved as $original) {
            Transaction::create([
                'transaction_id'     => $original->id,
                'wompi_id'           => 'wompi_REF_' . Str::upper(Str::random(16)),
                'internal_reference' => 'REF-' . $original->internal_reference,
                'transaction_date'   => $original->transaction_date->copy()->addDays(rand(1, 15)),
                'moneda'             => 'COP',
                'amount'             => $original->amount,
                'transaction_status' => 'reembolsada',
                'transaction_type'   => 'reembolso',
            ]);

            // La transacción original queda marcada como reembolsada
            $original->update(['transaction_status' => 'reembolsada']);
        }

        $this->command->info('Transacciones creadas: ' . Transaction::count());
    }
}
