<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Certificado Sanitario por Lote</title>
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

        .resumen-box {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
            padding: 12px 16px;
            margin-bottom: 20px;
        }

        .resumen-box table {
            width: 100%;
            border-collapse: collapse;
        }

        .resumen-box td {
            padding: 4px 12px;
            text-align: center;
        }

        .resumen-num {
            font-size: 20px;
            font-weight: 700;
            color: #14532d;
        }

        .resumen-label {
            font-size: 9px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 2px;
        }

        .resumen-divider {
            border-left: 1px solid #bbf7d0;
        }

        /* Tabla de animales */
        .table-animals {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }

        .table-animals th {
            background: #14532d;
            color: white;
            padding: 7px 8px;
            text-align: left;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        .table-animals td {
            padding: 6px 8px;
            border-bottom: 1px solid #e5e7eb;
            vertical-align: top;
        }

        .table-animals tr:nth-child(even) td {
            background: #f9fafb;
        }

        .type-badge {
            padding: 2px 6px;
            border-radius: 99px;
            font-size: 8px;
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

        .no-records {
            font-size: 9px;
            color: #9ca3af;
            font-style: italic;
        }

        .page-break {
            page-break-after: always;
        }

        .firmas {
            margin-top: 40px;
        }

        .footer {
            margin-top: 28px;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 9px;
            color: #9ca3af;
        }
    </style>
</head>

<body>

    {{-- HEADER --}}
    <div class="header">
        <table width="100%">
            <tr>
                <td>
                    <div class="badge">CERTIFICADO SANITARIO POR LOTE</div>
                    <h1>HatoManager</h1>
                    <p>Certificado generado el {{ $fecha }}</p>
                </td>
                <td style="text-align:right;">
                    <p style="font-size:13px;font-weight:700;">{{ $farm->name }}</p>
                    <p>{{ $farm->city }}, {{ $farm->department }}</p>
                    <p style="margin-top:4px;">Total animales: <strong>{{ $animals->count() }}</strong></p>
                </td>
            </tr>
        </table>
    </div>

    <div class="body">

        {{-- RESUMEN FINCA --}}
        <div class="section">
            <div class="section-title">Datos de la Finca</div>
            <table class="grid-2">
                <tr>
                    <td>
                        <div class="field-label">Nombre</div>
                        <div class="field-value">{{ $farm->name }}</div>
                    </td>
                    <td>
                        <div class="field-label">Municipio / Departamento</div>
                        <div class="field-value">{{ $farm->city }}, {{ $farm->department }}</div>
                    </td>
                </tr>
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

        {{-- RESUMEN NUMÉRICO --}}
        <div class="resumen-box">
            <table>
                <tr>
                    <td>
                        <div class="resumen-num">{{ $animals->count() }}</div>
                        <div class="resumen-label">Total Animales</div>
                    </td>
                    <td class="resumen-divider">
                        <div class="resumen-num">{{ $animals->where('sex','macho')->count() }}</div>
                        <div class="resumen-label">Machos</div>
                    </td>
                    <td class="resumen-divider">
                        <div class="resumen-num">{{ $animals->where('sex','hembra')->count() }}</div>
                        <div class="resumen-label">Hembras</div>
                    </td>
                    <td class="resumen-divider">
                        <div class="resumen-num">
                            {{ $animals->filter(fn($a) => $a->healthRecords->isNotEmpty())->count() }}
                        </div>
                        <div class="resumen-label">Con registros sanitarios</div>
                    </td>
                    <td class="resumen-divider">
                        <div class="resumen-num">
                            {{ $animals->filter(fn($a) => $a->healthRecords->isEmpty())->count() }}
                        </div>
                        <div class="resumen-label">Sin registros</div>
                    </td>
                </tr>
            </table>
        </div>

        {{-- TABLA DE ANIMALES --}}
        <div class="section">
            <div class="section-title">Inventario Sanitario del Lote</div>
            <table class="table-animals">
                <thead>
                    <tr>
                        <th>Arete</th>
                        <th>Nombre</th>
                        <th>Raza</th>
                        <th>Sexo</th>
                        <th>Categoría</th>
                        <th>Último Tratamiento</th>
                        <th>Tipo</th>
                        <th>Próxima Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($animals as $animal)
                    @php $lastRecord = $animal->healthRecords->first(); @endphp
                    <tr>
                        <td><strong>{{ $animal->ear_tag }}</strong></td>
                        <td>{{ $animal->name ?? '—' }}</td>
                        <td>{{ $animal->breed->name ?? '—' }}</td>
                        <td>{{ ucfirst($animal->sex) }}</td>
                        <td>{{ $animal->animalCategory->name ?? '—' }}</td>
                        <td>
                            @if($lastRecord)
                            {{ $lastRecord->product }}
                            <div style="font-size:9px;color:#6b7280;">
                                {{ $lastRecord->applied_at->format('d/m/Y') }}
                            </div>
                            @else
                            <span class="no-records">Sin registros</span>
                            @endif
                        </td>
                        <td>
                            @if($lastRecord)
                            <span class="type-badge type-{{ $lastRecord->type }}">
                                {{ ucfirst($lastRecord->type) }}
                            </span>
                            @else
                            —
                            @endif
                        </td>
                        <td>{{ $lastRecord?->next_date?->format('d/m/Y') ?? '—' }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        {{-- FIRMAS --}}
        <div class="firmas">
            <table width="100%">
                <tr>
                    <td width="45%" style="text-align:center;">
                        <div style="border-top:1px solid #374151;padding-top:6px;">
                            <div style="font-size:11px;font-weight:700;">{{ $ganadero->name ?? '—' }}</div>
                            <div style="font-size:9px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Ganadero Propietario</div>
                        </div>
                    </td>
                    <td width="10%"></td>
                    <td width="45%" style="text-align:center;">
                        <div style="border-top:1px solid #374151;padding-top:6px;">
                            <div style="font-size:11px;font-weight:700;">{{ $veterinario->name ?? 'Sin asignar' }}</div>
                            <div style="font-size:9px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Veterinario Responsable</div>
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