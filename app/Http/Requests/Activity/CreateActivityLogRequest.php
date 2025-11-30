<?php

namespace App\Http\Requests\Activity;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateActivityLogRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'activity_id' => ['required', 'integer', 'exists:activities,id'],
            'distance' => ['required', 'integer', 'min:0'],
            'practice_time' => ['required', 'integer', 'min:1'],
            'wasted_calories' => ['required', 'integer', 'min:0'],
            'frequency' => ['required', 'integer', 'min:30', 'max:230'],
            'effort' => ['required', 'integer', 'min:1', 'max:10'],
            'observations' => ['nullable', 'string', 'max:500'],
            'counts_for_goal' => ['required', 'boolean'],
        ];
    }

    /**
     * Nomes amigáveis para os atributos (útil para as mensagens de erro no Frontend)
     */
    public function attributes(): array
    {
        return [
            'activity_id' => 'atividade',
            'distance' => 'distância',
            'practice_time' => 'tempo de prática',
            'wasted_calories' => 'calorias gastas',
            'frequency' => 'frequência cardíaca',
            'effort' => 'nível de esforço',
            'observations' => 'observações',
        ];
    }

    /**
     * Mensagens personalizadas (opcional)
     */
    public function messages(): array
    {
        return [
            'effort.min' => 'O nível de esforço deve ser no mínimo 1.',
            'effort.max' => 'O nível de esforço não pode ser superior a 10.',
            'activity_id.exists' => 'A atividade selecionada não é válida.',
        ];
    }
}