<?php
namespace App\Http\Responses;

use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;

class PasswordConfirmationResponse implements PasswordConfirmedResponseContract
{
    public function toResponse($request)
    {
        return redirect()->intended('/profile');
    }
}
