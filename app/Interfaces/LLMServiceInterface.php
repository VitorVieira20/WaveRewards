<?php

namespace App\Interfaces;

interface LLMServiceInterface
{
    public function generateResponse(string $userQuestion, string $dynamicContext): string;
}