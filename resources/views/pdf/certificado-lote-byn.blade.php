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

        .resumen-box {
            border: 1px solid #000;
            padding: 10px 14px;
            margin-bottom: 18px;
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
            font-size: 18px;
            font-weight: 700;
            color: #000;
        }

        .resumen-label {
            font-size: 9px;
            color: #555;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            margin-top: 2px;
        }

        .resumen-divider {
            border-left: 1px solid #ccc;
        }

        .table-animals {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
        }

        .table-animals th {
            background: #000;
            color: #fff;
            padding: 6px 8px;
            text-align: left;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        .table-animals td {
            padding: 6px 8px;
            border-bottom: 1px solid #ccc;
            vertical-align: top;
        }

        .table-animals tr:nth-child(even) td {
            background: #f2f2f2;
        }

        .no-records {
            font-size: 9px;
            color: #888;
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

    {{-- HEADER --}}
    <div class="header">
        <table width="100%">
            <tr>
                <td>
                    <div class="badge">Certificado Sanitario por Lote</div>
                    <h1>HatoManager</h1>
                    <p>Generado el {{ $fecha }}</p>
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

        {{-- DATOS FINCA --}}
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

        {{-- TABLA ANIMALES --}}
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
                            <div style="font-size:9px;color:#555;">
                                {{ $lastRecord->applied_at->format('d/m/Y') }}
                            </div>
                            @else
                            <span class="no-records">Sin registros</span>
                            @endif
                        </td>
                        <td>{{ $lastRecord ? ucfirst($lastRecord->type) : '—' }}</td>
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