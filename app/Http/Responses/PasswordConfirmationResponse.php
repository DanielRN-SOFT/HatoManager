<?php
namespace App\Http\Responses;

use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;

class PasswordConfirmationResponse implements PasswordConfirmedResponseContract
{
    public function toResponse($request)
    {
        $redirect = $request->input('redirect')
            ?? $request->session()->pull('url.intended')
            ?? '/profile';

        return redirect($redirect);
    }
}
