<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateUserRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'min:2',
                'max:100',
                'regex:/^[A-Za-zÀ-ÿ\s\'-]+$/u',
            ],
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'max:64',
                'regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/',
                'confirmed',
            ],
        ];
    }


    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.regex' => 'O nome só pode conter letras e espaços.',
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'O email inserido não é válido.',
            'email.unique' => 'O email inserido não é válido.',
            'password.required' => 'A password é obrigatória.',
            'password.min' => 'A password deve ter pelo menos :min caracteres.',
            'password.regex' => 'A password deve conter pelo menos uma letra maiúscula, uma minúscula e um número.',
            'password.confirmed' => 'As passwords não coincidem.',
        ];
    }
}
