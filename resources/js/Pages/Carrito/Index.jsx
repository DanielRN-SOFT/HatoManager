import EcommerceLayout from '@/Layouts/EcommerceLayout';
import formatearDinero from '@/helpers/formatearDinero';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/* ── Tarjeta de un ítem dentro del grupo ─────────────────────── */
function CartItemRow({ item, onRemove }) {
    const { animal, price_snapshot, disponible } = item;

    return (
        <div
            className={`flex gap-4 rounded-xl border p-4 transition-all ${
                !disponible
                    ? 'border-error/40 bg-error-container/20'
                    : 'border-outline-variant bg-surface-container-lowest'
            }`}
        >
            {/* Foto */}
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                {animal?.photo ? (
                    <img
                        src={animal.photo}
                        alt={animal.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-outline">
                            pets
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between gap-1">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="font-semibold text-on-surface">
                            {animal?.name ?? 'Animal eliminado'}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                            {animal?.breed_name} · {animal?.category_name}
                            {animal?.weight ? ` · ${animal.weight} kg` : ''}
                        </p>
                    </div>

                    {/* Botón eliminar */}
                    <button
                        onClick={() => onRemove(item.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-outline transition-colors hover:bg-error-container hover:text-error"
                        aria-label="Eliminar del carrito"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            delete
                        </span>
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">
                        {formatearDinero(price_snapshot)}
                    </span>

                    {/* Alerta si ya no está disponible */}
                    {!disponible && (
                        <span className="flex items-center gap-1 rounded-full bg-error-container px-2 py-0.5 text-[11px] font-semibold text-error">
                            <span className="material-symbols-outlined text-[13px]">
                                warning
                            </span>
                            Ya no disponible
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── Grupo por ganadero ──────────────────────────────────────── */
function GanaderoGroup({ grupo, onRemove }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface">
            {/* Header del ganadero */}
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container px-5 py-3">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                        agriculture
                    </span>
                    <span className="font-semibold text-on-surface">
                        {grupo.farm.name}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                        {grupo.farm.city}, {grupo.farm.department}
                    </span>
                </div>
                <span className="text-sm font-bold text-primary">
                    Subtotal: {formatearDinero(grupo.subtotal)}
                </span>
            </div>

            {/* Ítems */}
            <div className="flex flex-col gap-3 p-4">
                {grupo.items.map((item) => (
                    <CartItemRow
                        key={item.id}
                        item={item}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </div>
    );
}

/* ── Página principal ────────────────────────────────────────── */
export default function CartIndex({ grupos, total, count }) {
    const { props } = usePage();
    const [localGrupos, setLocalGrupos] = useState(grupos);
    const [hasUnavailable, setHasUnavailable] = useState(false);

    // Detectar si hay ítems no disponibles al cargar
    useEffect(() => {
        const hayNoDisponibles = grupos
            .flatMap((g) => g.items)
            .some((i) => !i.disponible);
        setHasUnavailable(hayNoDisponibles);
    }, [grupos]);

    // Polling cada 30s para detectar animales retirados de venta
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch('/carrito/sync');
                const data = await res.json();

                const noDisponibles = data.items
                    .filter((i) => !i.disponible)
                    .map((i) => i.item_id);

                if (noDisponibles.length > 0) {
                    setHasUnavailable(true);
                    // Marcar visualmente los ítems afectados
                    setLocalGrupos((prev) =>
                        prev.map((g) => ({
                            ...g,
                            items: g.items.map((item) =>
                                noDisponibles.includes(item.id)
                                    ? { ...item, disponible: false }
                                    : item,
                            ),
                        })),
                    );
                }
            } catch (_) {
                // silencioso — no interrumpir la UX
            }
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    // Sincronizar localGrupos cuando Inertia actualiza los props
    useEffect(() => {
        setLocalGrupos(grupos);
    }, [grupos]);

    function handleRemove(itemId) {
        router.delete(`/carrito/${itemId}`, {
            preserveScroll: true,
            onSuccess: () => {
                setLocalGrupos((prev) =>
                    prev
                        .map((g) => ({
                            ...g,
                            items: g.items.filter((i) => i.id !== itemId),
                        }))
                        .filter((g) => g.items.length > 0),
                );
            },
        });
    }

    const isEmpty = localGrupos.length === 0;

    return (
        <EcommerceLayout>
            <Head title="Mi carrito — HatoManager" />
            <main className="mx-auto max-w-[900px] px-4 py-10 md:px-8">
                {/* Encabezado */}
                <div className="mb-8 flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-primary">
                        shopping_cart
                    </span>
                    <div>
                        <h1 className="text-2xl font-bold text-on-surface">
                            Mi carrito
                        </h1>
                        <p className="text-sm text-on-surface-variant">
                            {count} {count === 1 ? 'animal' : 'animales'}{' '}
                            agregados
                        </p>
                    </div>
                </div>

                {/* Alerta global si hay ítems no disponibles */}
                {hasUnavailable && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-error/40 bg-error-container/30 px-4 py-3 text-sm text-error">
                        <span className="material-symbols-outlined mt-0.5 text-[18px]">
                            warning
                        </span>
                        <p>
                            Uno o más animales en tu carrito ya no están
                            disponibles para la venta. Revisa los ítems marcados
                            y elimínalos antes de continuar.
                        </p>
                    </div>
                )}

                {isEmpty ? (
                    /* Carrito vacío */
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest py-24 text-on-surface-variant">
                        <span className="material-symbols-outlined text-6xl text-outline">
                            remove_shopping_cart
                        </span>
                        <p className="text-base font-medium">
                            Tu carrito está vacío
                        </p>
                        <button
                            onClick={() => router.visit('/sales')}
                            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-on-primary transition-all hover:bg-primary-container"
                        >
                            Ver animales en venta
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                        {/* Lista de grupos */}
                        <div className="flex flex-1 flex-col gap-4">
                            {localGrupos.map((grupo) => (
                                <GanaderoGroup
                                    key={grupo.farm.id}
                                    grupo={grupo}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </div>

                        {/* Resumen lateral */}
                        <div className="w-full shrink-0 lg:w-72">
                            <div className="sticky top-24 rounded-2xl border border-outline-variant bg-surface p-5">
                                <h2 className="mb-4 font-bold text-on-surface">
                                    Resumen del pedido
                                </h2>

                                {/* Subtotales por ganadero */}
                                <div className="mb-4 flex flex-col gap-2 border-b border-outline-variant pb-4">
                                    {localGrupos.map((grupo) => (
                                        <div
                                            key={grupo.farm.id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span className="truncate text-on-surface-variant">
                                                {grupo.farm.name}
                                            </span>
                                            <span className="shrink-0 font-medium text-on-surface">
                                                {formatearDinero(
                                                    grupo.subtotal,
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Total general */}
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="font-bold text-on-surface">
                                        Total general
                                    </span>
                                    <span className="text-lg font-bold text-primary">
                                        {formatearDinero(total)}
                                    </span>
                                </div>

                                <button
                                    disabled={hasUnavailable}
                                    className={`w-full rounded-xl py-3 text-sm font-bold transition-all ${
                                        hasUnavailable
                                            ? 'cursor-not-allowed bg-surface-container text-outline'
                                            : 'bg-primary text-on-primary hover:bg-primary-container'
                                    }`}
                                >
                                    Finalizar compra
                                </button>

                                {hasUnavailable && (
                                    <p className="mt-2 text-center text-xs text-error">
                                        Elimina los ítems no disponibles para
                                        continuar
                                    </p>
                                )}

                                <button
                                    onClick={() => router.visit('/sales')}
                                    className="mt-3 w-full rounded-xl border border-outline-variant py-2.5 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container"
                                >
                                    Seguir comprando
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </EcommerceLayout>
    );
}
