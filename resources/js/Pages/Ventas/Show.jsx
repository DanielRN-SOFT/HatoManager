import ToastEcommerce from '@/Components/ToastEcommerce';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const STATUS_STYLES = {
    Publicado: 'bg-primary text-on-primary',
    Reservado: 'bg-amber-500 text-white',
};

function formatCOP(value) {
    if (!value) return 'Precio a consultar';
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(value);
}

function formatDate(value) {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function getAge(birthDate) {
    if (!birthDate) return '—';
    const birth = new Date(birthDate);
    const now = new Date();
    let months =
        (now.getFullYear() - birth.getFullYear()) * 12 +
        (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months -= 1;
    if (months < 1) return 'Recién nacido';
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    const parts = [];
    if (years > 0) parts.push(`${years} año${years > 1 ? 's' : ''}`);
    if (remMonths > 0)
        parts.push(`${remMonths} mes${remMonths > 1 ? 'es' : ''}`);
    return parts.join(' y ');
}

export default function AnimalDetalle({ animal, cartItems = [] }) {
    const photos = animal.photos?.length ? animal.photos : [];
    const [activePhoto, setActivePhoto] = useState(0);
    const [toast, setToast] = useState(null);

    const { auth } = usePage().props;
    const esVeterinario = auth.user && auth.roles?.includes('veterinario');
    const puedeComprar = !esVeterinario;
    const enCarrito = cartItems.includes(animal.id);
    const reservado = animal.status === 'Reservado';

    const weightRecords = [...(animal.weight_records || [])].sort(
        (a, b) => new Date(b.weight_date) - new Date(a.weight_date),
    );
    const healthRecords = [...(animal.health_records || [])].sort(
        (a, b) => new Date(b.applied_at) - new Date(a.applied_at),
    );

    const latestWeight = weightRecords[0];
    const firstWeight = weightRecords[weightRecords.length - 1];
    const weightGain =
        latestWeight && firstWeight && latestWeight.id !== firstWeight.id
            ? Number(latestWeight.weight) - Number(firstWeight.weight)
            : null;

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    function handleCart() {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        router.post(
            '/carrito/agregar',
            { animal_id: animal.id },
            {
                preserveScroll: true,
                onSuccess: () =>
                    showToast(`${animal.name} agregado al carrito`),
                onError: () =>
                    showToast('No se pudo agregar al carrito', 'error'),
            },
        );
    }

    return (
        <EcommerceLayout>
            <Head title={animal.name} />

            <div className="mx-auto max-w-[1440px] px-6 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-1 text-sm text-on-surface-variant">
                    <Link
                        href="/catalogo"
                        className="no-underline transition-colors hover:text-primary"
                    >
                        Catálogo
                    </Link>
                    <span className="material-symbols-outlined text-base">
                        chevron_right
                    </span>
                    <span className="font-medium text-on-surface">
                        {animal.name}
                    </span>
                </nav>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* ---- Columna izquierda: galería + detalle ---- */}
                    <div className="lg:col-span-7">
                        {/* Galería */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container">
                            {photos.length > 0 ? (
                                <img
                                    src={photos[activePhoto]}
                                    alt={animal.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-on-surface-variant">
                                    <span className="material-symbols-outlined text-6xl">
                                        image_not_supported
                                    </span>
                                </div>
                            )}

                            <span
                                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                                    STATUS_STYLES[animal.status] ||
                                    'bg-surface text-on-surface'
                                }`}
                            >
                                {animal.status}
                            </span>
                        </div>

                        {photos.length > 1 && (
                            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                                {photos.map((photo, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActivePhoto(i)}
                                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                                            i === activePhoto
                                                ? 'border-primary'
                                                : 'border-transparent'
                                        }`}
                                    >
                                        <img
                                            src={photo}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Descripción */}
                        {animal.description && (
                            <div className="mt-8">
                                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-on-surface">
                                    Descripción
                                </h2>
                                <p className="text-sm leading-relaxed text-on-surface-variant">
                                    {animal.description}
                                </p>
                            </div>
                        )}

                        {/* Historial de peso */}
                        {weightRecords.length > 0 && (
                            <div className="mt-8">
                                <div className="mb-3 flex items-center justify-between">
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-on-surface">
                                        Historial de Peso
                                    </h2>
                                    {weightGain !== null && (
                                        <span
                                            className={`flex items-center gap-1 text-sm font-bold ${
                                                weightGain >= 0
                                                    ? 'text-primary'
                                                    : 'text-on-surface-variant'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-base">
                                                {weightGain >= 0
                                                    ? 'trending_up'
                                                    : 'trending_down'}
                                            </span>
                                            {weightGain >= 0 ? '+' : ''}
                                            {weightGain} kg
                                        </span>
                                    )}
                                </div>
                                <div className="overflow-hidden rounded-2xl border border-outline-variant">
                                    <table className="w-full text-sm">
                                        <thead className="bg-surface-container-highest text-xs uppercase tracking-wider text-on-surface-variant">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-bold">
                                                    Fecha
                                                </th>
                                                <th className="px-4 py-3 text-right font-bold">
                                                    Peso
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {weightRecords.map((w, i) => (
                                                <tr
                                                    key={w.id}
                                                    className={
                                                        i % 2 === 0
                                                            ? 'bg-surface'
                                                            : 'bg-surface-container'
                                                    }
                                                >
                                                    <td className="px-4 py-3 text-on-surface-variant">
                                                        {formatDate(
                                                            w.weight_date,
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-semibold text-on-surface">
                                                        {w.weight} kg
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Historial sanitario */}
                        {healthRecords.length > 0 && (
                            <div className="mt-8">
                                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-on-surface">
                                    Historial Sanitario
                                </h2>
                                <div className="flex flex-col gap-3">
                                    {healthRecords.map((h) => (
                                        <div
                                            key={h.id}
                                            className="rounded-2xl border border-outline-variant p-4"
                                        >
                                            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                                    {h.type}
                                                </span>
                                                <span className="text-xs text-on-surface-variant">
                                                    {formatDate(h.applied_at)}
                                                </span>
                                            </div>
                                            {h.product && (
                                                <p className="text-sm font-semibold text-on-surface">
                                                    {h.product}
                                                    {h.dose
                                                        ? ` · ${h.dose}`
                                                        : ''}
                                                </p>
                                            )}
                                            {h.notes && (
                                                <p className="mt-1 text-sm text-on-surface-variant">
                                                    {h.notes}
                                                </p>
                                            )}
                                            {h.next_date && (
                                                <p className="mt-2 flex items-center gap-1 text-xs text-on-surface-variant">
                                                    <span className="material-symbols-outlined text-sm">
                                                        event_repeat
                                                    </span>
                                                    Próxima aplicación:{' '}
                                                    {formatDate(h.next_date)}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ---- Columna derecha: ficha / compra ---- */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-24">
                            {animal.animal_category && (
                                <span className="mb-2 inline-block rounded-full bg-surface-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                                    {animal.animal_category.name}
                                </span>
                            )}
                            <h1 className="mb-1 text-3xl font-bold text-on-surface">
                                {animal.name}
                            </h1>
                            <p className="mb-6 text-sm text-on-surface-variant">
                                Arete N° {animal.ear_tag}
                            </p>

                            <div className="mb-6 text-3xl font-extrabold text-primary">
                                {formatCOP(animal.price)}
                            </div>

                            {/* Ficha técnica */}
                            <div className="mb-6 grid grid-cols-2 gap-4 rounded-2xl border border-outline-variant p-5">
                                <Spec
                                    icon="pets"
                                    label="Raza"
                                    value={animal.breed?.name || '—'}
                                />
                                <Spec
                                    icon={
                                        animal.sex === 'Macho'
                                            ? 'male'
                                            : 'female'
                                    }
                                    label="Sexo"
                                    value={animal.sex || '—'}
                                />
                                <Spec
                                    icon="cake"
                                    label="Edad"
                                    value={getAge(animal.birth_date)}
                                />
                                <Spec
                                    icon="monitor_weight"
                                    label="Peso objetivo"
                                    value={
                                        animal.target_weight
                                            ? `${animal.target_weight} kg`
                                            : '—'
                                    }
                                />
                            </div>

                            {/* Finca */}
                            {animal.farm && (
                                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-surface-container-highest p-4">
                                    <span className="material-symbols-outlined text-primary">
                                        home_pin
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-on-surface">
                                            {animal.farm.name}
                                        </p>
                                        {animal.farm.department && (
                                            <p className="text-xs text-on-surface-variant">
                                                {animal.farm.department}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Antecedentes médicos */}
                            {animal.previous_diseases && (
                                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-outline-variant bg-surface-container p-4">
                                    <span className="material-symbols-outlined text-on-surface-variant">
                                        info
                                    </span>
                                    <div>
                                        <p className="mb-1 text-sm font-bold text-on-surface">
                                            Antecedentes médicos
                                        </p>
                                        <p className="text-sm text-on-surface-variant">
                                            {animal.previous_diseases}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Fecha de publicación */}
                            {animal.publication_date && (
                                <p className="mb-6 flex items-center gap-1 text-xs text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm">
                                        calendar_today
                                    </span>
                                    Publicado el{' '}
                                    {formatDate(animal.publication_date)}
                                </p>
                            )}

                            {/* CTA */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                {reservado ? (
                                    <button
                                        disabled
                                        className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-surface-container px-6 py-3 text-sm font-bold text-on-surface-variant"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            lock
                                        </span>
                                        Reservado
                                    </button>
                                ) : !puedeComprar ? (
                                    <button
                                        disabled
                                        className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-surface-container px-6 py-3 text-sm font-bold text-on-surface-variant"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            visibility
                                        </span>
                                        Solo visualización
                                    </button>
                                ) : enCarrito ? (
                                    <button
                                        disabled
                                        className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-bold text-primary"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            check_circle
                                        </span>
                                        En tu carrito
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleCart}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-on-primary transition-all hover:bg-primary-container active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            shopping_cart
                                        </span>
                                        Agregar al carrito
                                    </button>
                                )}
                                <button className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant px-6 py-3 text-sm font-medium text-on-surface-variant transition-colors hover:border-primary hover:text-primary">
                                    <span className="material-symbols-outlined text-[20px]">
                                        favorite
                                    </span>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {toast && <ToastEcommerce toast={toast} />}
        </EcommerceLayout>
    );
}

function Spec({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">
                {icon}
            </span>
            <div>
                <p className="text-xs text-on-surface-variant">{label}</p>
                <p className="text-sm font-semibold text-on-surface">{value}</p>
            </div>
        </div>
    );
}
