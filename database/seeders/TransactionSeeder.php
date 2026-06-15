<?php
// TransactionSeeder.php
namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        // Tipos con distribución realista: la mayoría son compras directas
        $typePool = array_merge(
            array_fill(0, 45, 'compra'),           // 75%
            array_fill(0, 10, 'pago_subasta'),     // 17%
            array_fill(0,  5, 'deposito_subasta'), //  8%
        );
        shuffle($typePool);

        // Estados con distribución realista
        $statusPool = array_merge(
            array_fill(0, 42, 'aprobada'),   // 70%
            array_fill(0,  6, 'pendiente'),  // 10%
            array_fill(0,  6, 'rechazada'),  // 10%
            array_fill(0,  6, 'expirada'),   // 10%
        );
        shuffle($statusPool);

        // Fechas con tendencia creciente: más actividad reciente
        // Generamos 60 fechas distribuidas en los últimos 120 días,
        // con mayor densidad en los últimos 30.
        $dates = $this->generateDates(60);

        foreach ($statusPool as $index => $status) {
            $i    = $index + 1;
            $date = $dates[$index];
            $type = $typePool[$index];

            // Montos realistas por tipo (en COP, sin decimales extraños)
            $amount = $this->realisticAmount($type);

            Transaction::create([
                'wompi_id'           => 'wompi_' . Str::upper(Str::random(18)) . "_{$i}",
                'internal_reference' => 'TRX-' . $date->format('Ymd') . '-' . str_pad((string) $i, 5, '0', STR_PAD_LEFT),
                'transaction_date'   => $date,
                'moneda'             => 'COP',
                'amount'             => $amount,
                'transaction_status' => $status,
                'transaction_type'   => $type,
            ]);
        }

        // Reembolsos: sólo sobre aprobadas (no sobre pendientes/rechazadas)
        $approved = Transaction::where('transaction_status', 'aprobada')
            ->where('transaction_type', '!=', 'deposito_subasta') // los depósitos no se reembolsan así
            ->inRandomOrder()
            ->take(6)
            ->get();

        foreach ($approved as $original) {
            Transaction::create([
                'transaction_id'     => $original->id,
                'wompi_id'           => 'wompi_REF_' . Str::upper(Str::random(16)),
                'internal_reference' => 'REF-' . $original->internal_reference,
                'transaction_date'   => $original->transaction_date->copy()->addDays(rand(3, 20)),
                'moneda'             => 'COP',
                'amount'             => $original->amount,
                'transaction_status' => 'reembolsada',
                'transaction_type'   => 'reembolso',
            ]);

            $original->update(['transaction_status' => 'reembolsada']);
        }

        $this->command->info('Transacciones creadas: ' . Transaction::count());
    }

    /**
     * Genera $count fechas con mayor densidad en los últimos 30 días
     * (comportamiento de plataforma en crecimiento).
     */
    private function generateDates(int $count): array
    {
        $dates = [];

        for ($i = 0; $i < $count; $i++) {
            // 60% de las fechas en los últimos 30 días, 40% entre 31-120
            if (rand(1, 100) <= 60) {
                $daysAgo = rand(0, 30);
            } else {
                $daysAgo = rand(31, 120);
            }

            $dates[] = now()
                ->subDays($daysAgo)
                ->subHours(rand(0, 23))
                ->subMinutes(rand(0, 59));
        }

        // Ordenar de más antigua a más reciente para que los IDs sean coherentes
        usort($dates, fn($a, $b) => $a <=> $b);

        return $dates;
    }

    /**
     * Montos realistas según el tipo de transacción (COP, ganado bovino colombiano).
     * Compra directa: 1.5M – 12M
     * Pago subasta:   2M  – 15M
     * Depósito:       500k – 2M
     */
    private function realisticAmount(string $type): float
    {
        [$min, $max] = match ($type) {
            'compra'           => [1_500_000, 12_000_000],
            'pago_subasta'     => [2_000_000,  15_000_000],
            'deposito_subasta' => [500_000,   2_000_000],
            default            => [1_000_000,   8_000_000],
        };

        // Múltiplo de 50.000 para que parezca un precio real de ganado
        $steps = ($max - $min) / 50_000;

        return $min + (rand(0, (int) $steps) * 50_000);
    }
}
