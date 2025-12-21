<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
        $userId = Auth::id();

        return [
            'name' => ['sometimes', 'string', 'min:2', 'max:100', 'regex:/^[A-Za-zÀ-ÿ\s\'-]+$/u'],
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'email' => [ 'sometimes', 'string', 'email:rfc,dns', 'max:255', Rule::unique('users', 'email')->ignore($userId),],
            'username' => ['sometimes', 'string', 'min:2', 'max:100'],
            'address' => ['sometimes', 'string', 'min:2', 'max:100'],
        ];
    }
}
