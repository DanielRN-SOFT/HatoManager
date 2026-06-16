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

            <div className="mx-auto max-w-[1440px] px-6 py-5">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                    {/* ---- Columna izquierda: galería + información ---- */}
                    <div className="lg:col-span-7">
                        {/* Galería */}
                        <AnimalesGaleria photos={photos} animal={animal} />

                        {/* Tabs: descripción / peso / salud */}
                        {tabs.length > 0 && (
                            <div className="mt-8">
                                <TitulosTabs
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    tabs={tabs}
                                />

                                <div className="pt-6">
                                    {/* Descripción */}
                                    {activeTab === 'descripcion' && (
                                        <p className="text-sm leading-relaxed text-on-surface-variant">
                                            {animal.description}
                                        </p>
                                    )}

                                    {/* Peso */}
                                    <TabPeso
                                        weightRecords={weightRecords}
                                        activeTab={activeTab}
                                        formatDate={formatDate}
                                    />

                                    {/* Salud */}
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

                    {/* ---- Columna derecha: ficha de compra ---- */}
                    <div className="lg:col-span-5">
                        <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 lg:sticky lg:top-24">
                            {animal.animal_category && (
                                <span className="mb-3 inline-block rounded-full bg-surface-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                                    {animal.animal_category.name}
                                </span>
                            )}
                            <h1 className="text-3xl font-bold text-on-surface">
                                {animal.name}
                            </h1>
                            <p className="mt-1 text-sm text-on-surface-variant">
                                Arete N° {animal.ear_tag}
                            </p>

                            <div className="mt-5 flex items-baseline justify-between gap-3">
                                <span className="text-3xl font-extrabold text-primary">
                                    {formatearDinero(animal.price)}
                                </span>
                                {animal.publication_date && (
                                    <span className="text-right text-xs leading-tight text-on-surface-variant">
                                        Publicado
                                        <br />
                                        {formatDate(animal.publication_date)}
                                    </span>
                                )}
                            </div>

                            <div className="my-5 h-px bg-outline-variant" />

                            {/* Ficha técnica */}
                            <FichaTecnica animal={animal} />

                            {/* Finca */}
                            <Finca animal={animal} />

                            <div className="my-5 h-px bg-outline-variant" />

                            {/* CTA */}
                            <AccionesButton
                                setToast={setToast}
                                animal={animal}
                                cartItems={cartItems}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {toast && <ToastEcommerce toast={toast} />}
        </EcommerceLayout>
    );
}
