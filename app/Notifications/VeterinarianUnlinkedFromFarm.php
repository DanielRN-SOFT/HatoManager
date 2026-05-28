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
            ->greeting("Hola {$notifiable->name},")
            ->line("Te informamos que tu acceso como veterinario a la finca **{$this->farm->name}** ({$this->farm->city}, {$this->farm->department}) ha sido revocado.")
            ->line('A partir de este momento ya no podrás ver el inventario ni los registros sanitarios de esa finca. Tu acceso a otras fincas vinculadas no se ve afectado.')
            ->line('Si crees que esto fue un error, comunícate directamente con el ganadero responsable de la finca.')
            ->salutation('Equipo HatoManager');
    }
}
