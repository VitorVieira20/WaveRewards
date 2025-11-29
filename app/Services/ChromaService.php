<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ChromaService
{
    protected $baseUrl;
    protected $collectionName;

    public function __construct()
    {
        $this->baseUrl = 'http://localhost:8001/api/v1'; 
        $this->collectionName = 'meu_chatbot_kb';
        
        $this->ensureCollectionExists();
    }

    protected function ensureCollectionExists()
    {
        Http::post("{$this->baseUrl}/collections", [
            'name' => $this->collectionName,
            'metadata' => ['hnsw:space' => 'cosine']
        ]);
    }

    public function addDocument(string $id, array $vector, string $text)
    {
        $collectionId = $this->getCollectionId();

        Http::post("{$this->baseUrl}/collections/{$collectionId}/add", [
            'embeddings' => [$vector],
            'metadatas'  => [['source' => 'sql_db']],
            'documents'  => [$text],
            'ids'        => [(string) $id]
        ]);
    }

    public function search(array $queryVector, int $limit = 3)
    {
        $collectionId = $this->getCollectionId();

        $response = Http::post("{$this->baseUrl}/collections/{$collectionId}/query", [
            'query_embeddings' => [$queryVector],
            'n_results' => $limit
        ]);

        return $response->json('documents.0') ?? []; 
    }

    protected function getCollectionId()
    {
        $response = Http::get("{$this->baseUrl}/collections/{$this->collectionName}");
        return $response->json('id');
    }
}