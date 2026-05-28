<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invitación a finca — HatoManager</title>
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

        .logo-text {
            text-align: center;
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
            border-left: 4px solid #275300;
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
            color: #275300;
            margin-bottom: 2px;
        }

        .farm-location {
            font-size: 13px;
            color: #42493b;
        }

        .actions-label {
            font-size: 13px;
            font-weight: 600;
            color: #1a1c19;
            margin-bottom: 14px;
            text-align: center;
        }

        .btn-row {
            text-align: center;
            margin-bottom: 20px;
        }

        .btn-accept {
            display: inline-block;
            background-color: #275300;
            color: #ffffff !important;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
            padding: 13px 28px;
            border-radius: 10px;
            margin: 0 4px;
        }

        .btn-reject {
            display: inline-block;
            background-color: transparent;
            color: #42493b !important;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 13px 28px;
            border-radius: 10px;
            border: 1px solid #c2c9b7;
            margin: 0 4px;
        }

        .cta-fallback {
            font-size: 12px;
            color: #727969;
            text-align: center;
            line-height: 1.6;
            margin-bottom: 24px;
        }

        .cta-fallback a {
            color: #275300;
            word-break: break-all;
        }

        .divider {
            border: none;
            border-top: 1px solid #e3e3de;
            margin: 24px 0;
        }

        .info-note {
            font-size: 13px;
            color: #727969;
            line-height: 1.55;
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
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" fill="#b8f389" />
                </svg>
                Nueva invitación de finca
            </div>
        </div>

        <!-- Card -->
        <div class="card">
            <p class="greeting">Hola, {{ $notifiable->name }} 👋</p>
            <p class="intro">
                El ganadero <strong>{{ $ganadero->name }}</strong> te ha invitado a vincularte
                como veterinario de su finca en HatoManager. Si aceptas, tendrás acceso al estado
                sanitario de los animales y podrás registrar vacunas y generar certificados.
            </p>

            <!-- Farm info -->
            <div class="farm-box">
                <p class="farm-label">Finca asignada</p>
                <p class="farm-name">{{ $farm->name }}</p>
                <p class="farm-location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style="display:inline;vertical-align:middle;margin-right:3px">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#42493b" />
                        <circle cx="12" cy="9" r="2.5" fill="#fafaf5" />
                    </svg>
                    {{ $farm->city }}, {{ $farm->department }}
                </p>
            </div>

            <!-- Actions -->
            <p class="actions-label">¿Deseas aceptar la invitación?</p>
            <div class="btn-row">
                <a href="{{ $acceptUrl }}" class="btn-accept">✓ Aceptar invitación</a>
                <a href="{{ $rejectUrl }}" class="btn-reject">✕ Rechazar</a>
            </div>

            <p class="cta-fallback">
                Si los botones no funcionan, copia el enlace de aceptación:<br>
                <a href="{{ $acceptUrl }}">{{ $acceptUrl }}</a>
            </p>

            <hr class="divider">

            <p class="info-note">
                Este enlace es personal y no debe compartirse. Si no conoces a
                <strong>{{ $ganadero->name }}</strong> o no esperabas esta invitación,
                ignora este mensaje.
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