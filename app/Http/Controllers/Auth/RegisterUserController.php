<?php

namespace App\Http\Controllers\Auth;

use App\Enums\LogType;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Models\Settings;
use App\Services\UserService;
use App\Traits\LogsActivity;

class RegisterUserController extends Controller
{
    use LogsActivity;

    public function __construct(protected UserService $userService)
    {
    }


    public function store(CreateUserRequest $request)
    {
        $user = $this->userService->create($request);

        if (!$user) {
            $this->logActivity("Falha no registo de novo utilizador", LogType::AUTH, ['email' => $request->email]);
            return redirect()->route('auth.index', 'signup')->with('error', 'Não foi possível criar conta. Tente mais tarde.');
        }

        $this->logActivity("Novo utilizador registado (Manul)", LogType::AUTH, [
            'user_id' => $user->id,
            'email' => $user->email
        ]);

        // Depois fazer para enviar um email com o link de confirmação

        // Como a parte do email ainda não está implementada, vamos validar o email do user aqui
        $user->update(['email_verified_at' => now()]);
        $user->fresh();

        Settings::firstOrCreate(['user_id' => $user->id]);

        return redirect()->route('auth.index', 'login')->with('success', 'Conta criada com sucesso.');
    }
}
