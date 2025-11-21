<?php

namespace App\Enums;

enum ActivityLevel: string
{
    case BASIC = 'Básico';
    case INTERMEDIATE = 'Intermédio';
    case ADVANCED = 'Avançado';


    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }


    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->value,
        ], self::cases());
    }
}