<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return redirect()->route('users.index');
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
