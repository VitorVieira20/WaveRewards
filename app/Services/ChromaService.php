<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class ChromaService
{
    protected $baseUrl;
    protected $collectionName;
    protected $apiKey;

    public function __construct()
    {
        $host = env('CHROMA_DB_HOST', '127.0.0.1');
        $port = env('CHROMA_DB_PORT', '8001');
        
        $this->baseUrl = "http://{$host}:{$port}/api/v1";
        $this->apiKey = env('CHROMA_DB_API_KEY');
        $this->collectionName = 'meu_chatbot_kb';
        
        $this->ensureCollectionExists();
    }

    protected function getClient(): PendingRequest
    {
        return Http::withHeaders([
            'X-Chroma-Token' => $this->apiKey,
            'Content-Type' => 'application/json',
        ])->baseUrl($this->baseUrl);
    }

    protected function ensureCollectionExists()
    {
        $response = $this->getClient()->get("/collections/{$this->collectionName}");

        if ($response->failed()) {
            $this->getClient()->post("/collections", [
                'name' => $this->collectionName,
                'metadata' => ['hnsw:space' => 'cosine']
            ]);
        }
    }

    public function addDocument(string $id, array $vector, string $text)
    {
        $collectionId = $this->getCollectionId();

        if (!$collectionId) return;

        $this->getClient()->post("/collections/{$collectionId}/add", [
            'embeddings' => [$vector],
            'metadatas'  => [['source' => 'sql_db']],
            'documents'  => [$text],
            'ids'        => [(string) $id]
        ]);
    }

    public function search(array $queryVector, int $limit = 3)
    {
        $collectionId = $this->getCollectionId();

        if (!$collectionId) return [];

        $response = $this->getClient()->post("/collections/{$collectionId}/query", [
            'query_embeddings' => [$queryVector],
            'n_results' => $limit
        ]);

        return $response->json('documents.0') ?? [];
    }

    protected function getCollectionId()
    {
        $response = $this->getClient()->get("/collections/{$this->collectionName}");
        
        if ($response->successful()) {
            return $response->json('id');
        }
        
        return null;
    }
}