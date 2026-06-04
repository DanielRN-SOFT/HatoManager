import HealthRow from '@/Components/Animales/Show/HealthRow';
import InfoRow from '@/Components/Animales/Show/InfoRow';
import SectionCard from '@/Components/Animales/Show/SectionCard';
import StatBadge from '@/Components/Animales/Show/StatBadge';
import WeightChart from '@/Components/Animales/Show/WeightChart';
import WeightRow from '@/Components/Animales/Show/WeightRow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { SiSwisscows } from 'react-icons/si';

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const SEX_LABELS = {
    M: { label: 'Macho', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    H: { label: 'Hembra', cls: 'bg-pink-50 text-pink-700 border-pink-200' },
};

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

function age(dateStr) {
    if (!dateStr) return '—';
    const birth = new Date(dateStr);
    const now = new Date();
    const months =
        (now.getFullYear() - birth.getFullYear()) * 12 +
        (now.getMonth() - birth.getMonth());
    if (months < 12) return `${months} meses`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${years} a ${rem} m` : `${years} años`;
}

/* ─────────────────────────────────────────────
   Main Show Page
───────────────────────────────────────────── */
export default function Show({ animal }) {
    const sexInfo = SEX_LABELS[animal.sex] ?? {
        label: animal.sex,
        cls: 'bg-gray-100 text-gray-600 border-gray-200',
    };
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

    const vacunas = (animal.health_records ?? []).filter(
        (r) => r.type === 'vacuna',
    );
    const desparasitacion = (animal.health_records ?? []).filter(
        (r) => r.type === 'desparasitacion',
    );
    const otros = (animal.health_records ?? []).filter(
        (r) => !['vacuna', 'desparasitacion'].includes(r.type),
    );

    const [healthTab, setHealthTab] = useState('todos');

    const healthFiltered =
        healthTab === 'todos'
            ? (animal.health_records ?? [])
            : (animal.health_records ?? []).filter((r) => r.type === healthTab);

    return (
        <AuthenticatedLayout>
            <Head title={`${animal.name} · Ficha`} />

            {/* ── Page Header ── */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-2">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                        <SiSwisscows className="text-[24px] text-on-primary" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                            Ficha del animal
                        </p>
                        <h1 className="text-2xl font-bold text-on-surface">
                            {animal.name}
                            <span className="ml-2 rounded bg-green-50 px-2 py-0.5 text-base font-bold text-green-700">
                                #{animal.ear_tag}
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => router.visit(route('animals.index'))}
                        className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>
                        Volver
                    </button>
                    <button
                        onClick={() =>
                            router.visit(route('animals.edit', animal.id))
                        }
                        className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            edit
                        </span>
                        Editar
                    </button>
                </div>
            </div>

            <div className="space-y-5">
                {/* ── Hero Card ── */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-t-4 border-primary" />
                    <div className="flex flex-wrap items-start gap-6 p-5">
                        {/* Foto */}
                        <div className="shrink-0">
                            {animal.photo ? (
                                <img
                                    src={animal.photo}
                                    alt={animal.name}
                                    className="h-36 w-36 rounded-2xl object-cover shadow-md"
                                />
                            ) : (
                                <div className="flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-2xl bg-gray-100 text-gray-300 shadow-inner">
                                    <span className="material-symbols-outlined text-5xl">
                                        photo_camera
                                    </span>
                                    <span className="text-[10px]">
                                        Sin foto
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Datos principales */}
                        <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <span
                                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusInfo.cls}`}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`}
                                    />
                                    {animal.status}
                                </span>
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${sexInfo.cls}`}
                                >
                                    {sexInfo.label}
                                </span>
                                {animal.animal_category && (
                                    <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                                        {animal.animal_category.name}
                                    </span>
                                )}
                            </div>

                            {/* Stat badges */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <StatBadge
                                    icon="cake"
                                    label="Edad"
                                    value={age(animal.birth_date)}
                                    sub={fmt(animal.birth_date)}
                                />
                                <StatBadge
                                    icon="monitor_weight"
                                    label="Peso actual"
                                    value={
                                        lastWeight
                                            ? `${lastWeight.toFixed(1)} kg`
                                            : '—'
                                    }
                                    sub={
                                        gain ? `+${gain} kg ganados` : undefined
                                    }
                                />
                                <StatBadge
                                    icon="flag"
                                    label="Peso objetivo"
                                    value={
                                        animal.target_weight
                                            ? `${animal.target_weight} kg`
                                            : '—'
                                    }
                                />
                                <StatBadge
                                    icon="payments"
                                    label="Precio/kg"
                                    value={
                                        animal.price_weight
                                            ? `$${parseFloat(animal.price_weight).toLocaleString('es-CO')}`
                                            : '—'
                                    }
                                    sub={
                                        animal.price
                                            ? `Val. total $${parseFloat(animal.price).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
                                            : undefined
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Two col layout ── */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Información general */}
                    <SectionCard icon="info" title="Información general">
                        <InfoRow
                            icon="pets"
                            label="Raza"
                            value={animal.breed?.name}
                        />
                        <InfoRow
                            icon="category"
                            label="Categoría"
                            value={animal.animal_category?.name}
                        />
                        <InfoRow
                            icon="home"
                            label="Corral"
                            value={animal.paddock?.name}
                        />
                        <InfoRow
                            icon="grass"
                            label="Tipo de pasto"
                            value={animal.paddock?.type_of_grass}
                        />
                        <InfoRow
                            icon="straighten"
                            label="Área corral"
                            value={
                                animal.paddock?.area
                                    ? `${animal.paddock.area} ha`
                                    : null
                            }
                        />
                        <InfoRow
                            icon="sell"
                            label="Arete"
                            value={`#${animal.ear_tag}`}
                        />
                        <InfoRow
                            icon="calendar_today"
                            label="Publicación"
                            value={fmt(animal.publication_date)}
                        />
                    </SectionCard>

                    {/* Descripción / Antecedentes */}
                    <SectionCard
                        icon="description"
                        title="Descripción y antecedentes"
                    >
                        {animal.description && (
                            <div className="mb-4">
                                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                    Descripción
                                </p>
                                <p className="text-sm leading-relaxed text-gray-700">
                                    {animal.description}
                                </p>
                            </div>
                        )}
                        {animal.previous_diseases && (
                            <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                                <div className="mb-1 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px] text-amber-500">
                                        warning
                                    </span>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">
                                        Enfermedades previas
                                    </p>
                                </div>
                                <p className="text-sm text-amber-800">
                                    {animal.previous_diseases}
                                </p>
                            </div>
                        )}
                        {animal.reason_to_death && (
                            <div className="mt-3 rounded-xl border border-red-100 bg-red-50 p-3">
                                <div className="mb-1 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px] text-red-500">
                                        skull
                                    </span>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600">
                                        Causa de muerte
                                    </p>
                                </div>
                                <p className="text-sm text-red-800">
                                    {animal.reason_to_death}
                                </p>
                            </div>
                        )}
                        {!animal.description &&
                            !animal.previous_diseases &&
                            !animal.reason_to_death && (
                                <p className="py-4 text-center text-sm text-gray-400">
                                    Sin información adicional
                                </p>
                            )}
                    </SectionCard>
                </div>

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
                <SectionCard
                    icon="health_and_safety"
                    title={`Historial sanitario · ${(animal.health_records ?? []).length} registros`}
                    accent="border-blue-500"
                    action={
                        <div className="flex gap-1">
                            {[
                                { key: 'todos', label: 'Todos' },
                                {
                                    key: 'vacuna',
                                    label: `Vacunas (${vacunas.length})`,
                                },
                                {
                                    key: 'desparasitacion',
                                    label: `Despar. (${desparasitacion.length})`,
                                },
                                {
                                    key: 'tratamiento',
                                    label: `Otros (${otros.length})`,
                                },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setHealthTab(tab.key)}
                                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                                        healthTab === tab.key
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    }
                >
                    {healthFiltered.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
                            <span className="material-symbols-outlined text-4xl">
                                health_and_safety
                            </span>
                            <p className="text-sm">Sin registros sanitarios</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {[...healthFiltered]
                                .sort(
                                    (a, b) =>
                                        new Date(b.applied_at) -
                                        new Date(a.applied_at),
                                )
                                .map((r) => (
                                    <HealthRow fmt={fmt} key={r.id} record={r} />
                                ))}
                        </div>
                    )}
                </SectionCard>

                {/* ── Comercialización ── */}
                <SectionCard
                    icon="storefront"
                    title="Comercialización"
                    accent="border-purple-500"
                >
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                Valor estimado
                            </p>
                            <p className="text-lg font-bold text-gray-800">
                                {animal.price
                                    ? `$${parseFloat(animal.price).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
                                    : '—'}
                            </p>
                            <p className="text-[11px] text-gray-400">COP</p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                Precio / kg
                            </p>
                            <p className="text-lg font-bold text-gray-800">
                                {animal.price_weight
                                    ? `$${parseFloat(animal.price_weight).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
                                    : '—'}
                            </p>
                            <p className="text-[11px] text-gray-400">COP/kg</p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                Publicación
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                                {fmt(animal.publication_date)}
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                Estado
                            </p>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusInfo.cls}`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`}
                                />
                                {animal.status}
                            </span>
                        </div>
                    </div>
                    {(animal.status === 'Vendido' ||
                        animal.status === 'Reservado') && (
                        <div className="mt-4 rounded-xl border border-purple-100 bg-purple-50 p-4">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-purple-500">
                                    info
                                </span>
                                <p className="text-sm text-purple-700">
                                    Este animal figura como{' '}
                                    <strong>{animal.status}</strong>. Revisa el
                                    módulo de ventas para más detalles de la
                                    transacción.
                                </p>
                            </div>
                        </div>
                    )}
                </SectionCard>
            </div>
        </AuthenticatedLayout>
    );
}
