<?php

namespace Database\Seeders;

use App\Models\Information;
use Illuminate\Database\Seeder;

class InformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $informations = $this->getInformationsData();

        foreach ($informations as $data) {
            $information = Information::updateOrCreate(
                ['title' => $data['title']],
                $data
            );

            if ($information->wasRecentlyCreated) {
                $this->command->info("Information created: {$data['title']}");
            } else {
                $this->command->comment("Information updated: {$data['title']}");
            }
        }
    }


    private function getInformationsData(): array
    {
        return [
            [
                'image' => 'images/informations/information_1.png',
                'title' => 'Ecossistemas Marinhos de Portugal',
                'curiosity' => 'A Ria Formosa e o Parque Natural do Sudoeste Alentejano e Costa Vicentina são dois dos maiores santuários de biodiversidade marinha em Portugal, protegendo espécies ameaçadas e habitats frágeis.',
                'description' => "Portugal possui uma das maiores zonas económicas exclusivas da Europa, abrangendo inúmeros habitats marinhos.\n\nPrincipais componentes da fauna marinha portuguesa:\n• Golfinhos, particularmente o roaz-corvineiro (Tursiops truncatus), símbolo da saúde ecológica das águas nacionais.\n• Peixes emblemáticos como o robalo, sardinha, atum e cavala, fundamentais para biodiversidade e atividade piscatória.\n• Invertebrados: Estrela-do-mar, caranguejo-verde, polvos e ouriços — essenciais para a reciclagem de nutrientes e equilíbrio do habitat.\n• Macroalgas, pradarias marinhas e recifes rochosos — bases da cadeia alimentar e importantes sumidouros de carbono.\n\nAmeaças e desafios:\n• Poluição por resíduos plásticos e microplásticos\n• Sobrepesca e colapso de populações piscícolas\n• Degradação de habitats (dragagens, construção costeira)\n• Alterações climáticas e acidificação dos oceanos\n\nO que podes fazer?\n• Reduzir consumo de plásticos e adoptar boas práticas ambientais na utilização da zona costeira\n• Apoiar iniciativas de conservação e limpeza de praias\n• Informar-te e sensibilizar outros sobre a importância dos ecossistemas marinhos para o planeta e para a vida humana"
            ],
            [
                'image' => 'images/informations/information_2.png',
                'title' => 'Impacto do Lixo Marítimo',
                'curiosity' => 'Sabias que uma garrafa de plástico pode demorar até 450 anos a decompor-se no oceano? Cerca de 80% do lixo encontrado no mar tem origem em atividades terrestres.',
                'description' => "O lixo marinho é uma das maiores ameaças globais à saúde dos oceanos e Portugal, com a sua vasta costa, não é exceção.\n\nTipos de poluição mais comuns:\n• Plásticos de uso único (garrafas, sacos, palhinhas).\n• Artes de pesca abandonadas ('redes fantasma') que continuam a capturar peixes e aves.\n• Microplásticos: pequenas partículas que entram na cadeia alimentar.\n\nImpacto na Vida Marinha:\nAnimais como tartarugas e aves marinhas confundem plástico com alimento, o que pode ser fatal. Além disso, os detritos destroem habitats sensíveis como recifes e pradarias marinhas.\n\nComo ajudar enquanto canoísta:\n• Pratica o 'Ploggin': recolhe lixo que encontres a flutuar durante a tua remada.\n• Fixa bem o teu equipamento no caiaque para evitar perdas acidentais.\n• Utiliza garrafas reutilizáveis e evita embalagens descartáveis nos teus lanches."
            ],
            [
                'image' => 'images/informations/information_3.png',
                'title' => 'Rotas Ecológicas Certificadas',
                'curiosity' => 'Portugal tem vindo a aumentar o número de praias fluviais e zonas costeiras com Bandeira Azul, um símbolo de qualidade ambiental e segurança para a prática desportiva.',
                'description' => "Navegar em rotas ecológicas permite desfrutar da canoagem minimizando o impacto na natureza. Estas rotas são desenhadas para proteger a fauna e flora locais.\n\nDestinos de Eleição:\n• Rio Paiva: Famoso pelas águas bravas e pela biodiversidade envolvente.\n• Parque Natural da Arrábida: Águas cristalinas ideais para a canoagem de mar e observação de vida subaquática.\n• Lagoas dos Açores: Remar em crateras vulcânicas rodeadas de vegetação endémica.\n\nCódigo de Conduta do Canoísta Ecológico:\n• Não deixar rasto: todo o lixo produzido deve voltar contigo para terra.\n• Silêncio: evita barulho excessivo para não perturbar as aves nidificantes.\n• Distância: mantém uma distância segura de animais marinhos e não tentes tocar-lhes.\n• Respeito: cumpre a sinalização das Áreas Marinhas Protegidas."
            ],
            [
                'image' => 'images/informations/information_4.png',
                'title' => 'História da Canoagem em Portugal',
                'curiosity' => 'A Federação Portuguesa de Canoagem foi fundada em 1979. Desde então, Portugal tornou-se uma potência mundial na modalidade, com atletas como Fernando Pimenta a conquistarem pódios olímpicos.',
                'description' => "A canoagem em Portugal tem raízes profundas, evoluindo de um meio de transporte e pesca nos nossos rios para um desporto de alta competição.\n\nEvolução da Modalidade:\n• Anos 80: Criação dos primeiros clubes e massificação da prática recreativa.\n• Anos 90: Início da aposta na alta competição e profissionalização dos treinos.\n• Atualidade: Portugal é referência mundial em Velocidade e Maratona.\n\nDisciplinas Populares:\n• Canoagem de Pista (Velocidade): Praticada em pistas como a de Montemor-o-Velho.\n• Slalom: Descida de águas bravas contornando obstáculos.\n• Canoagem de Mar (Surfski): Muito popular devido à nossa extensa costa atlântica.\n\nHoje, a canoagem é acessível a todas as idades, promovendo saúde física e uma ligação única com os recursos hídricos do país."
            ]
        ];
    }
}
