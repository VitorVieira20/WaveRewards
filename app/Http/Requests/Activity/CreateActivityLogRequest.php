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
            'distance' => ['required', 'integer', 'min:0', 'max:100000'],
            'practice_time' => ['required', 'integer', 'min:1', 'max:1440'],
            'wasted_calories' => ['required', 'integer', 'min:0', 'max:10000'],
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


    public function messages(): array
    {
        return [
            'activity_id.required' => 'A atividade é obrigatória.',
            'distance.required' => 'A distância é obrigatória.',
            'practice_time.required' => 'O tempo de prática é obrigatório.',
            'wasted_calories.required' => 'As calorias são obrigatórias.',
            'frequency.required' => 'A frequência cardíaca é obrigatória.',
            'effort.required' => 'O nível de esforço é obrigatório.',
            'counts_for_goal.required' => 'Indique se conta para o objetivo.',

            'activity_id.integer' => 'Atividade inválida.',
            'activity_id.exists' => 'A atividade selecionada não é válida.',
            'distance.integer' => 'A distância deve ser um número inteiro.',
            'practice_time.integer' => 'O tempo deve ser um número inteiro.',
            'wasted_calories.integer' => 'As calorias devem ser um número inteiro.',
            'frequency.integer' => 'A frequência deve ser um número inteiro.',
            'effort.integer' => 'O nível de esforço deve ser um número inteiro entre 1 e 10.',
            'observations.max' => 'As observações não podem exceder 500 caracteres.',

            'distance.min' => 'A distância não pode ser negativa.',
            'distance.max' => 'Uma atividade não pode ter mais de 100km.',
            'practice_time.min' => 'O tempo de prática deve ser de pelo menos 1 minuto.',
            'practice_time.max' => 'O tempo de prática não pode exceder 24 horas.',
            'wasted_calories.min' => 'Não pode introduzir menos que 0 kcal.',
            'wasted_calories.max' => 'Não pode introduzir mais que 10000 kcal.',
            'frequency.min' => 'Não pode introduzir menos que 30 bpm.',
            'frequency.max' => 'Não pode introduzir mais que 230 bpm.',
            'effort.min' => 'O nível de esforço deve ser no mínimo 1.',
            'effort.max' => 'O nível de esforço não pode ser superior a 10.',
        ];
    }
}