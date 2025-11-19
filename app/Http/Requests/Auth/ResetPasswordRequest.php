<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ];
    }


    public function messages(): array
    {
        return [
            'token.required' => 'O token de recuperação é obrigatório.',
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'O email não tem um formato válido.',
            'password.required' => 'A palavra-passe é obrigatória.',
            'password.confirmed' => 'As palavras-passe não coincidem.',
            'password.min' => 'A palavra-passe deve ter pelo menos 8 caracteres.',
        ];
    }
}
