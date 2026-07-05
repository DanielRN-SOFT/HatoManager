<?php

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\VerifyEmailResponse as VerifyEmailResponseContract;

class VerifyEmailResponse implements VerifyEmailResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return redirect()->route('admin');
        }

        if ($user->hasRole('comprador')) {
            return redirect()->route('ecommerce.index');
        }

        // Veterinario: NO debe ir al dashboard automáticamente
        if ($user->hasRole('veterinario')) {
            return redirect()->route('login')
                ->with('status', 'Tu correo ha sido verificado. Por favor inicia sesión.');
        }

        // Ganadero: mantiene el flujo normal hacia el dashboard
        if ($user->hasRole('ganadero')) {
            if ($user->farms()->count() > 1) {
                return redirect()->route('select-farm.index');
            }
            $farm = $user->farms()->first();
            if ($farm) {
                session(['active_farm_id' => $farm->id]);
            }
            return redirect()->route('dashboard');
        }

        return redirect()->intended(config('fortify.home'));
    }
}
