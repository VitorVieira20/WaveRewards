<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class VectorService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
    }


    public function getEmbedding(string $text): array
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])
            ->post(
                "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={$this->apiKey}",
                [
                    'model' => 'models/text-embedding-004',
                    'content' => [
                        'parts' => [['text' => $text]]
                    ]
                ]
            );

        if (!$response->successful()) {
            Log::error('Gemini embedding API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            throw new \RuntimeException('Erro ao obter embedding');
        }

        $embedding = $response->json('embedding.values');

        if (!is_array($embedding)) {
            Log::error('Embedding inválido', [
                'response' => $response->json(),
            ]);

            throw new \RuntimeException('Embedding inválido');
        }

        return $embedding;
    }

}