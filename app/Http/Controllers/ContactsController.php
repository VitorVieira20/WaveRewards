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

        Mail::to(config('mail.from.address'))->send(new ContactMail($data));

        return back()->with('success', 'A tua mensagem foi recebida e será processada em breve. Aguarda por um email de confirmação.');
    }
}
