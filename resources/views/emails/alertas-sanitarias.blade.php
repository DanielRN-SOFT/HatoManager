<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alertas sanitarias — HatoManager</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: #f0f4ec;
            font-family: 'Hanken Grotesk', Arial, sans-serif;
            color: #1a1c19;
            padding: 32px 16px;
        }

        .wrapper {
            max-width: 580px;
            margin: 0 auto;
        }

        .header {
            background-color: #275300;
            border-radius: 16px 16px 0 0;
            padding: 32px 40px 28px;
            text-align: center;
        }

        .header-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background-color: rgba(157, 215, 112, 0.18);
            border: 1px solid rgba(157, 215, 112, 0.35);
            border-radius: 999px;
            padding: 5px 14px;
            color: #b8f389;
            font-size: 12px;
            font-weight: 600;
        }

        .card {
            background-color: #fafaf5;
            border-left: 1px solid #c2c9b7;
            border-right: 1px solid #c2c9b7;
            padding: 36px 40px;
        }

        .greeting {
            font-size: 22px;
            font-weight: 700;
            color: #1a1c19;
            margin-bottom: 12px;
            letter-spacing: -0.4px;
        }

        .intro {
            font-size: 15px;
            color: #42493b;
            line-height: 1.65;
            margin-bottom: 28px;
        }

        .finca-block {
            margin-bottom: 28px;
        }

        .finca-header {
            background-color: #f4f4ef;
            border: 1px solid #c2c9b7;
            border-left: 4px solid #275300;
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 12px;
        }

        .finca-label {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #727969;
            margin-bottom: 4px;
        }

        .finca-name {
            font-size: 16px;
            font-weight: 700;
            color: #275300;
        }

        .alertas-section {
            margin-bottom: 16px;
        }

        .section-title {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .section-title.proximas {
            color: #275300;
        }

        .section-title.vencidas {
            color: #9b3f1a;
        }

        .alerta-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 9px 14px;
            border-radius: 8px;
            margin-bottom: 6px;
            font-size: 13px;
        }

        .alerta-row.proxima {
            background-color: #f0f7e8;
            border: 1px solid #c5dba8;
        }

        .alerta-row.vencida {
            background-color: #fdf1ec;
            border: 1px solid #f0c4aa;
        }

        .alerta-animal {
            font-weight: 600;
            color: #1a1c19;
        }

        .alerta-producto {
            color: #42493b;
            margin-top: 1px;
        }

        .alerta-badge {
            font-size: 11px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 999px;
            white-space: nowrap;
        }

        .badge-proxima {
            background-color: #d4edba;
            color: #275300;
        }

        .badge-vencida {
            background-color: #fad9ca;
            color: #7a2e0e;
        }

        .badge-hoy {
            background-color: #fff3cd;
            color: #7a4f00;
        }

        .tipo-pill {
            font-size: 10px;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 999px;
            margin-right: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .tipo-vacuna {
            background: #dbeafe;
            color: #1d4ed8;
        }

        .tipo-desparasitacion {
            background: #fef9c3;
            color: #854d0e;
        }

        .tipo-tratamiento {
            background: #fee2e2;
            color: #991b1b;
        }

        .vencidas-resumen {
            background-color: #fdf1ec;
            border: 1px solid #f0c4aa;
            border-left: 4px solid #c0581a;
            border-radius: 8px;
            padding: 12px 16px;
            font-size: 13px;
            color: #42493b;
            margin-bottom: 8px;
        }

        .vencidas-resumen strong {
            color: #7a2e0e;
        }

        .divider {
            border: none;
            border-top: 1px solid #e3e3de;
            margin: 28px 0;
        }

        .btn-row {
            text-align: center;
            margin-bottom: 20px;
        }

        .btn-primary {
            display: inline-block;
            background-color: #275300;
            color: #ffffff !important;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
            padding: 13px 32px;
            border-radius: 10px;
        }

        .info-note {
            font-size: 13px;
            color: #727969;
            line-height: 1.55;
            text-align: center;
        }

        .footer {
            background-color: #275300;
            border-radius: 0 0 16px 16px;
            padding: 20px 40px;
            text-align: center;
        }

        .footer p {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            line-height: 1.6;
        }

        .footer strong {
            color: rgba(255, 255, 255, 0.8);
        }
    </style>
</head>

<body>
    <div class="wrapper">

        <!-- Header -->
        <div class="header">
            <div style="margin-bottom:20px;">
                <strong style="display:block; color:#ffffff; font-size:16px; font-weight:700;">HatoManager</strong>
                <span style="display:block; color:rgba(255,255,255,0.55); font-size:9px; letter-spacing:1.5px; text-transform:uppercase; margin-top:1px;">Agro-Professional</span>
            </div>
            <div class="header-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#b8f389" />
                </svg>
                Alertas sanitarias pendientes
            </div>
        </div>

        <!-- Card -->
        <div class="card">
            <p class="greeting">Hola, {{ $nombreGanadero }} 👋</p>
            <p class="intro">
                Tienes alertas sanitarias pendientes en
                {{ count($alertasPorFinca) === 1 ? 'tu finca' : 'tus fincas' }}.
                Revisa el detalle a continuación y toma las acciones necesarias para mantener
                el calendario sanitario de tu hato al día.
            </p>

            @foreach ($alertasPorFinca as $finca => $alertas)
            @php
            $proximas = collect($alertas)->filter(fn($a) => $a['dias'] >= 0)->values();
            $vencidas = collect($alertas)->filter(fn($a) => $a['dias'] < 0)->values();
                @endphp

                <div class="finca-block">
                    <div class="finca-header">
                        <p class="finca-label">Finca</p>
                        <p class="finca-name">{{ $finca }}</p>
                    </div>

                    @if ($proximas->count())
                    <div class="alertas-section">
                        <p class="section-title proximas">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style="display:inline">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#275300" />
                            </svg>
                            Próximas a vencer ({{ $proximas->count() }})
                        </p>
                        @foreach ($proximas as $a)
                        <div class="alerta-row proxima">
                            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                                <span class="tipo-pill tipo-{{ $a['tipo'] }}">{{ $a['tipo'] }}</span>
                                <span class="alerta-animal">{{ $a['animal'] }}</span>
                                @if ($a['dias'] === 0)
                                <span class="alerta-badge badge-hoy">Hoy</span>
                                @else
                                <span class="alerta-badge badge-proxima">En {{ $a['dias'] }}d</span>
                                @endif
                            </div>
                            <div class="alerta-producto" style="margin-top:4px; font-size:12px; color:#42493b;">
                                {{ $a['producto'] }}
                            </div>
                        </div>
                        @endforeach
                    </div>
                    @endif

                    @if ($vencidas->count())
                    <div class="alertas-section">
                        <p class="section-title vencidas">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style="display:inline">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#9b3f1a" />
                            </svg>
                            Vencidas ({{ $vencidas->count() }})
                        </p>
                        <div class="vencidas-resumen">
                            Tienes <strong>{{ $vencidas->count() }} {{ $vencidas->count() === 1 ? 'alerta vencida' : 'alertas vencidas' }}</strong>
                            en esta finca. Ingresa a la aplicación para ver el detalle completo y tomar acción.
                        </div>
                    </div>
                    @endif
                </div>
                @endforeach

                <hr class="divider">

                <div class="btn-row">
                    <a href="{{ url('/sanidad') }}" class="btn-primary">Ver sanidad animal</a>
                </div>

                <p class="info-note">
                    Este es un resumen automático diario. Las alertas vencidas requieren atención inmediata.
                </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Equipo HatoManager</strong> · Plataforma de gestión ganadera</p>
            <p style="margin-top:4px;">Este es un mensaje automático, por favor no respondas a este correo.</p>
        </div>

    </div>
</body>

</html>