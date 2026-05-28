<?php

namespace App\Notifications;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Notificación enviada a un correo que NO tiene cuenta en HatoManager.
 * Incluye un token de invitación con vigencia de 48 horas.
 */
class VeterinarianInvitationNewUser extends Notification
{
    use Queueable;

    public function __construct(
        public readonly Farm   $farm,
        public readonly User   $ganadero,
        public readonly string $token,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $registerUrl = route('register', ['vet_token' => $this->token]);

        return (new MailMessage)
            ->subject("Te invitaron a HatoManager como veterinario — {$this->farm->name}")
            ->view('emails.vet-invitation-new-user', [
                'farm'        => $this->farm,
                'ganadero'    => $this->ganadero,
                'registerUrl' => $registerUrl,
                'notifiable'  => $notifiable,
            ]);
    }
}
