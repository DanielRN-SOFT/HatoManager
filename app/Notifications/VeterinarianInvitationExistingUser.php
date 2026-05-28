<?php

namespace App\Notifications;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Notificación enviada a un veterinario que YA tiene cuenta.
 * Le informa que fue vinculado a una finca y puede aceptar o rechazar.
 */
class VeterinarianInvitationExistingUser extends Notification
{
    use Queueable;

    public function __construct(
        public readonly Farm $farm,
        public readonly User $ganadero,
        public readonly int  $invitationId,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $acceptUrl = route('veterinarios.invitation.respond', [
            'invitation' => $this->invitationId,
            'action'     => 'accept',
        ]);

        $rejectUrl = route('veterinarios.invitation.respond', [
            'invitation' => $this->invitationId,
            'action'     => 'reject',
        ]);

        return (new MailMessage)
            ->subject("Invitación a la finca {$this->farm->name} — HatoManager")
            ->greeting("Hola {$notifiable->name},")
            ->line("El ganadero **{$this->ganadero->name}** te ha invitado a vincularte como veterinario de la finca **{$this->farm->name}** ({$this->farm->city}, {$this->farm->department}).")
            ->line('Si aceptas, tendrás acceso al estado sanitario de los animales de esa finca y podrás registrar vacunas y generar certificados.')
            ->action('Aceptar invitación', $acceptUrl)
            ->line("Si no deseas vincularte, puedes [rechazar la invitación]({$rejectUrl}).")
            ->line('Este enlace es personal y no debe compartirse.')
            ->salutation('Equipo HatoManager');
    }
}
