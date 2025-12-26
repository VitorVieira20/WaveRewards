<?php

namespace App\Http\Controllers;

use App\Enums\LogType;
use App\Http\Requests\Mail\ContactRequest;
use App\Jobs\SendDiscordMessageJob;
use App\Traits\LogsActivity;
use Inertia\Inertia;

class ContactsController extends Controller
{
    use LogsActivity;

    public function index()
    {
        return Inertia::render('Contacts');
    }


    public function send(ContactRequest $request)
    {
        $data = $request->validated();

        $timestamp = now()->format('d/m/Y H:i');

        $data['phone'] ?? $data['phone'] = '-';
        $data['company'] ?? $data['company'] = '-';

        $markdownMessage = <<<MD
            ## 📩 Nova Mensagem de Contacto

            **👤 Nome:** {$data['name']}
            **📧 Email:** {$data['email']}
            **📞 Telefone:** {$data['phone']}
            **🏢 Empresa:** {$data['company']}

            ---

            ### 💬 Mensagem:
            > {$data['message']}

            ---
            🕒 Enviado em: *{$timestamp}*
            MD;

        $payload = [
            'content' => $markdownMessage
        ];

        $this->logActivity("Nova tentativa de contacto pelo formulário", LogType::CONTACTS, [
            'user_id' => $request->user()?->id,
            'content' => $payload['content'],
        ]);

        SendDiscordMessageJob::dispatch($payload);

        return back()->with('success', 'A tua mensagem foi recebida e será processada em breve. Aguarda por um email de confirmação.');
    }
}
