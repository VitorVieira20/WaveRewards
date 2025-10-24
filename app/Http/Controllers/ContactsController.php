<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mail\ContactRequest;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactsController extends Controller
{
    public function index()
    {
        return Inertia::render('Contacts');
    }


    public function send(ContactRequest $request)
    {
        $data = $request->validated();

        // Agora quando o user faz o envio, ele tem que ficar à espera que o email seja enviado
        // Fazer com que ele mande o email para a queue, assim o user não tem que ficar à espera
        // Se for enviado para a queue, quando o email for enviado, enviar uma confirmação para o email do user
        Mail::to(config('mail.from.address'))->send(new ContactMail($data));

        return back()->with('success', 'A tua mensagem foi enviada com sucesso!');
    }
}
