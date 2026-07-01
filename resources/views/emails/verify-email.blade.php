<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verifica tu correo — HatoManager</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background-color: #f0f4ec;
            font-family: 'Hanken Grotesk', Arial, sans-serif;
            color: #1a1c19;
            padding: 32px 16px;
        }

        .wrapper { max-width: 580px; margin: 0 auto; }

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

        .welcome-box {
            background-color: #f4f4ef;
            border: 1px solid #c2c9b7;
            border-left: 4px solid #275300;
            border-radius: 10px;
            padding: 16px 20px;
            margin-bottom: 28px;
        }

        .welcome-label {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            color: #727969;
            margin-bottom: 6px;
        }

        .welcome-text {
            font-size: 14px;
            color: #42493b;
            line-height: 1.55;
        }

        .welcome-text strong { color: #275300; }

        .btn-row { text-align: center; margin-bottom: 20px; }

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

        .cta-fallback {
            font-size: 12px;
            color: #727969;
            text-align: center;
            line-height: 1.6;
            margin-bottom: 24px;
        }

        .cta-fallback a { color: #275300; word-break: break-all; }

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

        .footer strong { color: rgba(255, 255, 255, 0.8); }
    </style>
</head>

<body>
    <div class="wrapper">

        <div class="header">
            <div style="margin-bottom:20px;">
                <strong style="display:block; color:#ffffff; font-size:16px; font-weight:700;">HatoManager</strong>
                <span style="display:block; color:rgba(255,255,255,0.55); font-size:9px; letter-spacing:1.5px; text-transform:uppercase; margin-top:1px;">Agro-Professional</span>
            </div>
            <div class="header-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="#b8f389"/>
                </svg>
                Verifica tu correo electrónico
            </div>
        </div>

        <div class="card">
            <p class="greeting">Hola, {{ $notifiable->name }} 👋</p>
            <p class="intro">
                Gracias por registrarte en HatoManager. Para activar tu cuenta y comenzar a gestionar
                tu hato, necesitamos verificar tu dirección de correo electrónico.
            </p>

            <div class="welcome-box">
                <p class="welcome-label">Tu cuenta registrada</p>
                <p class="welcome-text">
                    <strong>{{ $notifiable->email }}</strong><br>
                    Una vez verificado, tendrás acceso completo a la plataforma.
                </p>
            </div>

            <div class="btn-row">
                <a href="{{ $url }}" class="btn-primary">✓ Verificar correo electrónico</a>
            </div>

            <p class="cta-fallback">
                Si el botón no funciona, copia este enlace en tu navegador:<br>
                <a href="{{ $url }}">{{ $url }}</a>
            </p>

            <hr class="divider">

            <p class="info-note">
                Si no creaste una cuenta en HatoManager, puedes ignorar este mensaje.
                El enlace de verificación expirará en 60 minutos.
            </p>
        </div>

        <div class="footer">
            <p><strong>Equipo HatoManager</strong> · Plataforma de gestión ganadera</p>
            <p style="margin-top:4px;">Este es un mensaje automático, por favor no respondas a este correo.</p>
        </div>

    </div>
</body>
</html>
