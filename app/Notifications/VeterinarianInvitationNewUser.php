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
        // Al registrarse con este token, el sistema le asignará rol veterinario
        // y lo vinculará automáticamente a la finca.
        $registerUrl = route('register', ['vet_token' => $this->token]);

        return (new MailMessage)
            ->subject("Te invitaron a HatoManager como veterinario — {$this->farm->name}")
            ->greeting('¡Hola!')
            ->line("El ganadero **{$this->ganadero->name}** te ha invitado a unirte a HatoManager como veterinario de la finca **{$this->farm->name}** ({$this->farm->city}, {$this->farm->department}).")
            ->line('HatoManager es una plataforma de gestión ganadera. Como veterinario vinculado podrás registrar vacunas, eventos sanitarios y generar certificados para esta finca.')
            ->action('Crear cuenta y aceptar invitación', $registerUrl)
            ->line('⚠️ Este enlace es válido por **48 horas** y es de uso personal. No lo compartas.')
            ->line('Si no conoces a este ganadero o no esperabas esta invitación, ignora este mensaje.')
            ->salutation('Equipo HatoManager');
    }
}
