<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Relatório Wave Rewards - {{ $user->name }}</title>
    <style>
        body {
            font-family: sans-serif;
            color: #1A3463;
            margin: 0;
            padding: 20px;
            background-color: #fff;
        }

        .header {
            border-bottom: 2px solid #1D87BC;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .header h1 {
            color: #1C5E8F;
            margin: 0;
            font-size: 24px;
        }

        .user-info {
            margin-bottom: 30px;
        }

        .user-info p {
            margin: 2px 0;
            font-size: 13px;
        }

        .stats-container {
            margin-bottom: 30px;
            width: 100%;
        }

        .stat-card {
            background: #EAF5FA;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
            width: 23%;
            display: inline-block;
            margin-right: 1%;
            border: 1px solid #1D87BC33;

            margin-bottom: 15px;
            vertical-align: top;
            min-height: 50px;
        }

        .stat-card b {
            display: block;
            font-size: 16px;
            color: #1D87BC;
        }

        .stat-card span {
            font-size: 10px;
            color: #1C5E8F;
        }

        h2 {
            font-size: 18px;
            color: #1C5E8F;
            border-left: 4px solid #3699C5;
            padding-left: 10px;
            margin-top: 30px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 11px;
        }

        th {
            background-color: #1D87BC;
            color: white;
            text-align: left;
            padding: 8px;
        }

        td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        tr:nth-child(even) {
            background-color: #F8FDFF;
        }

        .tier-badge {
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 9px;
        }

        .gold {
            background: #FFD700;
            color: #000;
        }

        .silver {
            background: #C0C0C0;
            color: #000;
        }

        .bronze {
            background: #CD7F32;
            color: #fff;
        }

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 9px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 5px;
        }
    </style>
</head>

<body>

    <div class="header">
        <h1>Relatório de Atividade Wave Rewards</h1>
    </div>

    <div class="user-info">
        <p><b>Nome:</b> {{ $user->name }}</p>
        <p><b>Username:</b> @ {{ $user->username }}</p>
        <p><b>Email:</b> {{ $user->email }}</p>
        <p><b>Localização:</b> {{ $user->address ?? 'N/D' }}</p>
    </div>

    <div class="stats-container">
        <div class="stat-card"><b>{{ $stats['total_points'] }}</b><span>Pontos Totais</span></div>
        <div class="stat-card"><b>{{ $stats['total_distance'] }} km</b><span>Distância</span></div>
        <div class="stat-card"><b>{{ number_format($stats['total_trash'] / 1000, 2) }} kg</b><span>Lixo Recolhido</span>
        </div>
        <div class="stat-card"><b>{{ $stats['total_activities'] }}</b><span>Atividades</span></div>
    </div>

    <h2>Histórico de Workshops</h2>
    <table>
        <thead>
            <tr>
                <th>Título do Workshop</th>
                <th>Localização</th>
                <th>Data do Workshop</th>
                <th>Inscrito em</th>
            </tr>
        </thead>
        <tbody>
            @foreach($workshops as $workshop)
                <tr>
                    <td>{{ $workshop->title }}</td>
                    <td>{{ $workshop->location }}</td>
                    <td>{{ \Carbon\Carbon::parse($workshop->schedule)->format('d/m/Y H:i') }}</td>
                    <td>{{ $workshop->pivot->created_at->format('d/m/Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Registo de Atividades</h2>
    <table>
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Atividade</th>
                <th>Data</th>
                <th>Distância</th>
                <th>Lixo (kg)</th>
                <th>Pontos</th>
            </tr>
        </thead>
        <tbody>
            @foreach($activities as $a)
                <tr>
                    <td style="font-size: 8px; color: #666;">
                        {{ $a->activity_id ? 'Predefinida' : 'Livre' }}
                    </td>
                    <td>
                        {{ $a->custom_title ?? $a->base_title ?? 'Atividade sem título' }}
                    </td>
                    <td>
                        {{ \Carbon\Carbon::parse($a->performed_at ?? $a->created_at)->format('d/m/Y') }}
                    </td>
                    <td>{{ number_format($a->distance / 1000, 2) }} km</td>
                    <td>
                        {{ number_format($a->trash_collected / 1000, 2) }} kg
                    </td>
                    <td class="points-cell">+{{ $a->points }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Medalhas Conquistadas</h2>
    <div style="margin-top: 10px;">
        @foreach($badges as $badge)
            <div style="display: inline-block; width: 48%; margin-bottom: 10px; font-size: 11px;">
                <span class="tier-badge {{ $badge->tier }}">{{ $badge->tier }}</span>
                <b>{{ $badge->name }}</b><br>
                <small style="color: #666;">{{ $badge->description }}</small>
            </div>
        @endforeach
    </div>

    <div class="footer">
        Relatório oficial Wave Rewards | Documento gerado automaticamente em {{ $generated_at }}
    </div>

</body>

</html>