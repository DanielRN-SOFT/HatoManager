<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Certificado Sanitario Individual</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #000;
            background: #fff;
        }

        .header {
            border-bottom: 3px solid #000;
            padding: 20px 32px;
        }

        .header h1 {
            font-size: 18px;
            font-weight: 700;
        }

        .header p {
            font-size: 10px;
            color: #444;
            margin-top: 3px;
        }

        .badge {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            border: 1px solid #000;
            padding: 2px 8px;
            display: inline-block;
            margin-bottom: 6px;
        }

        .body {
            padding: 20px 32px;
        }

        .section {
            margin-bottom: 18px;
        }

        .section-title {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 10px;
        }

        .grid-2 {
            width: 100%;
            border-collapse: collapse;
        }

        .grid-2 td {
            width: 50%;
            padding: 4px 6px;
            vertical-align: top;
        }

        .field-label {
            font-size: 9px;
            color: #555;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        .field-value {
            font-size: 11px;
            color: #000;
            font-weight: 600;
            margin-top: 1px;
        }

        .table-records {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }

        .table-records th {
            background: #fff;
            color: #000;
            border-bottom: 2px solid #000;
            padding: 6px 8px;
            text-align: left;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        .table-records td {
            padding: 6px 8px;
            border-bottom: 1px solid #ccc;
        }

        .table-records tr:nth-child(even) td {
            background: #f2f2f2;
        }

        .table-records .empty {
            text-align: center;
            color: #888;
            padding: 14px;
            font-style: italic;
        }

        .firmas {
            margin-top: 48px;
        }

        .footer {
            margin-top: 28px;
            padding-top: 10px;
            border-top: 1px solid #ccc;
            text-align: center;
            font-size: 9px;
            color: #777;
        }
    </style>
</head>

<body>

    <div class="header">
        <table width="100%">
            <tr>
                <td>
                    <div class="badge">Certificado Sanitario Individual</div>
                    <h1>HatoManager</h1>
                    <p>Generado el {{ $fecha }}</p>
                </td>
                <td style="text-align:right;">
                    <p style="font-size:13px;font-weight:700;">{{ $animal->farm->name }}</p>
                    <p>{{ $animal->farm->city }}, {{ $animal->farm->department }}</p>
                    <p style="margin-top:4px;">Arete: <strong>{{ $animal->ear_tag }}</strong></p>
                </td>
            </tr>
        </table>
    </div>

    <div class="body">

        <div class="section">
            <div class="section-title">Datos del Animal</div>
            <table class="grid-2">
                <tr>
                    <td>
                        <div class="field-label">Nombre</div>
                        <div class="field-value">{{ $animal->name ?? '—' }}</div>
                    </td>
                    <td>
                        <div class="field-label">Número de Arete</div>
                        <div class="field-value">{{ $animal->ear_tag }}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="field-label">Raza</div>
                        <div class="field-value">{{ $animal->breed->name ?? '—' }}</div>
                    </td>
                    <td>
                        <div class="field-label">Categoría</div>
                        <div class="field-value">{{ $animal->animalCategory->name ?? '—' }}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="field-label">Sexo</div>
                        <div class="field-value">{{ ucfirst($animal->sex) }}</div>
                    </td>
                    <td>
                        <div class="field-label">Fecha de Nacimiento</div>
                        <div class="field-value">{{ $animal->birth_date?->format('d/m/Y') ?? '—' }}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="field-label">Estado</div>
                        <div class="field-value">{{ ucfirst($animal->status) }}</div>
                    </td>
                    <td>
                        <div class="field-label">Finca</div>
                        <div class="field-value">{{ $animal->farm->name }}</div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">Historial Sanitario</div>
            <table class="table-records">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Producto</th>
                        <th>Dosis</th>
                        <th>Fecha Aplicación</th>
                        <th>Próxima Fecha</th>
                        <th>Registrado por</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($animal->healthRecords as $record)
                    <tr>
                        <td>{{ ucfirst($record->type) }}</td>
                        <td>{{ $record->product }}</td>
                        <td>{{ $record->dose ?? '—' }}</td>
                        <td>{{ $record->applied_at->format('d/m/Y') }}</td>
                        <td>{{ $record->next_date?->format('d/m/Y') ?? '—' }}</td>
                        <td>{{ $record->registeredBy->name ?? '—' }}</td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="empty">Sin registros sanitarios</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="section">
            <div class="section-title">Responsables</div>
            <table class="grid-2">
                <tr>
                    <td>
                        <div class="field-label">Ganadero Propietario</div>
                        <div class="field-value">{{ $ganadero->name ?? '—' }}</div>
                        <div style="font-size:10px;color:#555;margin-top:2px;">{{ $ganadero->email ?? '' }}</div>
                    </td>
                    <td>
                        <div class="field-label">Veterinario Responsable</div>
                        <div class="field-value">{{ $veterinario->name ?? 'Sin asignar' }}</div>
                        <div style="font-size:10px;color:#555;margin-top:2px;">{{ $veterinario->email ?? '' }}</div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="firmas">
            <table width="100%">
                <tr>
                    <td width="45%" style="text-align:center;">
                        <div style="border-top:1px solid #000;padding-top:6px;">
                            <div style="font-size:11px;font-weight:700;">{{ $ganadero->name ?? '—' }}</div>
                            <div style="font-size:9px;color:#555;text-transform:uppercase;letter-spacing:0.5px;">Ganadero Propietario</div>
                        </div>
                    </td>
                    <td width="10%"></td>
                    <td width="45%" style="text-align:center;">
                        <div style="border-top:1px solid #000;padding-top:6px;">
                            <div style="font-size:11px;font-weight:700;">{{ $veterinario->name ?? 'Sin asignar' }}</div>
                            <div style="font-size:9px;color:#555;text-transform:uppercase;letter-spacing:0.5px;">Veterinario Responsable</div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p>Documento generado por HatoManager · {{ $fecha }} · Para uso ante el ICA y ferias de ganado</p>
        </div>

    </div>
</body>

</html>