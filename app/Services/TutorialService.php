<?php

namespace App\Services;

class TutorialService
{
    public function getTutorials()
    {
        return [
            [
                'image' => asset('storage/tutorials/tutorial_1.png'),
                'title' => 'Como Escolher o Teu Caiaque'
            ],
            [
                'image' => asset('storage/tutorials/tutorial_2.png'),
                'title' => 'Remada em J: Técnica Essencial'
            ],
            [
                'image' => asset('storage/tutorials/tutorial_3.png'),
                'title' => 'Manobras de Resgate e Auto-Resgate'
            ],
            [
                'image' => asset('storage/tutorials/tutorial_4.png'),
                'title' => 'Preparação Física para Canoagem'
            ]
        ];
    }
}