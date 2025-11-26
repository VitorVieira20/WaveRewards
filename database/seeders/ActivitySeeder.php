<?php

namespace Database\Seeders;

use App\Enums\ActivityCategory;
use App\Enums\ActivityLevel;
use App\Models\Activity;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activities = $this->getActivitiesData();

        foreach ($activities as $data) {
            $activitie = Activity::updateOrCreate(
                ['title' => $data['title']],
                $data
            );

            if ($activitie->wasRecentlyCreated) {
                $this->command->info("Activity created: {$data['title']}");
            } else {
                $this->command->comment("Activity updated: {$data['title']}");
            }
        }
    }


    private function getActivitiesData(): array
    {
        return [
            [
                'title' => 'Remadas frontais',
                'images' => [
                    'images/activities/iniciantes_1.png'
                ],
                'description' => '"Remadas frontais" é uma técnica fundamental de canoagem utilizada para propulsão eficiente em linha reta. O remador senta-se voltado para a frente do caiaque, mergulha o remo na água junto à proa e puxa-o para trás ao longo da lateral da embarcação. Esta técnica é essencial para manter o controlo, velocidade e estabilidade do caiaque, sendo indicada para todos os níveis, especialmente iniciantes.',
                'duration' => 15,
                'material' => 'Canoa, colete salva-vidas, remo simples',
                'benefits' => 'Melhorar o equilíbrio e eficiência na água',
                'location' => 'Clube Naval do Funchal',
                'datetime' => Carbon::create(2025, 5, 27, 14, 0, 0),
                'category' => ActivityCategory::BEGINNER->value,
                'level' => ActivityLevel::BASIC->value,
            ],
            [
                'title' => 'Remada em "J"',
                'images' => [
                    'images/activities/iniciantes_2.png'
                ],
                'description' => 'A "Remada em J" é uma técnica de correção de direção que permite ao canoísta manter a canoa em linha reta sem precisar de trocar o remo de lado. Ao final da remada frontal, o pulso roda o remo para fora, desenhando um "J" na água.',
                'duration' => 20,
                'material' => 'Canoa aberta, remo de uma pá',
                'benefits' => 'Controlo de direção e menor fadiga',
                'location' => 'Lagoa das Sete Cidades',
                'datetime' => Carbon::create(2025, 5, 28, 10, 0, 0),
                'category' => ActivityCategory::BEGINNER->value,
                'level' => ActivityLevel::ADVANCED->value
            ],
            [
                'title' => 'Troca de posição',
                'images' => [
                    'images/activities/iniciantes_3.png'
                ],
                'description' => 'Exercício de estabilidade que envolve a troca segura de lugares entre dois ocupantes de uma canoa. Fundamental para situações de emergência ou para variar quem está a comandar a embarcação.',
                'duration' => 30,
                'material' => 'Canoa dupla, coletes',
                'benefits' => 'Confiança e equilíbrio dinâmico',
                'location' => 'Barragem da Aguieira',
                'datetime' => Carbon::create(2025, 5, 29, 15, 30, 0),
                'category' => ActivityCategory::BEGINNER->value,
                'level' => ActivityLevel::BASIC->value
            ],
            [
                'title' => 'Equilíbrio estático',
                'images' => [
                    'images/activities/iniciantes_4.png'
                ],
                'description' => 'Técnica de ficar em pé na canoa ("Poling" ou equilíbrio simples) para melhorar a noção de centro de gravidade. Requer águas calmas e muita concentração.',
                'duration' => 10,
                'material' => 'Canoa larga e estável',
                'benefits' => 'Domínio corporal e estabilidade',
                'location' => 'Rio Mondego',
                'datetime' => Carbon::create(2025, 5, 30, 9, 0, 0),
                'category' => ActivityCategory::BEGINNER->value,
                'level' => ActivityLevel::BASIC->value
            ],

            [
                'title' => 'Coordenação de remadas',
                'images' => [
                    'images/activities/intermedio_1.png'
                ],
                'description' => 'Trabalho de equipa em canoas duplas ou K2/K4, onde o objetivo é sincronizar perfeitamente a entrada e saída dos remos na água para maximizar a velocidade.',
                'duration' => 45,
                'material' => 'Canoa de equipa (K2 ou C2)',
                'benefits' => 'Trabalho de equipa e ritmo',
                'location' => 'Centro de Alto Rendimento',
                'datetime' => Carbon::create(2025, 6, 1, 16, 0, 0),
                'category' => ActivityCategory::INTERMEDIATE->value,
                'level' => ActivityLevel::BASIC->value
            ],
            [
                'title' => 'Mudança de direção',
                'images' => [
                    'images/activities/intermedio_2.png'
                ],
                'description' => 'Manobras avançadas como a "varredura" (sweep stroke) e o "leme de proa" para virar o caiaque rapidamente em espaços apertados ou contornar boias.',
                'duration' => 30,
                'material' => 'Caiaque de slalom ou turismo',
                'benefits' => 'Agilidade e controlo técnico',
                'location' => 'Baía de Cascais',
                'datetime' => Carbon::create(2025, 6, 1, 11, 0, 0),
                'category' => ActivityCategory::INTERMEDIATE->value,
                'level' => ActivityLevel::ADVANCED->value
            ],
            [
                'title' => 'Remadas de retrocesso',
                'images' => [
                    'images/activities/intermedio_3.png'
                ],
                'description' => 'Saber remar para trás com eficiência é crucial para travar a embarcação, sair de obstáculos ou manobrar em docas.',
                'duration' => 20,
                'material' => 'Qualquer tipo de canoa',
                'benefits' => 'Segurança e manobrabilidade',
                'location' => 'Rio Douro',
                'datetime' => Carbon::create(2025, 6, 3, 14, 30, 0),
                'category' => ActivityCategory::INTERMEDIATE->value,
                'level' => ActivityLevel::INTERMEDIATE->value
            ],
            [
                'title' => 'Passagem em linha',
                'images' => [
                    'images/activities/intermedio_4.png'
                ],
                'description' => 'Exercício de grupo onde várias canoas navegam alinhadas lateralmente ou em fila indiana, mantendo distâncias constantes e velocidade uniforme.',
                'duration' => 40,
                'material' => 'Frota de caiaques',
                'benefits' => 'Noção espacial e disciplina',
                'location' => 'Ria de Aveiro',
                'datetime' => Carbon::create(2025, 6, 4, 10, 0, 0),
                'category' => ActivityCategory::INTERMEDIATE->value,
                'level' => ActivityLevel::ADVANCED->value
            ],
            [
                'title' => 'Corrida em equipa',
                'images' => [
                    'images/activities/coord_1.png'
                ],
                'description' => 'Disputa de velocidade entre tripulações de barcos de equipa (K2, K4, C2). O foco é manter a potência máxima sem perder a sincronia entre os remadores.',
                'duration' => 60,
                'material' => 'Barcos de competição',
                'benefits' => 'Potência aeróbia e espírito de equipa',
                'location' => 'Pista de Montemor-o-Velho',
                'datetime' => Carbon::create(2025, 6, 5, 9, 0, 0),
                'category' => ActivityCategory::COORDINATION->value,
                'level' => ActivityLevel::BASIC->value
            ],
            [
                'title' => 'Canoagem com obstáculos',
                'images' => [
                   'images/activities/coord_2.png'
                ],
                'description' => 'Percurso divertido e técnico onde os canoístas têm de passar por balizas, passar por baixo de faixas ou contornar objetos flutuantes.',
                'duration' => 45,
                'material' => 'Caiaques ágeis, boias',
                'benefits' => 'Reflexos e destreza',
                'location' => 'Parque das Nações',
                'datetime' => Carbon::create(2025, 6, 6, 15, 0, 0),
                'category' => ActivityCategory::COORDINATION->value,
                'level' => ActivityLevel::INTERMEDIATE->value
            ],
            [
                'title' => 'Corrida às cegas',
                'images' => [
                    'images/activities/coord_3.png'
                ],
                'description' => 'Dinâmica de confiança onde o remador da frente vai vendado e segue apenas as instruções verbais do parceiro de trás para navegar.',
                'duration' => 25,
                'material' => 'Canoa dupla, vendas',
                'benefits' => 'Comunicação e confiança',
                'location' => 'Lagoa de Óbidos',
                'datetime' => Carbon::create(2025, 6, 7, 11, 30, 0),
                'category' => ActivityCategory::COORDINATION->value,
                'level' => ActivityLevel::ADVANCED->value
            ],
            [
                'title' => 'Corrida de precisão',
                'images' => [
                    'images/activities/coord_4.png'
                ],
                'description' => 'Prova onde o objetivo não é apenas chegar primeiro, mas parar exatamente numa linha de meta ou tocar num alvo específico com a proa.',
                'duration' => 30,
                'material' => 'Caiaques individuais',
                'benefits' => 'Controlo fino da embarcação',
                'location' => 'Rio Lima',
                'datetime' => Carbon::create(2025, 6, 8, 16, 0, 0),
                'category' => ActivityCategory::COORDINATION->value,
                'level' => ActivityLevel::ADVANCED->value
            ],
            [
                'title' => 'Percurso cronometrado',
                'images' => [
                    'images/activities/comp_1.png'
                ],
                'description' => 'Simulação de prova de contra-relógio num circuito definido. Os atletas partem individualmente e tentam bater o seu melhor tempo pessoal.',
                'duration' => 50,
                'material' => 'Cronómetro, boias',
                'benefits' => 'Gestão de esforço e auto-superação',
                'location' => 'Rio Tejo',
                'datetime' => Carbon::create(2025, 6, 9, 10, 0, 0),
                'category' => ActivityCategory::COMPETITION->value,
                'level' => ActivityLevel::BASIC->value
            ],
            [
                'title' => 'Corrida de resistência',
                'images' => [
                    'images/activities/comp_2.png'
                ],
                'description' => 'Prova de longa distância (Maratona), testando a capacidade física e mental dos remadores para manter um ritmo constante durante vários quilómetros.',
                'duration' => 120,
                'material' => 'Caiaque de maratona, hidratação',
                'benefits' => 'Resistência cardiovascular',
                'location' => 'Rio Guadiana',
                'datetime' => Carbon::create(2025, 6, 10, 8, 0, 0),
                'category' => ActivityCategory::COMPETITION->value,
                'level' => ActivityLevel::BASIC->value
            ],
            [
                'title' => 'Sprint em linha',
                'images' => [
                    'images/activities/comp_3.png'
                ],
                'description' => 'Explosão de velocidade em distâncias curtas (200m ou 500m). Foca-se na potência máxima e técnica de remada em alta frequência.',
                'duration' => 15,
                'material' => 'Caiaque de pista (K1)',
                'benefits' => 'Força explosiva e velocidade',
                'location' => 'Montemor-o-Velho',
                'datetime' => Carbon::create(2025, 6, 11, 17, 0, 0),
                'category' => ActivityCategory::COMPETITION->value,
                'level' => ActivityLevel::INTERMEDIATE->value
            ],
            [
                'title' => 'Saída a sinal sonoro',
                'images' => [
                    'images/activities/comp_4.png'
                ],
                'description' => 'Treino específico de arranque (partida) de regatas. Os atletas alinham-se nos "blocos" e reagem o mais rápido possível ao sinal de partida.',
                'duration' => 20,
                'material' => 'Sistema de partida (simulado)',
                'benefits' => 'Tempo de reação e aceleração inicial',
                'location' => 'Centro de Estágio do Jamor',
                'datetime' => Carbon::create(2025, 6, 12, 9, 30, 0),
                'category' => ActivityCategory::COMPETITION->value,
                'level' => ActivityLevel::INTERMEDIATE->value
            ],
        ];
    }
}
