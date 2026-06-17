<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Jobs\CancelarPedidosPendientes;
use App\Jobs\CheckVacunasVencidas;

Schedule::job(new CancelarPedidosPendientes)->hourly();

Schedule::job(new CheckVacunasVencidas)->dailyAt('07:00');

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
