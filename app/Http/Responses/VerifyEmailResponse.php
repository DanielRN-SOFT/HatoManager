<?php
// app/Http/Responses/VerifyEmailResponse.php
namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\VerifyEmailResponse as VerifyEmailResponseContract;

class VerifyEmailResponse implements VerifyEmailResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        $user = auth()->user();

        if ($user->hasRole('comprador')) {
            return redirect()->route('ecommerce.index');
        }

        // ganadero/veterinario van al dashboard normal
        return redirect()->intended(config('fortify.home'));
    }
}
