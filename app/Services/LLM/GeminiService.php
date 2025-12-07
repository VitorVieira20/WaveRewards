<?php

namespace App\Services\LLM;

use App\Interfaces\LLMServiceInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService implements LLMServiceInterface
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

        $fullPrompt = <<<EOT
        Tu és o assistente virtual do WaveRewards.
        
        CONHECIMENTO BASE:
        {$staticKnowledge}

        CONTEXTO DA BASE DE DADOS:
        {$dynamicContext}

        PERGUNTA DO UTILIZADOR:
        {$userQuestion}
        
        Responde em Português de Portugal, tom motivador 🌊.
        EOT;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . env('GEMINI_API_KEY'), [
            'contents' => [
                ['parts' => [['text' => $fullPrompt]]]
            ],
            'generationConfig' => [
                'temperature' => 0.2,
                'maxOutputTokens' => 500,
            ]
        ]);

        if ($response->failed()) {
            Log::error('Gemini API Error: ' . $response->body());
            throw new \Exception('Erro ao comunicar com o Gemini.');
        }

        return $response->json('candidates.0.content.parts.0.text') ?? 'Não consegui gerar uma resposta.';
    }
}