<?php

namespace App\Notifications;

use App\Models\AnimalOrder;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AnimalConfirmadoNotification extends Notification
{
    use Queueable;

    public function __construct(public readonly AnimalOrder $row) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'order_id'    => $this->row->order_id,
            'animal_id'   => $this->row->animal_id,
            'animal_name' => $this->row->animal->name,
            'mensaje'     => "El ganadero confirmó la venta de {$this->row->animal->name}.",
        ];
    }
}
