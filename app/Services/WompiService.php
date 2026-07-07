<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WompiService
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.wompi.sandbox', true)
            ? 'https://sandbox.wompi.co/v1'
            : 'https://production.wompi.co/v1';
    }

    /**
     * Solicita el void/refund a Wompi y registra la transacción de reembolso.
     * Retorna la Transaction creada (tipo 'reembolso').
     */
    public function solicitarReembolso(
        Transaction $original,
        string $motivo,
        float $monto // para reembolsos parciales por animal
    ): Transaction {
        // Crear registro de reembolso en BD primero (optimistic, sin wompi_id aún)
        $reembolso = Transaction::create([
            'transaction_id' => $original->id, // FK al pago original
            'wompi_id' => null, // se llena si Wompi responde
            'internal_reference' => $original->internal_reference . '-REF-' . now()->timestamp,
            'transaction_date' => now(),
            'moneda' => $original->moneda,
            'amount' => $monto,
            'transaction_status' => 'pendiente',
            'transaction_type' => 'reembolso',
            'motivo_reembolso' => $motivo,
        ]);

        try {
            $response = Http::withToken(config('services.wompi.private_key'))
                ->post("{$this->baseUrl}/transactions/{$original->wompi_id}/void");

            $data = $response->json();
            $estado = strtolower($data['data']['status'] ?? '');

            // Wompi: VOIDED = aprobado, cualquier otro = fallo
            $aprobado = $response->successful() && $estado === 'voided';

            $reembolso->update([
                'wompi_id' => $data['data']['id'] ?? null,
                'transaction_status' => $aprobado ? 'reembolsada' : 'rechazada',
            ]);

            if (! $aprobado) {
                Log::error('Wompi rechazó reembolso', [
                    'original_wompi_id' => $original->wompi_id,
                    'response' => $data,
                ]);

                // Antes esto no se relanzaba: el llamador (handleAnimalOrderAction)
                // seguía de largo, liberaba el animal y marcaba "Rechazado" como si
                // el reembolso hubiera sido exitoso. Al lanzar aquí, la transacción
                // envolvente hace rollback real (animal, status_order, notificación
                // no se aplican) y el pedido queda intacto para reintentar.
                throw new \RuntimeException(
                    'Wompi rechazó el reembolso: ' . ($data['data']['status_message'] ?? $estado)
                );
            }
        } catch (\RuntimeException $e) {
            throw $e;
        } catch (\Throwable $e) {
            $reembolso->update(['transaction_status' => 'rechazada']);
            Log::error('Excepción al solicitar reembolso Wompi', [
                'error' => $e->getMessage(),
                'original_wompi_id' => $original->wompi_id,
            ]);

            throw new \RuntimeException(
                'No se pudo procesar el reembolso con Wompi: ' . $e->getMessage(),
                previous: $e
            );
        }

        return $reembolso->fresh();
    }
}
