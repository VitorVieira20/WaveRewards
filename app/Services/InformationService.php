<?php

namespace App\Services;

class InformationService
{
    public function getInformations()
    {
        return [
            [
                'image' => asset('storage/informations/information_1.png'),
                'title' => 'Ecossistemas Marinhos de Portugal'
            ],
            [
                'image' => asset('storage/informations/information_2.png'),
                'title' => 'Impacto do Lixo Marítimo'
            ],
            [
                'image' => asset('storage/informations/information_3.png'),
                'title' => 'Rotas Ecológicas Certificadas'
            ],
            [
                'image' => asset('storage/informations/information_4.png'),
                'title' => 'História da Canoagem em Portugal'
            ]
        ];
    }
}