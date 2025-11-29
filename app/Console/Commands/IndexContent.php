<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\VectorService;
use App\Services\ChromaService;
use App\Models\Activity;
use App\Models\Workshop;
use App\Models\Information;
use App\Models\Tutorial;

class IndexContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'waverewards:index';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reads database data (Activities, Workshops, Informations, Tutorials) and sends it to ChromaDB';

    /**
     * Execute the console command.
     */
    public function handle(VectorService $vectorService, ChromaService $chromaService)
    {
        $this->info('------ STARTING INDEXING OF WAVEREWARDS ------');

        $this->info('Indexing Workshops...');
        $workshops = Workshop::all();
        
        foreach ($workshops as $w) {
            $dateFormatted = $w->schedule ? $w->schedule->format('d/m/Y às H:i') : 'Data a definir';

            $contentToIndex = "Tipo: Workshop | Título: {$w->title} | Descrição: {$w->description} | Localização: {$w->location} | Data e Hora: {$dateFormatted}";
            
            $vector = $vectorService->getEmbedding($contentToIndex);
            
            $chromaService->addDocument(
                id: "workshop_" . $w->id,
                vector: $vector,
                text: $contentToIndex
            );
            $this->output->write('.');
        }
        $this->newLine();

        $this->info('Indexing Activities...');
        $activities = Activity::all();

        foreach ($activities as $a) {
            $dateFormatted = $a->datetime ? $a->datetime->format('d/m/Y H:i') : 'Data a definir';
            
            $contentToIndex = "Tipo: Atividade Física | Categoria: {$a->category} | Título: {$a->title} | " .
                              "Nível de Dificuldade: {$a->level} | Duração: {$a->duration} | " .
                              "Local: {$a->location} | Material Necessário: {$a->material} | " .
                              "Benefícios: {$a->benefits} | Data: {$dateFormatted} | Descrição: {$a->description}";
            
            $vector = $vectorService->getEmbedding($contentToIndex);
            
            $chromaService->addDocument(
                id: "activity_" . $a->id,
                vector: $vector,
                text: $contentToIndex
            );
            $this->output->write('.');
        }
        $this->newLine();

        $this->info('Indexing Informations...');
        $infos = Information::all();

        foreach ($infos as $i) {
            $contentToIndex = "Tipo: Informação Marinha | Título: {$i->title} | Curiosidade/Sabias que: {$i->curiosity} | Detalhes: {$i->description}";
            
            $vector = $vectorService->getEmbedding($contentToIndex);
            
            $chromaService->addDocument(
                id: "info_" . $i->id,
                vector: $vector,
                text: $contentToIndex
            );
            $this->output->write('.');
        }
        $this->newLine();

        $this->info('Indexing Tutorials...');
        $tutorials = Tutorial::all();

        foreach ($tutorials as $t) {
            $contentToIndex = "Tipo: Vídeo Tutorial | Título: {$t->title} | Link para assistir: {$t->url}";
            
            $vector = $vectorService->getEmbedding($contentToIndex);
            
            $chromaService->addDocument(
                id: "tutorial_" . $t->id,
                vector: $vector,
                text: $contentToIndex
            );
            $this->output->write('.');
        }
        $this->newLine();

        $this->info("\n✅ FINISHED! WaveRewards bot now have access to all data.");
    }
}