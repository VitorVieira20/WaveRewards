<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class VectorService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
    }


    public function getEmbedding(string $text): array
    {
        $response = Http::withHeaders(['Content-Type' => 'application/json'])
            ->post("https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={$this->apiKey}", [
                'model' => 'models/text-embedding-004',
                'content' => [
                    'parts' => [['text' => $text]]
                ]
            ]);

        return $response->json('embedding.values');
    }
}