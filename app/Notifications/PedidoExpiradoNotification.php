<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoExpiradoNotification extends Notification
{
    use Queueable;

    public function __construct(public readonly Order $order) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'order_id'  => $this->order->id,
            'reference' => $this->order->reference,
            'monto'     => $this->order->subtotal,
            'mensaje'   => "Tu pedido #{$this->order->id} (ref: {$this->order->reference}) fue cancelado automáticamente por no completar el pago en 24 horas.",
        ];
    }
}
