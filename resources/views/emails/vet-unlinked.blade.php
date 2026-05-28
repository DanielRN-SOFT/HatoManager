<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acceso revocado — HatoManager</title>
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

        .logo-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 24px;
        }

        .logo-icon {
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.12);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logo-text strong {
            display: block;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
        }

        .logo-text span {
            display: block;
            color: rgba(255, 255, 255, 0.55);
            font-size: 9px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-top: 1px;
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
            margin-bottom: 24px;
        }

        .farm-box {
            background-color: #f4f4ef;
            border: 1px solid #c2c9b7;
            border-left: 4px solid #ba1a1a;
            border-radius: 10px;
            padding: 16px 20px;
            margin-bottom: 28px;
        }

        .farm-label {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #727969;
            margin-bottom: 6px;
        }

        .farm-name {
            font-size: 17px;
            font-weight: 700;
            color: #ba1a1a;
            margin-bottom: 2px;
        }

        .farm-location {
            font-size: 13px;
            color: #42493b;
        }

        /* ── What changed ── */
        .changes-box {
            background-color: #fff8f7;
            border: 1px solid #ffdad6;
            border-radius: 10px;
            padding: 16px 20px;
            margin-bottom: 24px;
        }

        .changes-title {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #93000a;
            margin-bottom: 10px;
        }

        .change-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 6px;
        }

        .change-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #ba1a1a;
            flex-shrink: 0;
            margin-top: 6px;
        }

        .change-text {
            font-size: 13px;
            color: #42493b;
            line-height: 1.5;
        }

        .divider {
            border: none;
            border-top: 1px solid #e3e3de;
            margin: 24px 0;
        }

        .info-note {
            font-size: 13px;
            color: #727969;
            line-height: 1.6;
        }

        .info-note strong {
            color: #42493b;
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
            <div style="text-align:center; margin-bottom:24px;">
                <strong style="display:block; color:#ffffff; font-size:16px; font-weight:700;">HatoManager</strong>
                <span style="display:block; color:rgba(255,255,255,0.55); font-size:9px; letter-spacing:1.5px; text-transform:uppercase; margin-top:1px;">Agro-Professional</span>
            </div>
            <div class="header-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#b8f389" />
                </svg>
                Aviso de acceso
            </div>
        </div>

        <!-- Card -->
        <div class="card">
            <p class="greeting">Hola, {{ $notifiable->name }}</p>
            <p class="intro">
                Te informamos que tu acceso como veterinario a la siguiente finca
                ha sido <strong>revocado por el ganadero responsable</strong>.
            </p>

            <!-- Farm info -->
            <div class="farm-box">
                <p class="farm-label">Finca desvinculada</p>
                <p class="farm-name">{{ $farm->name }}</p>
                <p class="farm-location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style="display:inline;vertical-align:middle;margin-right:3px">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#42493b" />
                        <circle cx="12" cy="9" r="2.5" fill="#fafaf5" />
                    </svg>
                    {{ $farm->city }}, {{ $farm->department }}
                </p>
            </div>

            <!-- What changed -->
            <div class="changes-box">
                <p class="changes-title">A partir de ahora</p>
                @foreach([
                'Ya no tienes acceso al inventario ganadero de esta finca.',
                'Los registros sanitarios que creaste permanecen guardados.',
                'Tu acceso a otras fincas vinculadas no se ve afectado.',
                ] as $change)
                <div class="change-item">
                    <div class="change-dot"></div>
                    <p class="change-text">{{ $change }}</p>
                </div>
                @endforeach
            </div>

            <hr class="divider">

            <p class="info-note">
                Si crees que esto fue un <strong>error</strong>, comunícate directamente
                con el ganadero responsable de la finca. HatoManager no interviene en
                decisiones de vinculación entre ganaderos y veterinarios.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Equipo HatoManager</strong> · Plataforma de gestión ganadera</p>
            <p style="margin-top:4px">Este es un mensaje automático, por favor no respondas a este correo.</p>
        </div>

    </div>
</body>

</html>