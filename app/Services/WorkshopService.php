<?php

namespace App\Services;

class WorkshopService
{
    public function getWorkshops()
    {
        return [
            [
                'image' => asset('storage/workshops/workshop_1.png'),
                'title' => 'Técnicas de Remada para Iniciantes'
            ],
            [
                'image' => asset('storage/workshops/workshop_2.png'),
                'title' => 'Segurança Aquática e Primeiros Socorros'
            ],
            [
                'image' => asset('storage/workshops/workshop_3.png'),
                'title' => 'Navegação e Orientação Marítima'
            ],
            [
                'image' => asset('storage/workshops/workshop_4.png'),
                'title' => 'Canoagem em Águas Agitadas'
            ]
        ];
    }
}