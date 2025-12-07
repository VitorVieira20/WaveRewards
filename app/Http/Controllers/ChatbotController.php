<?php

namespace App\Http\Controllers;

use App\Interfaces\LLMServiceInterface;
use App\Services\ChromaService;
use App\Services\VectorService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    public function __invoke(
        Request $request, 
        VectorService $vectorService, 
        ChromaService $chromaService,
        LLMServiceInterface $llmService
    )
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $userQuestion = $request->input('message');

        try {
            $vector = $vectorService->getEmbedding($userQuestion);

            $results = $chromaService->search($vector, 4);
            $dynamicContext = !empty($results) ? implode("\n---\n", $results) : "";

            $answer = $llmService->generateResponse($userQuestion, $dynamicContext);

            return response()->json(['response' => $answer]);

        } catch (Exception $e) {
            Log::error("Chatbot Error: " . $e->getMessage());
            return response()->json(['response' => "O mar está agitado (erro interno). Tenta novamente."], 500);
        }
    }
}