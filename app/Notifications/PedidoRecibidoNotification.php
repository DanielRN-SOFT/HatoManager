<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PedidoRecibidoNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly Order $order,
        public readonly array $animalesPropios, // [{id, name, snapshot_price}]
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'order_id'      => $this->order->id,
            'reference'     => $this->order->reference,
            'subtotal'      => $this->order->subtotal,
            'animales'      => $this->animalesPropios,
            'comprador_id'  => $this->order->user_id,
            'mensaje'       => 'Tienes un nuevo pedido pendiente de confirmación con '
                . count($this->animalesPropios) . ' '
                . (count($this->animalesPropios) === 1 ? 'animal' : 'animales'),
        ];
    }
}
    