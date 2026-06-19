<?php
// app/Http/Responses/TwoFactorLoginResponse.php
namespace App\Http\Responses;

use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;

class TwoFactorLoginResponse implements TwoFactorLoginResponseContract
{
    public function toResponse($request)
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return redirect()->route('admin');
        }
        if ($user->hasRole('comprador')) {
            return redirect()->route('ecommerce.index');
        }
        if ($user->hasRole('ganadero') || $user->hasRole('veterinario')) {
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
