<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="Wave Rewards Development Team">

    <link rel="preload" as="image" href="{{ asset('images/kayak-over-water.png') }}">
    <link rel="preload" as="image" href="{{ asset('images/about1.png') }}">
    <link rel="preload" as="image" href="{{ asset('images/about2.png') }}">
    <link rel="preload" as="image" href="{{ asset('images/oars.png') }}">
    <link rel="preload" as="image" href="{{ asset('images/podium.png') }}">
    <link rel="preload" as="image" href="{{ asset('images/team/leonor2.png') }}">
    <link rel="preload" as="image" href="{{ asset('images/team/david2.png') }}">
    <link rel="preload" as="image" href="{{ asset('images/team/roberto2.png') }}">
    <link rel="preload" as="image" href="{{ asset('images/team/vitor2.png') }}">

    {{--
    <meta property="og:title" content="Wave" />
    <meta property="og:url" content="https://clubedemo.vitorvieiradev.com">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Clube Demo" />
    <meta property="og:image" content="{{ asset('OG_Image.png') }}">
    <meta property="og:description"
        content="Aproxima-te do Clube Demo! Consulta plantéis, treinadores, equipas, resultados, eventos e publicações. Explora também a nossa loja oficial e acompanha todas as novidades do clube.">

    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="clubedemo.vitorvieiradev.com">
    <meta property="twitter:url" content="https://clubedemo.vitorvieiradev.com">
    <meta name="twitter:title" content="Clube Demo">
    <meta name="twitter:image" content="{{ asset('OG_Image.png') }}">
    <meta name="twitter:description"
        content="Aproxima-te do Grupo Basket Atlântico! Consulta plantéis, treinadores, equipas, resultados, eventos e publicações. Explora também a nossa loja oficial e acompanha todas as novidades do clube.">
    --}}

    <link rel="icon" type="image/png" href="{{ asset('images/logo.png') }}" sizes="96x96" />
    {{--
    <link rel="icon" type="image/png" href="{{ asset('favicon-96x96.png') }}" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}" />
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}" />
    <meta name="apple-mobile-web-app-title" content="GBA" />
    <link rel="manifest" href="{{ asset('site.webmanifest') }}" /> --}}
    <meta name="theme-color" content="#ffffff">
    <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap">

    <link rel="canonical" href="{{ url()->current() }}" />
    <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap">
    <link rel="canonical" href="{{ url()->current() }}" />
    <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap">

    <title>Wave Rewards</title>

    @viteReactRefresh
    @routes
    @if (app()->environment('local') || app()->environment('production'))
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx", "resources/css/app.css"])
    @endif
    @inertiaHead

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <style>
        * {
            font-family: "Poppins", sans-serif;
        }
    </style>
</head>

<body>
    @inertia
</body>

</html>