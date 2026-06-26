<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Restablecer contraseña — HatoManager</title>
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

        .expiry-box {
            background-color: #f4f4ef;
            border: 1px solid #c2c9b7;
            border-left: 4px solid #275300;
            border-radius: 10px;
            padding: 14px 18px;
            margin-bottom: 28px;
            font-size: 13px;
            color: #42493b;
            line-height: 1.55;
        }

        .expiry-box strong { color: #275300; }

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
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#b8f389"/>
                </svg>
                Restablecer contraseña
            </div>
        </div>

        <div class="card">
            <p class="greeting">Hola, {{ $notifiable->name }} 👋</p>
            <p class="intro">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta en HatoManager.
                Haz clic en el botón de abajo para crear una nueva contraseña.
            </p>

            <div class="expiry-box">
                <strong>⏱ Este enlace expira en {{ config('auth.passwords.'.config('auth.defaults.passwords').'.expire') }} minutos.</strong>
                Si no solicitaste este cambio, puedes ignorar este mensaje con total seguridad.
            </div>

            <div class="btn-row">
                <a href="{{ $url }}" class="btn-primary">Restablecer contraseña</a>
            </div>

            <p class="cta-fallback">
                Si el botón no funciona, copia este enlace en tu navegador:<br>
                <a href="{{ $url }}">{{ $url }}</a>
            </p>

            <hr class="divider">

            <p class="info-note">
                Si no solicitaste restablecer tu contraseña, no es necesario que hagas nada.
                Tu contraseña actual seguirá siendo la misma.
            </p>
        </div>

        <div class="footer">
            <p><strong>Equipo HatoManager</strong> · Plataforma de gestión ganadera</p>
            <p style="margin-top:4px;">Este es un mensaje automático, por favor no respondas a este correo.</p>
        </div>

    </div>
</body>
</html>
