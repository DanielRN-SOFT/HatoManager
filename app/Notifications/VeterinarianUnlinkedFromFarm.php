<?php

namespace App\Notifications;

use App\Models\Farm;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Notificación enviada al veterinario cuando es desvinculado de una finca.
 * RF-06: el veterinario debe recibir un correo de aviso.
 */
class VeterinarianUnlinkedFromFarm extends Notification
{
    use Queueable;

    public function __construct(
        public readonly Farm $farm,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Acceso revocado — Finca {$this->farm->name}")
            ->view('emails.vet-unlinked', [
                'farm'       => $this->farm,
                'notifiable' => $notifiable,
            ]);
    }
}
