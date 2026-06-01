<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Mail\AlertasSanitariasMail;
use Illuminate\Mail\Mailable;

class VacunasProximasNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly array $alertasPorFinca,
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $totalAlertas = collect($this->alertasPorFinca)
            ->sum(fn($alertas) => count($alertas));

        $totalFincas = count($this->alertasPorFinca);

        return [
            'alertas_por_finca' => $this->alertasPorFinca,
            'total_alertas'     => $totalAlertas,
            'total_fincas'      => $totalFincas,
            'mensaje'           => "Tienes {$totalAlertas} alertas sanitarias pendientes en {$totalFincas} " . ($totalFincas === 1 ? 'finca' : 'fincas'),
        ];
    }
}
