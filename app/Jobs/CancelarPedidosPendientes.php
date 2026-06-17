<?php

namespace App\Jobs;

use App\Models\Order;
use App\Notifications\PedidoExpiradoNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CancelarPedidosPendientes implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        $pedidos = Order::with(['animals.farm.users', 'user'])
            ->where('bussiness_status', 'Pendiente de pago')
            ->where('created_at', '<=', now()->subHours(24))
            ->get();

        foreach ($pedidos as $order) {
            DB::transaction(function () use ($order) {
                $order->update(['bussiness_status' => 'Cancelado por expiración']);

                foreach ($order->animals as $animal) {
                    if ($animal->status === 'Reservado') {
                        $animal->update(['status' => 'Publicado']);
                    }
                    $order->animals()->updateExistingPivot($animal->id, [
                        'status_order' => 'Cancelado',
                    ]);
                }

                $order->user?->notify(new PedidoExpiradoNotification($order));
            });

            Log::info("Pedido #{$order->id} expirado y cancelado automáticamente.");
        }
    }
}
