<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string'],
            'password' => ['required', 'confirmed', 'min:8', 'string', 'different:current_password'],
        ];
    }


    public function messages(): array
    {
        return [
            'current_password.required' => 'A password atual é obrigatória.',
            'password.required' => 'A nova password é obrigatória.',
            'password.confirmed' => 'As passwords não coincidem.',
            'password.min' => 'A nova password deve ter pelo menos 8 caracteres.',
            'password.different' => 'A nova password deve ser diferente da password atual.',
        ];
    }
}
