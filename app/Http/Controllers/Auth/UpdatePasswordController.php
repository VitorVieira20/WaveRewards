<?php

namespace App\Http\Controllers\Auth;

use App\Enums\LogType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Traits\LogsActivity;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UpdatePasswordController extends Controller
{
    use LogsActivity;

    public function store(UpdatePasswordRequest $request)
    {
        $user = $request->user();

        if (! Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'A password atual fornecida não corresponde à nossa base de dados.',
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        $this->logActivity("Utilizador alterou a password (Definições)", LogType::AUTH);

        return redirect()->route('profile.index')->with('success', 'Password alterada com sucesso.');
    }
}