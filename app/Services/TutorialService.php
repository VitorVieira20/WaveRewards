<?php

namespace App\Services;

class TutorialService
{
    private array $tutorialsMock;

    public function __construct()
    {
        $this->tutorialsMock = [
            [
                'id' => 1,
                'image' => asset('storage/tutorials/tutorial_1.png'),
                'title' => 'Como Escolher o Teu Caiaque',
                'url' => 'https://www.youtube.com/watch?v=hW6NGXUqis8'
            ],
            [
                'id' => 2,
                'image' => asset('storage/tutorials/tutorial_2.png'),
                'title' => 'Remada em J: Técnica Essencial',
                'url' => 'https://www.youtube.com/watch?v=u59K-msjuu0'
            ],
            [
                'id' => 3,
                'image' => asset('storage/tutorials/tutorial_3.png'),
                'title' => 'Manobras de Resgate e Auto-Resgate',
                'url' => 'https://www.youtube.com/watch?v=87EjC2_F14Q'
            ],
            [
                'id' => 4,
                'image' => asset('storage/tutorials/tutorial_4.png'),
                'title' => 'Preparação Física para Canoagem',
                'url' => 'https://www.youtube.com/watch?v=L7Rwg94JuJk'
            ]
        ];
    }


    public function getTutorials()
    {
        return $this->tutorialsMock;
    }


    public function getTutorialById(int $id)
    {
        $tutorial = array_filter($this->tutorialsMock, function ($item) use ($id) {
            return $item['id'] === $id;
        });

        return !empty($tutorial) ? array_values($tutorial)[0] : null;
    }
}