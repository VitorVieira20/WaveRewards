<?php

namespace App\Http\Requests\Activity;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateFreeActivityLogRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'custom_title'      => ['required', 'string', 'max:255'],
            'custom_location'   => ['required', 'string', 'max:255'],
            'custom_conditions' => ['required', 'string', 'max:255'],
            'custom_equipment'  => ['required', 'string', 'max:255'],
            'date'              => ['required', 'date'],
            'start_time'        => ['required'],
            'distance' => ['required', 'integer', 'min:0', 'max:100000'],
            'practice_time' => ['required', 'integer', 'min:1', 'max:1440'],
            'wasted_calories' => ['required', 'integer', 'min:0', 'max:10000'],
            'frequency'         => ['required', 'integer', 'min:30', 'max:230'],
            'effort'            => ['required', 'integer', 'min:1', 'max:10'],
            
            'activity_id'       => ['nullable', 'integer', 'exists:activities,id'],
            'trash_collected'   => ['nullable', 'numeric', 'min:0', 'max:100000'],
            'photo'             => ['nullable', 'image', 'max:10240'],
            'counts_for_goal'   => ['boolean'],
            'observations'      => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * Custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'custom_title'      => 'tipo de atividade',
            'custom_location'   => 'local',
            'custom_conditions' => 'condições',
            'custom_equipment'  => 'equipamento',
            'date'              => 'data',
            'start_time'        => 'hora de início',
            'trash_collected'   => 'lixo recolhido',
            'photo'             => 'fotografia',
        ];
    }

    /**
     * Mensagens personalizadas (opcional)
     */
    public function messages(): array
    {
        return [
            'distance.max' => 'Uma atividade não pode ter mais de 100km.',
            'practice_time.max' => 'O tempo de prática não pode exceder 24 horas.',
            'effort.min' => 'O nível de esforço deve ser no mínimo 1.',
            'effort.max' => 'O nível de esforço não pode ser superior a 10.',
        ];
    }
}