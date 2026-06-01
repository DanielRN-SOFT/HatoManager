<?php

namespace App\Jobs;

use App\Mail\AlertasSanitariasMail;
use App\Models\HealthAlert;
use App\Notifications\VacunasProximasNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class CheckVacunasVencidas implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        $ganaderos = \App\Models\User::role('ganadero')->with('farms')->get();

        foreach ($ganaderos as $ganadero) {
            $alertasPorFinca = [];

            foreach ($ganadero->farms as $farm) {
                $alertas = HealthAlert::with([
                    'healthRecord' => fn($q) => $q->select('id', 'product'),
                    'animal'       => fn($q) => $q->select('id', 'ear_tag', 'name'),
                ])
                    ->whereHas('healthRecord')
                    ->whereHas('animal', fn($q) => $q->where('farm_id', $farm->id))
                    ->where('status', 'pendiente')
                    ->whereBetween('alert_date', [now()->subDays(30), now()->addDays(7)])
                    ->orderBy('alert_date')
                    ->get();

                if ($alertas->isEmpty()) continue;

                $alertasPorFinca[$farm->name] = $alertas->map(fn($a) => [
                    'animal'   => ($a->animal->ear_tag ?? '') . ($a->animal->name ? " — {$a->animal->name}" : ''),
                    'producto' => $a->healthRecord->product ?? '—',
                    'tipo'     => $a->type,
                    'fecha'    => $a->alert_date,
                    'dias'     => now()->startOfDay()->diffInDays($a->alert_date, false),
                ])->toArray();
            }

            if (empty($alertasPorFinca)) continue;

            Mail::to($ganadero->email)
                ->send(new AlertasSanitariasMail(
                    alertasPorFinca: $alertasPorFinca,
                    nombreGanadero: $ganadero->name,
                ));

            $ganadero->notify(new VacunasProximasNotification($alertasPorFinca));
        }
    }
}
