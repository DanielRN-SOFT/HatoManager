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
            color: #1a1a1a;
            background: #fff;
        }

        .header {
            background: #14532d;
            color: white;
            padding: 24px 32px;
        }

        .header h1 {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        .header p {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.75);
            margin-top: 4px;
        }

        .header-right {
            text-align: right;
        }

        .header table {
            width: 100%;
        }

        .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.4);
            color: white;
            font-size: 10px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 99px;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }

        .body {
            padding: 24px 32px;
        }

        .section {
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 10px;
            font-weight: 700;
            color: #14532d;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            border-bottom: 2px solid #14532d;
            padding-bottom: 4px;
            margin-bottom: 12px;
        }

        .grid-2 {
            width: 100%;
            border-collapse: collapse;
        }

        .grid-2 td {
            width: 50%;
            padding: 5px 8px;
            vertical-align: top;
        }

        .field-label {
            font-size: 9px;
            color: #6b7280;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .field-value {
            font-size: 11px;
            color: #1a1a1a;
            font-weight: 600;
            margin-top: 2px;
        }

        .table-records {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }

        .table-records th {
            background: #14532d;
            color: white;
            padding: 7px 10px;
            text-align: left;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .table-records td {
            padding: 7px 10px;
            border-bottom: 1px solid #e5e7eb;
        }

        .table-records tr:nth-child(even) td {
            background: #f9fafb;
        }

        .table-records .empty {
            text-align: center;
            color: #9ca3af;
            padding: 16px;
            font-style: italic;
        }

        .type-badge {
            padding: 2px 8px;
            border-radius: 99px;
            font-size: 9px;
            font-weight: 700;
        }

        .type-vacuna {
            background: #dcfce7;
            color: #14532d;
        }

        .type-desparasitacion {
            background: #fef3c7;
            color: #92400e;
        }

        .type-vitamina {
            background: #dbeafe;
            color: #1e40af;
        }

        .type-otro {
            background: #f3f4f6;
            color: #374151;
        }

        .firmas {
            margin-top: 40px;
        }

        .firma-box {
            width: 45%;
            display: inline-block;
            text-align: center;
        }

        .firma-line {
            border-top: 1px solid #374151;
            margin-bottom: 6px;
        }

        .firma-nombre {
            font-size: 11px;
            font-weight: 700;
        }

        .firma-rol {
            font-size: 9px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .footer {
            margin-top: 32px;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 9px;
            color: #9ca3af;
        }

        .info-box {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
            padding: 10px 14px;
            margin-bottom: 20px;
        }

        .info-box p {
            font-size: 10px;
            color: #14532d;
        }
    </style>
</head>

<body>

    {{-- HEADER --}}
    <div class="header">
        <table>
            <tr>
                <td>
                    <div class="badge">CERTIFICADO SANITARIO INDIVIDUAL</div>
                    <h1>HatoManager</h1>
                    <p>Certificado generado el {{ $fecha }}</p>
                </td>
                <td class="header-right">
                    <p style="font-size:13px;font-weight:700;">{{ $animal->farm->name }}</p>
                    <p>{{ $animal->farm->city }}, {{ $animal->farm->department }}</p>
                    <p style="margin-top:4px;">Nro. Arete: <strong>{{ $animal->ear_tag }}</strong></p>
                </td>
            </tr>
        </table>
    </div>

    <div class="body">

        {{-- INFO ANIMAL --}}
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

        {{-- HISTORIAL VACUNAS --}}
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
                        <td>
                            <span class="type-badge type-{{ $record->type }}">
                                {{ ucfirst($record->type) }}
                            </span>
                        </td>
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

        {{-- DATOS GANADERO Y VETERINARIO --}}
        <div class="section">
            <div class="section-title">Responsables</div>
            <table class="grid-2">
                <tr>
                    <td>
                        <div class="field-label">Ganadero Propietario</div>
                        <div class="field-value">{{ $ganadero->name ?? '—' }}</div>
                        <div style="font-size:10px;color:#6b7280;margin-top:2px;">{{ $ganadero->email ?? '' }}</div>
                    </td>
                    <td>
                        <div class="field-label">Veterinario Responsable</div>
                        <div class="field-value">{{ $veterinario->name ?? 'Sin asignar' }}</div>
                        <div style="font-size:10px;color:#6b7280;margin-top:2px;">{{ $veterinario->email ?? '' }}</div>
                    </td>
                </tr>
            </table>
        </div>

        {{-- FIRMAS --}}
        <div class="firmas">
            <table width="100%">
                <tr>
                    <td width="45%" style="text-align:center;">
                        <div style="border-top:1px solid #374151;padding-top:6px;">
                            <div class="firma-nombre">{{ $ganadero->name ?? '—' }}</div>
                            <div class="firma-rol">Ganadero Propietario</div>
                        </div>
                    </td>
                    <td width="10%"></td>
                    <td width="45%" style="text-align:center;">
                        <div style="border-top:1px solid #374151;padding-top:6px;">
                            <div class="firma-nombre">{{ $veterinario->name ?? 'Sin asignar' }}</div>
                            <div class="firma-rol">Veterinario Responsable</div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        {{-- FOOTER --}}
        <div class="footer">
            <p>Documento generado por HatoManager · {{ $fecha }} · Para uso ante el ICA y ferias de ganado</p>
        </div>

    </div>
</body>

</html>