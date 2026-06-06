import Comercializacion from '@/Components/Animales/Show/Comercializacion';
import Header from '@/Components/Animales/Show/Header';
import HeroCard from '@/Components/Animales/Show/HeroCard';
import HistorialSanitario from '@/Components/Animales/Show/HistorialSanitario';
import InformacionGeneral from '@/Components/Animales/Show/InformacionGeneral';
import ProyeccionVenta from '@/Components/Animales/Show/ProyeccionVenta';
import SectionCard from '@/Components/Animales/Show/SectionCard';
import WeightChart from '@/Components/Animales/Show/WeightChart';
import WeightRow from '@/Components/Animales/Show/WeightRow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const STATUS_STYLES = {
    Activo: {
        cls: 'bg-green-50 text-green-700 border-green-200',
        dot: 'bg-green-500',
    },
    Inactivo: {
        cls: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-400',
    },
    Muerto: { cls: 'bg-red-50 text-red-600 border-red-200', dot: 'bg-red-500' },
    Reservado: {
        cls: 'bg-blue-50 text-blue-600 border-blue-200',
        dot: 'bg-blue-500',
    },
    Vendido: {
        cls: 'bg-purple-50 text-purple-600 border-purple-200',
        dot: 'bg-purple-500',
    },
};

function fmt(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

/* ─────────────────────────────────────────────
   Main Show Page
───────────────────────────────────────────── */
export default function Show({ animal }) {
    const statusInfo = STATUS_STYLES[animal.status] ?? {
        cls: 'bg-gray-100 text-gray-600 border-gray-200',
        dot: 'bg-gray-400',
    };

    const sortedWeights = [...(animal.weight_records ?? [])].sort(
        (a, b) => new Date(b.weight_date) - new Date(a.weight_date),
    );
    const lastWeight = sortedWeights[0]
        ? parseFloat(sortedWeights[0].weight)
        : null;
    const firstWeight =
        sortedWeights.length > 1
            ? parseFloat(sortedWeights[sortedWeights.length - 1].weight)
            : null;
    const gain =
        lastWeight && firstWeight
            ? (lastWeight - firstWeight).toFixed(1)
            : null;

    return (
        <AuthenticatedLayout>
            <Head title={`${animal.name} · Ficha`} />

            {/* ── Page Header ── */}
            <Header animal={animal} />

            <div className="space-y-5">
                {/* ── Hero Card ── */}
                <HeroCard
                    animal={animal}
                    statusInfo={statusInfo}
                    fmt={fmt}
                    lastWeight={lastWeight}
                    gain={gain}
                />

                {/* ── Two col layout ── */}
                <InformacionGeneral fmt={fmt} animal={animal} />

                {/* ── Gráfica de peso ── */}
                <SectionCard
                    icon="show_chart"
                    title="Evolución de peso"
                    accent="border-secondary"
                    action={
                        lastWeight && animal.target_weight ? (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                                Objetivo: {animal.target_weight} kg
                                <span className="ml-1 font-semibold text-gray-600">
                                    (
                                    {(
                                        (lastWeight / animal.target_weight) *
                                        100
                                    ).toFixed(0)}
                                    % alcanzado)
                                </span>
                            </div>
                        ) : null
                    }
                >
                    <WeightChart
                        fmt={fmt}
                        records={animal.weight_records}
                        targetWeight={animal.target_weight}
                    />
                </SectionCard>

                {/* ── Registros de peso ── */}
                {sortedWeights.length > 0 && (
                    <SectionCard
                        icon="monitor_weight"
                        title={`Pesajes · ${sortedWeights.length} registros`}
                    >
                        <div className="divide-y divide-gray-50">
                            {sortedWeights.map((r, i) => (
                                <WeightRow
                                    fmt={fmt}
                                    key={r.id}
                                    record={r}
                                    isLast={i === sortedWeights.length - 1}
                                />
                            ))}
                        </div>
                    </SectionCard>
                )}

                {/* ── Historial sanitario ── */}
                <HistorialSanitario animal={animal} fmt={fmt} />

                <ProyeccionVenta proyeccion={animal.proyeccion} fmt={fmt} />

                {/* ── Comercialización ── */}
                <Comercializacion
                    animal={animal}
                    fmt={fmt}
                    statusInfo={statusInfo}
                />
            </div>
        </AuthenticatedLayout>
    );
}
