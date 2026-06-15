<?php

namespace App\Notifications;

use App\Models\AnimalOrder;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AnimalRechazadoNotification extends Notification
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
            'monto'       => $this->row->snapshot_price,
            'mensaje'     => "El ganadero rechazó {$this->row->animal->name}. Se registró un reembolso de $" . number_format($this->row->snapshot_price, 2) . " COP.",
        ];
    }
}
