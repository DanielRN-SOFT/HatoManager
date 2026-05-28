<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        // Primero verificar si ya está verificado para no repetir el proceso
        if (! $request->user()->hasVerifiedEmail()) {
            $request->fulfill(); // markEmailAsVerified() + dispara evento Verified
        }

        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return redirect()->intended(route('admin', absolute: false));
        }

        if ($user->hasRole('comprador')) {
            return redirect()->intended(route('subastas', absolute: false));
        }

        if ($user->hasRole('ganadero') || $user->hasRole('veterinario')) {
            if ($user->farms()->count() > 1) {
                return redirect()->intended(route('select-farm', absolute: false));
            }

            $farm = $user->farms()->first();

            if ($farm) {
                session(['active_farm_id' => $farm->id]);
            }

            return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
        }

        return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
    }
}
