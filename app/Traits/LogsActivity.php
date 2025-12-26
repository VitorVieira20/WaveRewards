<?php

namespace App\Traits;

use App\Enums\LogType;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

trait LogsActivity
{
    public function logActivity(string $description, LogType $type = LogType::GENERAL, array $customPayload = [])
    {
        $request = request();
        $user = Auth::user();

        $cleanUrl = $this->sanitizeUrl($request->fullUrl());

        $logData = [
            'user_id' => $user ? $user->id : null,
            'method' => $request->method(),
            'url' => $cleanUrl,
            'type' => $type->value,
            'description' => $description,
            'payload' => array_merge($request->except(['password', 'password_confirmation', 'code', 'state']), $customPayload),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ];

        ActivityLog::create($logData);

        Log::channel($type->value)->info($description, $logData);
    }


    private function sanitizeUrl(string $url): string
    {
        $urlComponents = parse_url($url);
        if (!isset($urlComponents['query']))
            return $url;

        parse_str($urlComponents['query'], $params);

        unset($params['code'], $params['state'], $params['authuser'], $params['prompt']);

        $newQuery = http_build_query($params);

        $cleanUrl = $urlComponents['scheme'] . '://' . $urlComponents['host'];
        if (isset($urlComponents['port']))
            $cleanUrl .= ':' . $urlComponents['port'];
        $cleanUrl .= $urlComponents['path'];

        return $newQuery ? $cleanUrl . '?' . $newQuery : $cleanUrl;
    }
}