<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\DiscordInteractionController;
use Illuminate\Support\Facades\Route;

Route::post('/chat', ChatbotController::class)->name('chatbot.send');

Route::post('/discord/interactions', [DiscordInteractionController::class, 'handle'])
    ->middleware('discord.verify') // Usa o alias que criámos acima
    ->name('discord.interactions');