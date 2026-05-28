<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invitación a HatoManager</title>
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

        /* ── Header ── */
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

        .logo-text {
            text-align: left;
        }

        .logo-text strong {
            display: block;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: -0.3px;
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
            letter-spacing: 0.3px;
        }

        /* ── Body card ── */
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

        /* ── Farm info box ── */
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

        .farm-location svg {
            vertical-align: middle;
            margin-right: 3px;
        }

        /* ── Features list ── */
        .features {
            margin-bottom: 28px;
        }

        .features-title {
            font-size: 13px;
            font-weight: 600;
            color: #1a1c19;
            margin-bottom: 12px;
        }

        .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 8px;
        }

        .feature-dot {
            width: 20px;
            height: 20px;
            background-color: #b8f389;
            border-radius: 999px;
            flex-shrink: 0;
            margin-top: 1px;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .feature-dot svg {
            width: 11px;
            height: 11px;
        }

        .feature-text {
            font-size: 14px;
            color: #42493b;
            line-height: 1.5;
        }

        /* ── CTA button ── */
        .cta-wrap {
            text-align: center;
            margin-bottom: 24px;
        }

        .cta-btn {
            display: inline-block;
            background-color: #275300;
            color: #ffffff !important;
            text-decoration: none;
            font-size: 15px;
            font-weight: 700;
            padding: 14px 36px;
            border-radius: 10px;
            letter-spacing: -0.2px;
        }

        .cta-fallback {
            margin-top: 14px;
            font-size: 12px;
            color: #727969;
            text-align: center;
            line-height: 1.6;
        }

        .cta-fallback a {
            color: #275300;
            word-break: break-all;
        }

        /* ── Warning banner ── */
        .warning {
            background-color: #fff8e6;
            border: 1px solid #f0d070;
            border-radius: 10px;
            padding: 12px 16px;
            display: flex;
            gap: 10px;
            align-items: flex-start;
            margin-bottom: 24px;
        }

        .warning-icon {
            font-size: 16px;
            flex-shrink: 0;
            margin-top: 1px;
        }

        .warning-text {
            font-size: 13px;
            color: #5c4a00;
            line-height: 1.55;
        }

        .warning-text strong {
            color: #3d3000;
        }

        /* ── Divider ── */
        .divider {
            border: none;
            border-top: 1px solid #e3e3de;
            margin: 24px 0;
        }

        .ignore-note {
            font-size: 13px;
            color: #727969;
            line-height: 1.55;
        }

        /* ── Footer ── */
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
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#b8f389" />
                </svg>
                Invitación de veterinario
            </div>
        </div>

        <!-- Card -->
        <div class="card">
            <p class="greeting">¡Hola!</p>
            <p class="intro">
                El ganadero <strong>{{ $ganadero->name }}</strong> te ha invitado a unirte a
                <strong>HatoManager</strong> como veterinario vinculado a su finca.
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

            <!-- Features -->
            <div class="features">
                <p class="features-title">Como veterinario vinculado podrás:</p>
                @foreach([
                'Registrar vacunas y eventos sanitarios',
                'Consultar el inventario ganadero de la finca',
                'Generar certificados de salud animal',
                'Hacer seguimiento al estado clínico de los animales',
                ] as $feature)
                <div class="feature-item">
                    <div class="feature-dot">
                        <svg viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#275300" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <p class="feature-text">{{ $feature }}</p>
                </div>
                @endforeach
            </div>

            <!-- CTA -->
            <div class="cta-wrap">
                <a href="{{ $registerUrl }}" class="cta-btn">Crear cuenta y aceptar invitación</a>
            </div>

            <p class="cta-fallback">
                Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                <a href="{{ $registerUrl }}">{{ $registerUrl }}</a>
            </p>

            <hr class="divider">

            <!-- Warning -->
            <div class="warning">
                <span class="warning-icon">⚠️</span>
                <p class="warning-text">
                    Este enlace es válido por <strong>48 horas</strong> y es de uso personal.
                    No lo compartas con nadie.
                </p>
            </div>

            <p class="ignore-note">
                Si no conoces a <strong>{{ $ganadero->name }}</strong> o no esperabas esta invitación,
                puedes ignorar este correo con total seguridad. Tu información no será compartida.
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