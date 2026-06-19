// AnimalDetalle.jsx
import ToastEcommerce from '@/Components/ToastEcommerce';
import AccionesButton from '@/Components/Ventas/Show/AccionesButton';
import AnimalesGaleria from '@/Components/Ventas/Show/AnimalesGaleria';
import FichaTecnica from '@/Components/Ventas/Show/FichaTecnica';
import Finca from '@/Components/Ventas/Show/Finca';
import TabPeso from '@/Components/Ventas/Show/TabPeso';
import TabSanidad from '@/Components/Ventas/Show/TabSanidad';
import TitulosTabs from '@/Components/Ventas/Show/TitulosTabs';
import formatearDinero from '@/helpers/formatearDinero';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

function formatDate(value) {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

export default function AnimalDetalle({ animal, cartItems = [] }) {
    const photos = animal.photos?.length ? animal.photos : [];
    const [toast, setToast] = useState(null);

    const weightRecords = [...(animal.weight_records || [])].sort(
        (a, b) => new Date(b.weight_date) - new Date(a.weight_date),
    );
    const healthRecords = [...(animal.health_records || [])].sort(
        (a, b) => new Date(b.applied_at) - new Date(a.applied_at),
    );

    const hasDescripcion = !!animal.description;
    const hasPeso = weightRecords.length > 0;
    const hasSalud = healthRecords.length > 0 || !!animal.previous_diseases;

    const tabs = [
        hasDescripcion && { key: 'descripcion', label: 'Descripción' },
        hasPeso && { key: 'peso', label: `Peso (${weightRecords.length})` },
        hasSalud && {
            key: 'salud',
            label: healthRecords.length
                ? `Salud (${healthRecords.length})`
                : 'Salud',
        },
    ].filter(Boolean);

    const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? null);

    return (
        <EcommerceLayout>
            <Head title={animal.name} />

            <div className="mx-auto max-w-[1440px]">
                {/* ── Hero band: galería + detalle, compacta y centrada ── */}
                <div className="mx-auto max-w-6xl px-4 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Galería */}
                        <div className="lg:col-span-6">
                            <div className="pt-4 lg:py-8">
                                <AnimalesGaleria
                                    photos={photos}
                                    animal={animal}
                                />
                            </div>
                        </div>

                        {/* Panel de compra */}
                        <div className="lg:col-span-6">
                            <div className="lg:sticky lg:top-20 lg:self-start lg:py-4">
                                {/* Categoría */}
                                {animal.animal_category && (
                                    <div className="mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-primary">
                                            category
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                            {animal.animal_category.name}
                                        </span>
                                    </div>
                                )}

                                {/* Nombre + arete */}
                                <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-on-surface">
                                    {animal.name}
                                </h1>
                                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-base">
                                        tag
                                    </span>
                                    Arete N° {animal.ear_tag}
                                </p>

                                {/* Precio */}
                                <div className="bg-primary/8 mt-3 flex items-end justify-between gap-4 rounded-2xl px-5 py-4">
                                    <div>
                                        <p className="mb-0.5 text-xs font-medium uppercase tracking-wider text-primary/70">
                                            Precio de venta
                                        </p>
                                        <span className="text-3xl font-black text-primary">
                                            {formatearDinero(animal.price)}
                                        </span>
                                    </div>
                                    {animal.publication_date && (
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                                                Publicado
                                            </p>
                                            <p className="text-xs font-semibold text-on-surface-variant">
                                                {formatDate(
                                                    animal.publication_date,
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Separador */}
                                <div className="my-2 h-px bg-outline-variant" />

                                {/* Ficha técnica */}
                                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                    Ficha técnica
                                </p>
                                <FichaTecnica animal={animal} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Finca + Acciones, alineados bajo el panel de compra ── */}
                <div className="mx-auto max-w-6xl px-4 lg:px-8">
                    <div className="flex flex-col gap-3 pb-6">
                        <Finca animal={animal} />
                        <AccionesButton
                            setToast={setToast}
                            animal={animal}
                            cartItems={cartItems}
                        />
                    </div>
                </div>

                {/* ── Zona de información / tabs (ancho completo) ── */}
                {tabs.length > 0 && (
                    <div className="border-t border-outline-variant px-4 py-8 lg:px-8 lg:py-10">
                        <TitulosTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            tabs={tabs}
                        />

                        <div className="pt-6">
                            {activeTab === 'descripcion' && (
                                <p className="max-w-3xl text-base leading-relaxed text-on-surface-variant">
                                    {animal.description}
                                </p>
                            )}

                            <TabPeso
                                weightRecords={weightRecords}
                                activeTab={activeTab}
                                formatDate={formatDate}
                            />

                            <TabSanidad
                                activeTab={activeTab}
                                healthRecords={healthRecords}
                                animal={animal}
                                formatDate={formatDate}
                            />
                        </div>
                    </div>
                )}
            </div>

            {toast && <ToastEcommerce toast={toast} />}
        </EcommerceLayout>
    );
}
