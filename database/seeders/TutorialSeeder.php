<?php

namespace Database\Seeders;

use App\Models\Tutorial;
use Illuminate\Database\Seeder;

class TutorialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tutorials = $this->getTutorialsData();

        foreach ($tutorials as $data) {
            $tutorial = Tutorial::updateOrCreate(
                ['title' => $data['title']],
                $data
            );

            if ($tutorial->wasRecentlyCreated) {
                $this->command->info("Tutorial created: {$data['title']}");
            } else {
                $this->command->comment("Tutorial updated: {$data['title']}");
            }
        }
    }


    private function getTutorialsData(): array
    {
        return [
            [
                'thumbnail' => 'images/tutorials/tutorial_1.png',
                'title' => 'Como Escolher o Teu Caiaque',
                'url' => 'https://www.youtube.com/watch?v=xFXEWXeAMfM'
            ],
            [
                'thumbnail' => 'images/tutorials/tutorial_2.png',
                'title' => 'Remada em J: Técnica Essencial',
                'url' => 'https://www.youtube.com/watch?v=-0kKuxCncos'
            ],
            [
                'thumbnail' => 'images/tutorials/tutorial_3.png',
                'title' => 'Manobras de Resgate e Auto-Resgate',
                'url' => 'https://www.youtube.com/watch?v=oULWBGhMrso'
            ],
            [
                'thumbnail' => 'images/tutorials/tutorial_4.png',
                'title' => 'Preparação Física para Canoagem',
                'url' => 'https://www.youtube.com/watch?v=2SxjpSTgz-I'
            ]
        ];
    }
}
