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
        $acceptUrl = route('veterinarians.invitation.respond', [
            'invitation' => $this->invitationId,
            'action'     => 'accept',
        ]);

        $rejectUrl = route('veterinarians.invitation.respond', [
            'invitation' => $this->invitationId,
            'action'     => 'reject',
        ]);

        return (new MailMessage)
            ->subject("Invitación a la finca {$this->farm->name} — HatoManager")
            ->view('emails.vet-invitation-existing-user', [
                'farm'       => $this->farm,
                'ganadero'   => $this->ganadero,
                'acceptUrl'  => $acceptUrl,
                'rejectUrl'  => $rejectUrl,
                'notifiable' => $notifiable,
            ]);
    }
}
