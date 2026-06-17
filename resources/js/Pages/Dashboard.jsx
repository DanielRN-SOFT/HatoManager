import AlertasDashboard from '@/Components/Dashboard/AlertasDashboard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import {
    Bar, BarChart, CartesianGrid, Legend,
    Line, LineChart, Pie, PieChart, Sector,
    ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { SiSwisscows } from 'react-icons/si';

/* ─── Helpers ─────────────────────────────────────────────── */
const COP = (n) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n ?? 0);

const MESES = { '01':'Ene','02':'Feb','03':'Mar','04':'Abr','05':'May','06':'Jun','07':'Jul','08':'Ago','09':'Sep','10':'Oct','11':'Nov','12':'Dic' };
const labelMes = (ym = '') => { const [y, m] = ym.split('-'); return `${MESES[m] ?? m} ${(y ?? '').slice(2)}`; };

// Formateador adaptable para el eje Y de montos en COP.
// El formateador anterior (v / 1_000_000) asumía siempre valores en millones;
// con subtotales menores a $1.000.000 el resultado redondeaba a "0.0M" sin importar el monto real.
const formatAxisCOP = (v) => {
    if (!v) return '$0';
    const abs = Math.abs(v);
    if (abs >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000)     return `$${Math.round(v / 1_000)}K`;
    return `$${v}`;
};

const STATUS_CFG = {
    Activo:    { color: '#16a34a', bg: 'bg-green-50',  text: 'text-green-700'  },
    Publicado: { color: '#f97316', bg: 'bg-orange-50', text: 'text-orange-700' },
    Reservado: { color: '#3b82f6', bg: 'bg-blue-50',   text: 'text-blue-700'   },
    Vendido:   { color: '#9333ea', bg: 'bg-purple-50', text: 'text-purple-700' },
    Inactivo:  { color: '#f59e0b', bg: 'bg-amber-50',  text: 'text-amber-700'  },
    Muerto:    { color: '#ef4444', bg: 'bg-red-50',    text: 'text-red-600'    },
};

const CAT_COLORS = ['#16a34a', '#2563eb', '#d97706', '#9333ea', '#0891b2', '#65a30d'];

const BSTATUS = {
    'Pendiente de pago':         { cls: 'bg-amber-50 text-amber-700',   label: 'Pend. pago'     },
    'Pendiente de confirmacion': { cls: 'bg-blue-50 text-blue-700',     label: 'Pend. confirm.' },
    Confirmado:                  { cls: 'bg-green-50 text-green-700',   label: 'Confirmado'     },
    Completado:                  { cls: 'bg-purple-50 text-purple-700', label: 'Completado'     },
    'Rechazado por ganadero':    { cls: 'bg-red-50 text-red-600',       label: 'Rechazado'      },
    'Cancelado por comprador':   { cls: 'bg-gray-100 text-gray-500',    label: 'Cancelado'      },
};

/* ─── Tooltip peso (reutiliza el del compañero) ───────────── */
const WeightTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-lg">
            <p className="mb-1 text-[11px] font-semibold text-gray-400">{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} className="text-sm font-bold" style={{ color: p.color }}>
                    {p.name}: {p.value} kg
                </p>
            ))}
        </div>
    );
};

// Cell quedó deprecado en Recharts (se elimina en v4.0). El reemplazo oficial es
// usar el prop `shape` del componente Pie para pintar cada sector con su color.
// https://recharts.github.io/en-US/guide/cell
const renderPieSector = (props) => {
    const { payload, ...rest } = props;
    return <Sector {...rest} fill={payload?.color ?? props.fill} />;
};

/* ════════════════════════════════════════════════════════════ */
export default function Dashboard({
    alertas, totales, tab,
    kpis = {}, porEstado = [], porCategoria = [],
    evolucionPeso = [], ventasMensuales = [],
    movimientosMensuales = [], ordenesRecientes = [],
    finca,
}) {
    /* Preparar datos para gráficas */
    const estadoData  = porEstado.map((r) => ({ name: r.status, value: Number(r.total), color: r.color }));
    const catData     = porCategoria.map((r, i) => ({
        name: r.categoria,
        value: Number(r.total),
        color: CAT_COLORS[i % CAT_COLORS.length],
    }));
    const pesoData    = evolucionPeso.map((r) => ({ mes: labelMes(r.mes), peso: Number(r.peso_promedio) }));
    const ventaData   = ventasMensuales.map((r) => ({ mes: labelMes(r.mes), total: Number(r.total), cantidad: Number(r.cantidad) }));
    const movData     = movimientosMensuales.map((r) => ({ mes: labelMes(r.mes), ingresos: Number(r.ingresos), salidas: Number(r.salidas) }));

    const totalAlertasVenta = (kpis.ordenes_pendientes ?? 0);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* ── Encabezado ─────────────────────────────────── */}
            <div className="mb-5 flex items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-container">
                        <SiSwisscows className="text-[22px] text-on-primary" />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                            {finca?.nombre ?? 'Mi Finca'}
                        </p>
                        <h1 className="text-xl font-bold leading-tight text-on-surface">Dashboard</h1>
                    </div>
                </div>
                <button
                    onClick={() => router.visit(route('animals.index'))}
                    className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all hover:shadow-lg active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">pets</span>
                    Ver hato
                </button>
            </div>

            <div className="space-y-4">

                {/* ══ 1. KPI chips — status del hato ════════════ */}
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {[
                        { key: 'activos',    icon: 'check_circle',  label: 'Activos',    val: kpis.activos    ?? 0, cfg: STATUS_CFG.Activo    },
                        { key: 'publicados', icon: 'storefront',    label: 'Publicados', val: kpis.publicados ?? 0, cfg: STATUS_CFG.Publicado },
                        { key: 'reservados', icon: 'bookmark',      label: 'Reservados', val: kpis.reservados ?? 0, cfg: STATUS_CFG.Reservado },
                        { key: 'vendidos',   icon: 'sell',          label: 'Vendidos',   val: kpis.vendidos   ?? 0, cfg: STATUS_CFG.Vendido   },
                        { key: 'inactivos',  icon: 'pause_circle',  label: 'Inactivos',  val: kpis.inactivos  ?? 0, cfg: STATUS_CFG.Inactivo  },
                        { key: 'muertos',    icon: 'sentiment_very_dissatisfied', label: 'Muertos', val: kpis.muertos ?? 0, cfg: STATUS_CFG.Muerto },
                    ].map(({ key, icon, label, val, cfg }) => (
                        <div key={key} className={`flex flex-col items-center justify-center gap-0.5 rounded-xl border border-gray-100 py-4 text-center shadow-sm ${cfg.bg}`}>
                            <span className={`material-symbols-outlined text-[20px] ${cfg.text}`}>{icon}</span>
                            <span className={`text-2xl font-bold ${cfg.text}`}>{val}</span>
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</span>
                        </div>
                    ))}
                </div>

                {/* ══ 2. Cards: peso + vacunas + ventas ══════════ */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <SummaryCard
                        icon="scale"       iconCls="text-secondary"  accent="border-secondary"
                        title="Hato total" value={kpis.total ?? 0}
                        sub={`Peso prom. ${kpis.peso_promedio ?? 0} kg`}
                    />
                    <SummaryCard
                        icon="vaccines"    iconCls="text-green-600"  accent="border-green-500"
                        title="Vacunas al día" value={kpis.vacunas_al_dia ?? 0}
                        sub={`${kpis.vacunas_pendientes ?? 0} con próxima vencida`}
                    />
                    <SummaryCard
                        icon="payments"    iconCls="text-primary"    accent="border-primary"
                        title="Ingresos ventas" value={COP(kpis.ventas_confirmadas)}
                        sub={`${kpis.ventas_total ?? 0} ventas en total`}
                        valueSmall
                    />
                    <SummaryCard
                        icon="pending_actions" iconCls="text-amber-500" accent="border-amber-400"
                        title="Órdenes pendientes" value={kpis.ordenes_pendientes ?? 0}
                        sub={`${kpis.ordenes_confirmadas ?? 0} confirmadas`}
                        onClick={() => router.visit(route('ventas.index'))}
                        badge={totalAlertasVenta > 0 ? totalAlertasVenta : null}
                    />
                </div>

                {/* ══ 3. Alertas sanitarias ══════════════════════ */}
                <AlertasDashboard alertas={alertas} totales={totales} tab={tab} />

                {/* ══ 4. RF-27: Evolución hato + Peso histórico ══ */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">

                    {/* Ingresos vs Salidas 12 meses (3/5) */}
                    <ChartCard className="xl:col-span-3" icon="trending_up"
                        title="Evolución mensual del hato"
                        sub="Animales ingresados vs. dados de baja (12 meses)"
                    >
                        {movData.length === 0 ? <EmptyChart /> : (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={movData} barCategoryGap="32%" margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="mes" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                                        formatter={(v, name) => [v, name === 'ingresos' ? 'Ingresos' : 'Salidas']}
                                    />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }}
                                        formatter={(v) => v === 'ingresos' ? 'Ingresos' : 'Salidas'} />
                                    <Bar dataKey="ingresos" fill="#16a34a" radius={[3, 3, 0, 0]} name="ingresos" />
                                    <Bar dataKey="salidas"  fill="#ef4444" radius={[3, 3, 0, 0]} name="salidas"  />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </ChartCard>

                    {/* Curva peso histórico — WeightChart del compañero (2/5) */}
                    <ChartCard className="xl:col-span-2" icon="monitor_weight"
                        title="Peso promedio histórico"
                        sub="kg promedio del hato por mes (12 meses)"
                    >
                        {pesoData.length === 0 ? <EmptyChart /> : (
                            <div className="h-[220px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={pesoData} margin={{ top: 8, right: 8, bottom: 0, left: -4 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                                        <XAxis dataKey="mes" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                        <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false}
                                            tickFormatter={(v) => `${v} kg`} width={52} />
                                        <Tooltip content={<WeightTooltip />} />
                                        <Line
                                            type="monotone" dataKey="peso" name="Peso"
                                            stroke="rgb(34,107,66)" strokeWidth={2.5}
                                            dot={{ r: 4, fill: 'rgb(34,107,66)', strokeWidth: 0 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </ChartCard>
                </div>

                {/* ══ 5. Ventas mensuales + Distribución hato ════ */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">

                    {/* Ventas mensuales COP (3/5) */}
                    <ChartCard className="xl:col-span-3" icon="bar_chart"
                        title="Ventas mensuales"
                        sub="Solo transacciones aprobadas (6 meses)"
                    >
                        {ventaData.length === 0 ? <EmptyChart text="Sin ventas aprobadas aún" /> : (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={ventaData} barCategoryGap="32%" margin={{ top: 4, right: 4, left: 12, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="mes" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false}
                                        tickFormatter={formatAxisCOP} />
                                    <Tooltip
                                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                                        formatter={(v, name) => name === 'total' ? [COP(v), 'Total COP'] : [v, 'Órdenes']}
                                    />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }}
                                        formatter={(v) => v === 'total' ? 'Total COP' : 'Órdenes'} />
                                    <Bar dataKey="total"    fill="var(--color-primary)" radius={[3, 3, 0, 0]} name="total"    />
                                    <Bar dataKey="cantidad" fill="#93c5fd"               radius={[3, 3, 0, 0]} name="cantidad" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </ChartCard>

                    {/* Pie: estado + categoría apilados (2/5) */}
                    <div className="flex flex-col gap-4 xl:col-span-2">

                        {/* Pie status */}
                        <ChartCard icon="donut_large" title="Hato por estado" className="flex-1">
                            {estadoData.length === 0 ? <EmptyChart h={200} /> : (
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart margin={{ top: 16, right: 8, bottom: 16, left: 8 }}>
                                        <Pie data={estadoData} cx="50%" cy="50%"
                                            innerRadius={34} outerRadius={54}
                                            paddingAngle={3} dataKey="value"
                                            shape={renderPieSector}
                                            label={({ name, percent }) => percent > 0.07 ? `${name} ${(percent * 100).toFixed(0)}%` : null}
                                            labelLine={false}
                                        />
                                        <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }}
                                            formatter={(v) => [`${v} animales`, '']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </ChartCard>

                        {/* Pie categoría */}
                        <ChartCard icon="category" title="Hato por categoría" className="flex-1">
                            {catData.length === 0 ? <EmptyChart h={200} /> : (
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart margin={{ top: 16, right: 8, bottom: 16, left: 8 }}>
                                        <Pie data={catData} cx="50%" cy="50%"
                                            innerRadius={34} outerRadius={54}
                                            paddingAngle={3} dataKey="value"
                                            shape={renderPieSector}
                                            label={({ name, percent }) => percent > 0.07 ? `${name} ${(percent * 100).toFixed(0)}%` : null}
                                            labelLine={false}
                                        />
                                        <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }}
                                            formatter={(v) => [`${v} animales`, '']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </ChartCard>
                    </div>
                </div>

                {/* ══ 6. Órdenes recientes ══════════════════════ */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[17px] text-secondary">receipt_long</span>
                            <span className="text-sm font-semibold text-gray-700">Órdenes recientes</span>
                            {ordenesRecientes.length > 0 && (
                                <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                    {ordenesRecientes.length}
                                </span>
                            )}
                        </div>
                        <button onClick={() => router.visit(route('ventas.index'))}
                            className="text-xs font-semibold text-primary hover:underline">
                            Ver todas
                        </button>
                    </div>

                    {ordenesRecientes.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-8 text-gray-300">
                            <span className="material-symbols-outlined text-4xl">inbox</span>
                            <p className="text-xs">Sin órdenes pendientes</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                        {['Ref.','Comprador','Animales','Subtotal','Estado negocio','Pago','Fecha'].map((h) => (
                                            <th key={h} className="px-4 py-2.5">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordenesRecientes.map((o) => {
                                        const bs = BSTATUS[o.bussiness_status] ?? { cls: 'bg-gray-100 text-gray-500', label: o.bussiness_status };
                                        return (
                                            <tr key={o.id} className="border-b border-gray-50 transition hover:bg-gray-50">
                                                <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{o.reference ?? `#${o.id}`}</td>
                                                <td className="px-4 py-2.5 font-medium text-gray-800">{o.comprador}</td>
                                                <td className="max-w-[160px] truncate px-4 py-2.5 text-xs text-gray-500">{o.animales}</td>
                                                <td className="px-4 py-2.5 font-semibold text-gray-800">{COP(o.subtotal)}</td>
                                                <td className="px-4 py-2.5">
                                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${bs.cls}`}>{bs.label}</span>
                                                </td>
                                                <td className="px-4 py-2.5">
                                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                        o.payment_status === 'Aprobado'  ? 'bg-green-50 text-green-700' :
                                                        o.payment_status === 'Rechazado' ? 'bg-red-50 text-red-600'   :
                                                        'bg-gray-100 text-gray-500'
                                                    }`}>{o.payment_status}</span>
                                                </td>
                                                <td className="px-4 py-2.5 tabular-nums text-xs text-gray-400">{o.fecha}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>{/* /space-y-4 */}
        </AuthenticatedLayout>
    );
}

/* ── Sub-componentes ──────────────────────────────────────── */

const SummaryCard = ({ icon, title, value, sub, accent, iconCls, onClick, valueSmall, badge }) => (
    <div onClick={onClick}
        className={`relative rounded-xl border-l-4 bg-white p-4 shadow-sm ${accent} ${onClick ? 'cursor-pointer transition hover:shadow-md' : ''}`}
    >
        {badge != null && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow">
                {badge}
            </span>
        )}
        <div className="flex items-start gap-3">
            <span className={`material-symbols-outlined mt-0.5 text-[22px] ${iconCls}`}>{icon}</span>
            <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{title}</p>
                <p className={`font-bold text-gray-800 ${valueSmall ? 'text-base leading-tight' : 'text-2xl'}`}>{value}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-gray-400">{sub}</p>
            </div>
        </div>
    </div>
);

const ChartCard = ({ icon, title, sub, children, className = '' }) => (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}>
        <div className="mb-0.5 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-secondary">{icon}</span>
            <span className="text-[13px] font-semibold text-gray-700">{title}</span>
        </div>
        {sub && <p className="mb-3 text-[11px] text-gray-400">{sub}</p>}
        {children}
    </div>
);

const EmptyChart = ({ h = 220, text = 'Sin datos aún' }) => (
    <div className={`flex flex-col items-center justify-center gap-2 text-gray-300`} style={{ height: h }}>
        <span className="material-symbols-outlined text-4xl">bar_chart</span>
        <p className="text-xs">{text}</p>
    </div>
);
