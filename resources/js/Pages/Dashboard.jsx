import AlertasDashboard from '@/Components/Dashboard/AlertasDashboard';
import CardsInformacion from '@/Components/Dashboard/CardsInformacion';
import ChartCard from '@/Components/Dashboard/Charts/ChartCard';
import EmptyChart from '@/Components/Dashboard/Charts/EmptyChart';
import CurvaPesoHistorico from '@/Components/Dashboard/CurvaPesoHistorico';
import Header from '@/Components/Dashboard/Header';
import IngresosSalidas from '@/Components/Dashboard/IngresosSalidas';
import PieCategoria from '@/Components/Dashboard/PieCategoria';
import PieEstado from '@/Components/Dashboard/PieEstado';
import StatusKPI from '@/Components/Dashboard/StatusKPI';
import VentasMensuales from '@/Components/Dashboard/VentasMensuales';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Sector } from 'recharts';

/* ─── Helpers ─────────────────────────────────────────────── */
const MESES = {
    '01': 'Ene',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dic',
};
const labelMes = (ym = '') => {
    const [y, m] = ym.split('-');
    return `${MESES[m] ?? m} ${(y ?? '').slice(2)}`;
};

// Formateador adaptable para el eje Y de montos en COP.;
// con subtotales menores a $1.000.000 el resultado redondeaba a "0.0M" sin importar el monto real.
const formatAxisCOP = (v) => {
    if (!v) return '$0';
    const abs = Math.abs(v);
    if (abs >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `$${Math.round(v / 1_000)}K`;
    return `$${v}`;
};

const CAT_COLORS = [
    '#16a34a',
    '#2563eb',
    '#d97706',
    '#9333ea',
    '#0891b2',
    '#65a30d',
];

const renderPieSector = (props) => {
    const { payload, ...rest } = props;
    return <Sector {...rest} fill={payload?.color ?? props.fill} />;
};

/* ════════════════════════════════════════════════════════════ */
export default function Dashboard({
    alertas,
    totales,
    tab,
    kpis = {},
    porEstado = [],
    porCategoria = [],
    evolucionPeso = [],
    ventasMensuales = [],
    movimientosMensuales = [],
    finca,
}) {
    /* Preparar datos para gráficas */
    const estadoData = porEstado.map((r) => ({
        name: r.status,
        value: Number(r.total),
        color: r.color,
    }));
    const catData = porCategoria.map((r, i) => ({
        name: r.categoria,
        value: Number(r.total),
        color: CAT_COLORS[i % CAT_COLORS.length],
    }));
    const pesoData = evolucionPeso.map((r) => ({
        mes: labelMes(r.mes),
        peso: Number(r.peso_promedio),
    }));
    const ventaData = ventasMensuales.map((r) => ({
        mes: labelMes(r.mes),
        total: Number(r.total),
        cantidad: Number(r.cantidad),
    }));
    const movData = movimientosMensuales.map((r) => ({
        mes: labelMes(r.mes),
        ingresos: Number(r.ingresos),
        salidas: Number(r.salidas),
    }));

    const totalAlertasVenta = kpis.ordenes_pendientes ?? 0;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* ── Encabezado ─────────────────────────────────── */}
            <Header finca={finca} />

            <div className="space-y-4">
                {/* ══ 1. KPI chips — status del hato ════════════ */}
                <StatusKPI kpis={kpis} />

                {/* ══ 2. Cards: peso + vacunas + ventas ══════════ */}
                <CardsInformacion
                    totalAlertasVenta={totalAlertasVenta}
                    kpis={kpis}
                />

                {/* ══ 3. RF-27: Evolución hato + Peso histórico ══ */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
                    {/* Ingresos vs Salidas 12 meses (3/5) */}
                    <ChartCard
                        className="xl:col-span-3"
                        icon="trending_up"
                        title="Evolución mensual del hato"
                        sub="Animales ingresados vs. dados de baja (12 meses)"
                    >
                        {movData.length === 0 ? (
                            <EmptyChart />
                        ) : (
                            <IngresosSalidas movData={movData} />
                        )}
                    </ChartCard>

                    {/* Curva peso histórico — WeightChart del compañero (2/5) */}
                    <ChartCard
                        className="xl:col-span-2"
                        icon="monitor_weight"
                        title="Peso promedio histórico"
                        sub="kg promedio del hato por mes (12 meses)"
                    >
                        {pesoData.length === 0 ? (
                            <EmptyChart />
                        ) : (
                            <CurvaPesoHistorico pesoData={pesoData} />
                        )}
                    </ChartCard>
                </div>

                {/* ══ 4. Ventas mensuales + Distribución hato ════ */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
                    {/* Ventas mensuales COP (3/5) */}
                    <ChartCard
                        className="xl:col-span-3"
                        icon="bar_chart"
                        title="Ventas mensuales"
                        sub="Solo transacciones aprobadas (6 meses)"
                    >
                        {ventaData.length === 0 ? (
                            <EmptyChart text="Sin ventas aprobadas aún" />
                        ) : (
                            <VentasMensuales
                                formatAxisCOP={formatAxisCOP}
                                ventaData={ventaData}
                            />
                        )}
                    </ChartCard>

                    {/* Pie: estado + categoría apilados (2/5) */}
                    <div className="flex flex-col gap-4 xl:col-span-2">
                        {/* Pie status */}
                        <ChartCard
                            icon="donut_large"
                            title="Hato por estado"
                            className="flex-1"
                        >
                            {estadoData.length === 0 ? (
                                <EmptyChart h={200} />
                            ) : (
                                <PieEstado
                                    estadoData={estadoData}
                                    renderPieSector={renderPieSector}
                                />
                            )}
                        </ChartCard>

                        {/* Pie categoría */}
                        <ChartCard
                            icon="category"
                            title="Hato por categoría"
                            className="flex-1"
                        >
                            {catData.length === 0 ? (
                                <EmptyChart h={200} />
                            ) : (
                                <PieCategoria
                                    catData={catData}
                                    renderPieSector={renderPieSector}
                                />
                            )}
                        </ChartCard>
                    </div>
                </div>

                {/* ══ 5. Alertas sanitarias ══════════════════════ */}
                <AlertasDashboard
                    alertas={alertas}
                    totales={totales}
                    tab={tab}
                />
            </div>
            {/* /space-y-4 */}
        </AuthenticatedLayout>
    );
}

/* ── Sub-componentes ──────────────────────────────────────── */
