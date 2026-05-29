<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        // Verifica si la contraseña fue confirmada recientemente (2 horas por defecto)
        $passwordConfirmed = $request->session()->has('auth.password_confirmed_at')
            && (time() - $request->session()->get('auth.password_confirmed_at')) < config('auth.password_timeout', 10800);

        return Inertia::render('TwoFactor/Manage', [
            'enabled'           => !is_null($user->two_factor_secret),
            'confirmed'         => !is_null($user->two_factor_confirmed_at),
            'passwordConfirmed' => $passwordConfirmed,
            'qrCode'            => $user->two_factor_secret
                ? $user->twoFactorQrCodeSvg()
                : null,
            'setupKey'          => $user->two_factor_secret
                ? decrypt($user->two_factor_secret)
                : null,
            'recoveryCodes'     => $user->two_factor_secret
                ? json_decode(decrypt($user->two_factor_recovery_codes), true)
                : [],
        ]);
    }
}
