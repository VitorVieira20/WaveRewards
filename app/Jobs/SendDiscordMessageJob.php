<?php

namespace App\Jobs;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendDiscordMessageJob implements ShouldQueue
{
    use Dispatchable, Queueable;

    protected string $message;

    public function __construct(string $message)
    {
        $this->message = $message;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $client = new Client();

        $webhook_url = env('DISCORD_WEBHOOK');

        if (!$webhook_url) throw new Exception('Discord webhook request failed');

        try {
            $response = $client->post($webhook_url, [
                'form_params' => ['content' => $this->message],
                'verify' => false,
            ]);

            if ($response->getStatusCode() >= 400) {
                throw new Exception('Discord webhook request failed');
            }

            Log::info('Mensagem enviada para o Discord com sucesso!', [
                'status' => 'SENT',
                'sent_at' => now(),
            ]);
        } catch (Exception $e) {
            Log::info('Occorreu um erro ao enviar a mensagem para o Discord.', [
                'status' => 'FAILED',
                'error_message' => $e->getMessage(),
            ]);

            throw $e;
        }
    }
}