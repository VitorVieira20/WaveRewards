<?php

namespace App\Services;

class WorkshopService
{
    private array $workshopsMock;

    public function __construct()
    {
        $this->workshopsMock = [
            [
                'id' => 1,
                'image' => asset('storage/workshops/workshop_1.png'),
                'title' => 'Técnicas de Remada para Iniciantes',
                'location' => 'Clube Naval do Funchal',
                'datetime' => '27/05 - 14:00h',
                'registered_count' => 13,
                'description' => "Neste workshop irás aprender as bases da canoagem focando nas técnicas essenciais de remada, postura correta e controlo do caiaque. As sessões incluem demonstrações práticas com instrutor, possibilidade de experimentar diferentes tipos de remos e orientação individualizada no âmbito da segurança e eficiência da remada.\n\nO objetivo é proporcionar confiança e autonomia para quem está a começar, explorando ambientes aquáticos de forma saudável e segura. Não são necessários conhecimentos prévios, ideal para todas as idades. No final do workshop, consegues identificar e corrigir os principais erros de remada, melhorando a tua performance e aproveitando ao máximo a experiência na água.\n\nInclui material didático e certificado de participação. Junta-te ao grupo e descobre o prazer de remar com técnica!"
            ],
            [
                'id' => 2,
                'image' => asset('storage/workshops/workshop_2.png'),
                'title' => 'Segurança Aquática e Primeiros Socorros',
                'location' => 'Complexo de Piscinas da Penteada',
                'datetime' => '03/06 - 10:00h',
                'registered_count' => 10,
                'description' => "Este workshop é essencial para qualquer praticante de desportos aquáticos. Foca-se em técnicas de prevenção, reconhecimento de perigos no mar e resposta a emergências. Aprenderás os procedimentos corretos de suporte básico de vida (SBV) e como atuar em situações de afogamento ou hipotermia, adaptado ao contexto de canoagem.\n\nO objetivo é capacitar os participantes para prestarem os primeiros socorros de forma eficaz e segura, a si mesmos e a outros, até à chegada de ajuda diferenciada. Serão abordados os conteúdos do 'kit' de primeiros socorros ideal para levar no caiaque.\n\nInclui simulações práticas em ambiente controlado (piscina) e manual de primeiros socorros. Certificação oficial de SBV (Suporte Básico de Vida) incluída."
            ],
            [
                'id' => 3,
                'image' => asset('storage/workshops/workshop_3.png'),
                'title' => 'Navegação e Orientação Marítima',
                'location' => 'Marina da Calheta',
                'datetime' => '11/06 - 09:00h',
                'registered_count' => 8,
                'description' => "Aprende a navegar com confiança. Este workshop aborda os fundamentos da navegação costeira, leitura de cartas náuticas, identificação de pontos de referência e utilização de bússola. Iremos também explorar os básicos de GPS e aplicações móveis de navegação como apoio.\n\nO objetivo é desenvolver a tua capacidade de planear uma rota segura, compreender as marés, correntes e ventos, e saber localizar-se no mar. Ideal para quem quer começar a fazer expedições de canoagem de forma autónoma e explorar novos locais.\n\nSessão teórica seguida de aplicação prática no mar (trajeto curto). Inclui cartas náuticas da zona e manual de navegação. Requer conhecimentos básicos de remada."
            ],
            [
                'id' => 4,
                'image' => asset('storage/workshops/workshop_4.png'),
                'title' => 'Canoagem em Águas Agitadas',
                'location' => 'Foz da Ribeira Brava',
                'datetime' => '18/06 - 13:00h',
                'registered_count' => 6,
                'description' => "Eleva a tua canoagem ao próximo nível. Este workshop é focado em técnicas avançadas para lidar com ondulação, vento forte e 'surf de caiaque' (rock hopping). Aprenderás a 'ler' o mar, técnicas de apoio (bracing), esquimotagem (eskimo roll) e estratégias de resgate em águas abertas.\n\nO objetivo é aumentar a tua confiança e controlo em condições de mar desafiantes. Este curso é desenhado para canoístas com experiência prévia que procuram aventurar-se em 'sea kayaking' de forma mais séria e segura.\n\nInclui equipamento de segurança completo (capacete, colete de alta flutuabilidade) e caiaques de mar (sea kayaks) específicos. Requer prova de natação e experiência prévia."
            ]
        ];
    }


    public function getWorkshops(): array
    {
        return $this->workshopsMock;
    }


    public function getWorkshopById(int $id)
    {
        $workshop = array_filter($this->workshopsMock, function ($item) use ($id) {
            return $item['id'] === $id;
        });

        // array_filter devolve um array — aqui extraímos o primeiro elemento
        return !empty($workshop) ? array_values($workshop)[0] : null;
    }
}