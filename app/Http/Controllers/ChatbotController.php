<?php

namespace App\Http\Controllers;

use App\Services\ChromaService;
use App\Services\VectorService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    public function __invoke(Request $request, VectorService $vectorService, ChromaService $chromaService)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $userQuestion = $request->input('message');

        try {
            $vector = $vectorService->getEmbedding($userQuestion);

            $results = $chromaService->search($vector, 4);
            
            $contextString = "";
            if (!empty($results)) {
                $contextString = implode("\n---\n", $results);
            }

            $fullPrompt = <<<EOT
            Tu és o assistente virtual do WaveRewards, uma plataforma na Madeira que une canoagem e sustentabilidade.

            INSTRUÇÕES DO SISTEMA:
            1. Usa APENAS a informação fornecida na secção "CONTEXTO" abaixo para responder à pergunta do utilizador.
            2. Se a resposta não estiver no contexto, diz educadamente que não tens essa informação registada no momento, mas sugere que vejam a app.
            3. O teu tom deve ser motivador, simpático e entusiasta (és um fã do mar!).
            4. Responde sempre em Português de Portugal.
            5. Se a pergunta for sobre horários, indica a data e hora exata se disponível.

            CONTEXTO (Dados da Base de Dados):
            {$contextString}

            PERGUNTA DO UTILIZADOR:
            {$userQuestion}
            EOT;

            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . env('GEMINI_API_KEY'), [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $fullPrompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.2,
                    'maxOutputTokens' => 500,
                ]
            ]);

            if ($response->failed()) {
                Log::error('Gemini API Error: ' . $response->body());
                return response()->json(['response' => 'Desculpa, o mar está agitado e não consegui processar o teu pedido.'], 502);
            }

            $answer = $response->json('candidates.0.content.parts.0.text');

            if (!$answer) {
                return response()->json(['response' => 'Hmm, não consegui formular uma resposta. Tenta perguntar de outra forma!']);
            }

            return response()->json(['response' => $answer]);

        } catch (Exception $e) {
            Log::error("Internal Chatbot Error: " . $e->getMessage());
            return response()->json(['response' => "Ocorreu um erro interno. Por favor tenta mais tarde."], 500);
        }
    }
}
