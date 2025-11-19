<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    public function create()
    {
        return Inertia::render('ForgotPassword');
    }


    public function store(ForgotPasswordRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $token = Password::getRepository()->create($user);

            Mail::to($user->email)->queue(new ResetPasswordMail($token));
        }

        return back()->with('success', 'Se o email estiver registado no sistema, receberás um link de recuperação em breve.');
    }
}