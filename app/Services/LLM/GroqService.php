<?php

namespace App\Services\LLM;

use App\Interfaces\LLMServiceInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GroqService implements LLMServiceInterface
{
    public function generateResponse(string $userQuestion, string $dynamicContext): string
    {
        $staticKnowledge = <<<TEXT
        SOBRE O WAVEREWARDS:
        - O WaveRewards é uma plataforma gamificada na Madeira que une canoagem e sustentabilidade.
        - O objetivo é incentivar a exploração do mar e a proteção do oceano.
        - Funcionalidade 'Plogging Náutico': Os utilizadores recolhem lixo do mar, registam na app e ganham pontos.
        
        FUNCIONALIDADES DA APP:
        - Consultar/Inscrever em Workshops e Atividades.
        - Ver Tutoriais em vídeo.
        - Mapa de Pontos de Encontro.
        - Ranking de Equipas e Utilizadores.
        
        SISTEMA DE PONTOS:
        - Ganhas pontos ao: 1. Participar em atividades; 2. Recolher lixo (Plogging); 3. Ver tutoriais.
        TEXT;

        $systemPrompt = <<<EOT
        Tu és o assistente virtual oficial do WaveRewards.
        
        FONTES DE INFORMAÇÃO:
        FONTE 1: CONHECIMENTO BASE (Obrigatório)
        {$staticKnowledge}

        FONTE 2: CONTEXTO DINÂMICO (Resultados da pesquisa atual)
        {$dynamicContext}

        INSTRUÇÕES:
        1. Prioriza a FONTE 1 para perguntas sobre o projeto/app.
        2. Usa a FONTE 2 para datas e workshops específicos.
        3. O teu tom deve ser motivador e simpático (fã do mar! 🌊).
        4. Responde sempre em Português de Portugal.
        EOT;

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
            'Content-Type' => 'application/json'
        ])->post('https://api.groq.com/openai/v1/chat/completions', [
            'model' => 'llama-3.3-70b-versatile',
            'messages' => [
                ['role' => 'system', 'content' => $systemPrompt],
                ['role' => 'user', 'content' => $userQuestion]
            ],
            'temperature' => 0.2,
            'max_tokens' => 600,
        ]);

        if ($response->failed()) {
            Log::error('Groq API Error: ' . $response->body());
            throw new \Exception('Erro ao comunicar com o Groq.');
        }

        return $response->json('choices.0.message.content') ?? 'Não consegui gerar uma resposta.';
    }
}