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
            'distance'          => ['required', 'numeric', 'min:0'],
            'practice_time'     => ['required', 'numeric', 'min:1'],
            'wasted_calories'   => ['required', 'integer', 'min:0'],
            'frequency'         => ['required', 'integer', 'min:30', 'max:230'],
            'effort'            => ['required', 'integer', 'min:1', 'max:10'],
            
            'activity_id'       => ['nullable', 'integer', 'exists:activities,id'],
            'trash_collected'   => ['nullable', 'numeric', 'min:0'],
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
}