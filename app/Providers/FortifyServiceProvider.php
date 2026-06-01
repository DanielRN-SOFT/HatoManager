<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Http\Responses\LoginResponse;
use App\Http\Responses\PasswordConfirmationResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; // correcto
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Reemplaza el LoginResponse de Fortify
        $this->app->singleton(LoginResponseContract::class, LoginResponse::class);
        $this->app->singleton(PasswordConfirmedResponseContract::class, PasswordConfirmationResponse::class);
        // Vista del challenge al hacer login
        Fortify::twoFactorChallengeView(function () {
            return inertia('Auth/TwoFactorChallenge');
        });
    }

    /**
     * Bootstrap any application services.
     */

    public function boot(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::redirectUserForTwoFactorAuthenticationUsing(RedirectIfTwoFactorAuthenticatable::class);

        // Vistas Inertia (React)
        Fortify::loginView(fn() => Inertia::render('Auth/Login', [
            'status' => session('status'),
        ]));

        Fortify::registerView(fn() => Inertia::render('Auth/Register'));

        Fortify::requestPasswordResetLinkView(fn() => Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]));

        Fortify::resetPasswordView(fn() => Inertia::render('Auth/ResetPassword', [
            'email' => request()->input('email'),
            'token' => request()->route('token'),
        ]));

        Fortify::verifyEmailView(fn() => Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
        ]));

        Fortify::confirmPasswordView(fn() => inertia('Auth/ConfirmPassword'));

        Fortify::twoFactorChallengeView(fn() => inertia('Auth/TwoFactorChallenge'));

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())) . '|' . $request->ip());
            return Limit::perMinute(5)->by($throttleKey);
        });
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
        RateLimiter::for('passkeys', function (Request $request) {
            $credentialId = $request->input('credential.id');
            return Limit::perMinute(10)->by(
                ($credentialId ?: $request->session()->getId()) . '|' . $request->ip()
            );
        });
    }
}
