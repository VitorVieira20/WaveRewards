<?php

namespace App\Http\Controllers\Auth;

use App\Enums\LogType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use App\Traits\LogsActivity;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    use LogsActivity;

    public function create()
    {
        return Inertia::render('ForgotPassword');
    }


    public function store(ForgotPasswordRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $token = Password::getRepository()->create($user);

            $this->logActivity(
                "Esqueceu Password: Email de reset vai ser enviado",
                LogType::AUTH,
            );

            Mail::to($user->email)->queue(new ResetPasswordMail($token));
        } else {
            $this->logActivity(
                "Esqueceu Password: Tentou usar um email não encontrado",
                LogType::AUTH,
                ['email' => $request->email]
            );
        }

        return back()->with('success', 'Se o email estiver registado no sistema, receberás um link de recuperação em breve.');
    }
}