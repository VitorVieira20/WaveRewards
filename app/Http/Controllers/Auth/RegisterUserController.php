<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class RegisterUserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }


    public function store(CreateUserRequest $request)
    {
        $user = $this->userService->create($request);

        if (!$user) {
            return redirect()->route('auth.index', 'signup')->with('errors', 'Não foi possível criar conta. Tente mais tarde.');
        }

        // Depois fazer para enviar um email com o link de confirmação

        // Como a parte do email ainda não está implementada, vamos validar o email do user aqui
        $user->update(['email_verified_at' => now()]);
        $user->fresh();

        return redirect()->route('auth.index', 'login');
    }
}
