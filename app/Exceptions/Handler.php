<?php

namespace App\Exceptions;

use Inertia\Inertia;
use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof NotFoundHttpException) {
            if ($request->header('X-Inertia')) {
                return Inertia::render('Errors/404')
                    ->toResponse($request)
                    ->setStatusCode(404);
            }
        }

        return parent::render($request, $exception);
    }
}