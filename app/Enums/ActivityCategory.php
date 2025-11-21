<?php

namespace App\Enums;

enum ActivityCategory: string
{
    case BEGINNER = 'Iniciantes';
    case INTERMEDIATE = 'Intermédias';
    case COORDINATION = 'Coordenação e Resistência';
    case COMPETITION = 'Competição e Recreação';


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