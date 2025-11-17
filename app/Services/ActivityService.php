<?php

namespace App\Services;

enum ActivityCategory: string {
    case BEGINNER = 'Iniciantes';
    case INTERMEDIATE = 'Intermédias';
    case COORDINATION = 'Coordenação e Resistência';
    case COMPETITION = 'Competição e Recreação';
}

class ActivityService
{
    private array $activitiesMock;

    public function __construct()
    {
        $this->activitiesMock = [
            [
                'id' => 1,
                'title' => 'Remadas frontais',
                'images' => [
                    asset('storage/activities/iniciantes_1.png')
                ],
                'description' => '"Remadas frontais" é uma técnica fundamental de canoagem utilizada para propulsão eficiente em linha reta. O remador senta-se voltado para a frente do caiaque, mergulha o remo na água junto à proa e puxa-o para trás ao longo da lateral da embarcação. Esta técnica é essencial para manter o controlo, velocidade e estabilidade do caiaque, sendo indicada para todos os níveis, especialmente iniciantes.',
                'duration' => 15,
                'necessary_material' => 'Canoa, colete salva-vidas, remo simples',
                'benefits' => 'Melhorar o equilíbrio e eficiência na água',
                'location' => 'Clube Naval do Funchal',
                'datetime' => '27/05 - 14:00h',
                'registered_count' => 13,
                'category' => ActivityCategory::BEGINNER->value
            ],
            [
                'id' => 2,
                'title' => 'Remada em "J"',
                'images' => [
                    asset('storage/activities/iniciantes_2.png')
                ],
                'description' => 'A "Remada em J" é uma técnica de correção de direção que permite ao canoísta manter a canoa em linha reta sem precisar de trocar o remo de lado. Ao final da remada frontal, o pulso roda o remo para fora, desenhando um "J" na água.',
                'duration' => 20,
                'necessary_material' => 'Canoa aberta, remo de uma pá',
                'benefits' => 'Controlo de direção e menor fadiga',
                'location' => 'Lagoa das Sete Cidades',
                'datetime' => '28/05 - 10:00h',
                'registered_count' => 8,
                'category' => ActivityCategory::BEGINNER->value
            ],
            [
                'id' => 3,
                'title' => 'Troca de posição',
                'images' => [
                    asset('storage/activities/iniciantes_3.png')
                ],
                'description' => 'Exercício de estabilidade que envolve a troca segura de lugares entre dois ocupantes de uma canoa. Fundamental para situações de emergência ou para variar quem está a comandar a embarcação.',
                'duration' => 30,
                'necessary_material' => 'Canoa dupla, coletes',
                'benefits' => 'Confiança e equilíbrio dinâmico',
                'location' => 'Barragem da Aguieira',
                'datetime' => '29/05 - 15:30h',
                'registered_count' => 10,
                'category' => ActivityCategory::BEGINNER->value
            ],
            [
                'id' => 4,
                'title' => 'Equilíbrio estático',
                'images' => [
                    asset('storage/activities/iniciantes_4.png')
                ],
                'description' => 'Técnica de ficar em pé na canoa ("Poling" ou equilíbrio simples) para melhorar a noção de centro de gravidade. Requer águas calmas e muita concentração.',
                'duration' => 10,
                'necessary_material' => 'Canoa larga e estável',
                'benefits' => 'Domínio corporal e estabilidade',
                'location' => 'Rio Mondego',
                'datetime' => '30/05 - 09:00h',
                'registered_count' => 5,
                'category' => ActivityCategory::BEGINNER->value
            ],

            [
                'id' => 5,
                'title' => 'Coordenação de remadas',
                'images' => [
                    asset('storage/activities/intermedio_1.png')
                ],
                'description' => 'Trabalho de equipa em canoas duplas ou K2/K4, onde o objetivo é sincronizar perfeitamente a entrada e saída dos remos na água para maximizar a velocidade.',
                'duration' => 45,
                'necessary_material' => 'Canoa de equipa (K2 ou C2)',
                'benefits' => 'Trabalho de equipa e ritmo',
                'location' => 'Centro de Alto Rendimento',
                'datetime' => '01/06 - 16:00h',
                'registered_count' => 12,
                'category' => ActivityCategory::INTERMEDIATE->value
            ],
            [
                'id' => 6,
                'title' => 'Mudança de direção',
                'images' => [
                    asset('storage/activities/intermedio_2.png')
                ],
                'description' => 'Manobras avançadas como a "varredura" (sweep stroke) e o "leme de proa" para virar o caiaque rapidamente em espaços apertados ou contornar boias.',
                'duration' => 30,
                'necessary_material' => 'Caiaque de slalom ou turismo',
                'benefits' => 'Agilidade e controlo técnico',
                'location' => 'Baía de Cascais',
                'datetime' => '02/06 - 11:00h',
                'registered_count' => 7,
                'category' => ActivityCategory::INTERMEDIATE->value
            ],
            [
                'id' => 7,
                'title' => 'Remadas de retrocesso',
                'images' => [
                    asset('storage/activities/intermedio_3.png')
                ],
                'description' => 'Saber remar para trás com eficiência é crucial para travar a embarcação, sair de obstáculos ou manobrar em docas.',
                'duration' => 20,
                'necessary_material' => 'Qualquer tipo de canoa',
                'benefits' => 'Segurança e manobrabilidade',
                'location' => 'Rio Douro',
                'datetime' => '03/06 - 14:30h',
                'registered_count' => 9,
                'category' => ActivityCategory::INTERMEDIATE->value
            ],
            [
                'id' => 8,
                'title' => 'Passagem em linha',
                'images' => [
                    asset('storage/activities/intermedio_4.png')
                ],
                'description' => 'Exercício de grupo onde várias canoas navegam alinhadas lateralmente ou em fila indiana, mantendo distâncias constantes e velocidade uniforme.',
                'duration' => 40,
                'necessary_material' => 'Frota de caiaques',
                'benefits' => 'Noção espacial e disciplina',
                'location' => 'Ria de Aveiro',
                'datetime' => '04/06 - 10:00h',
                'registered_count' => 15,
                'category' => ActivityCategory::INTERMEDIATE->value
            ],
            [
                'id' => 9,
                'title' => 'Corrida em equipa',
                'images' => [
                    asset('storage/activities/coord_1.png')
                ],
                'description' => 'Disputa de velocidade entre tripulações de barcos de equipa (K2, K4, C2). O foco é manter a potência máxima sem perder a sincronia entre os remadores.',
                'duration' => 60,
                'necessary_material' => 'Barcos de competição',
                'benefits' => 'Potência aeróbia e espírito de equipa',
                'location' => 'Pista de Montemor-o-Velho',
                'datetime' => '05/06 - 09:00h',
                'registered_count' => 20,
                'category' => ActivityCategory::COORDINATION->value
            ],
            [
                'id' => 10,
                'title' => 'Canoagem com obstáculos',
                'images' => [
                    asset('storage/activities/coord_2.png')
                ],
                'description' => 'Percurso divertido e técnico onde os canoístas têm de passar por balizas, passar por baixo de faixas ou contornar objetos flutuantes.',
                'duration' => 45,
                'necessary_material' => 'Caiaques ágeis, boias',
                'benefits' => 'Reflexos e destreza',
                'location' => 'Parque das Nações',
                'datetime' => '06/06 - 15:00h',
                'registered_count' => 12,
                'category' => ActivityCategory::COORDINATION->value
            ],
            [
                'id' => 11,
                'title' => 'Corrida às cegas',
                'images' => [
                    asset('storage/activities/coord_3.png')
                ],
                'description' => 'Dinâmica de confiança onde o remador da frente vai vendado e segue apenas as instruções verbais do parceiro de trás para navegar.',
                'duration' => 25,
                'necessary_material' => 'Canoa dupla, vendas',
                'benefits' => 'Comunicação e confiança',
                'location' => 'Lagoa de Óbidos',
                'datetime' => '07/06 - 11:30h',
                'registered_count' => 8,
                'category' => ActivityCategory::COORDINATION->value
            ],
            [
                'id' => 12,
                'title' => 'Corrida de precisão',
                'images' => [
                    asset('storage/activities/coord_4.png')
                ],
                'description' => 'Prova onde o objetivo não é apenas chegar primeiro, mas parar exatamente numa linha de meta ou tocar num alvo específico com a proa.',
                'duration' => 30,
                'necessary_material' => 'Caiaques individuais',
                'benefits' => 'Controlo fino da embarcação',
                'location' => 'Rio Lima',
                'datetime' => '08/06 - 16:00h',
                'registered_count' => 10,
                'category' => ActivityCategory::COORDINATION->value
            ],
            [
                'id' => 13,
                'title' => 'Percurso cronometrado',
                'images' => [
                    asset('storage/activities/comp_1.png')
                ],
                'description' => 'Simulação de prova de contra-relógio num circuito definido. Os atletas partem individualmente e tentam bater o seu melhor tempo pessoal.',
                'duration' => 50,
                'necessary_material' => 'Cronómetro, boias',
                'benefits' => 'Gestão de esforço e auto-superação',
                'location' => 'Rio Tejo',
                'datetime' => '09/06 - 10:00h',
                'registered_count' => 14,
                'category' => ActivityCategory::COMPETITION->value
            ],
            [
                'id' => 14,
                'title' => 'Corrida de resistência',
                'images' => [
                    asset('storage/activities/comp_2.png')
                ],
                'description' => 'Prova de longa distância (Maratona), testando a capacidade física e mental dos remadores para manter um ritmo constante durante vários quilómetros.',
                'duration' => 120,
                'necessary_material' => 'Caiaque de maratona, hidratação',
                'benefits' => 'Resistência cardiovascular',
                'location' => 'Rio Guadiana',
                'datetime' => '10/06 - 08:00h',
                'registered_count' => 25,
                'category' => ActivityCategory::COMPETITION->value
            ],
            [
                'id' => 15,
                'title' => 'Sprint em linha',
                'images' => [
                    asset('storage/activities/comp_3.png')
                ],
                'description' => 'Explosão de velocidade em distâncias curtas (200m ou 500m). Foca-se na potência máxima e técnica de remada em alta frequência.',
                'duration' => 15,
                'necessary_material' => 'Caiaque de pista (K1)',
                'benefits' => 'Força explosiva e velocidade',
                'location' => 'Montemor-o-Velho',
                'datetime' => '11/06 - 17:00h',
                'registered_count' => 18,
                'category' => ActivityCategory::COMPETITION->value
            ],
            [
                'id' => 16,
                'title' => 'Saída a sinal sonoro',
                'images' => [
                    asset('storage/activities/comp_4.png')
                ],
                'description' => 'Treino específico de arranque (partida) de regatas. Os atletas alinham-se nos "blocos" e reagem o mais rápido possível ao sinal de partida.',
                'duration' => 20,
                'necessary_material' => 'Sistema de partida (simulado)',
                'benefits' => 'Tempo de reação e aceleração inicial',
                'location' => 'Centro de Estágio do Jamor',
                'datetime' => '12/06 - 09:30h',
                'registered_count' => 11,
                'category' => ActivityCategory::COMPETITION->value
            ],
        ];
    }


    public function getActivities()
    {
        return $this->activitiesMock;
    }


    public function getActivitiesByCategory(string $category)
    {
        $activities = array_filter($this->activitiesMock, function ($item) use ($category) {
            return $item['category'] === $category;
        });

        return !empty($activities) ? array_values($activities) : null;
    }


    public function getActivityById(int $id)
    {
        $activities = array_filter($this->activitiesMock, function ($item) use ($id) {
            return $item['id'] === $id;
        });

        return !empty($activities) ? array_values($activities)[0] : null;
    }


    public function getCategories(): array
    {
        return array_column(ActivityCategory::cases(), 'value');
    }
}