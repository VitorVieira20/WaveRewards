<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyDiscordSignature
{
    public function handle(Request $request, Closure $next)
    {
        $signature = $request->header('X-Signature-Ed25519');
        $timestamp = $request->header('X-Signature-Timestamp');
        $body = $request->getContent();

        $publicKey = config('services.discord.bot.public');

        $verify = sodium_crypto_sign_verify_detached(
            hex2bin($signature),
            $timestamp . $body,
            hex2bin($publicKey)
        );

        if (!$verify) {
            return response('Invalid signature', 401);
        }

        return $next($request);
    }
}