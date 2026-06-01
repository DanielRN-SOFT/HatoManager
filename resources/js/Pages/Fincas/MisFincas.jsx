import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

import ConfirmDialog from '@/Components/Fincas/ConfirmDialog';
import FarmCard from '@/Components/Fincas/FarmCard';
import FarmForm from '@/Components/Fincas/FarmForm';
import Flash from '@/Components/Shared/Flash';

export default function MisFincas({ farms }) {
    const [showForm, setShowForm] = useState(false);
    const [editingFarm, setEditingFarm] = useState(null);
    const [confirmFarm, setConfirmFarm] = useState(null);

    const { delete: destroy } = useForm();

    function handleEdit(farm) {
        setEditingFarm(farm);
        setShowForm(false);
    }

    function handleDeactivate(farm) {
        setConfirmFarm(farm);
    }

    function confirmDeactivate() {
        destroy(route('farms.destroy', confirmFarm.id), {
            preserveScroll: true,
            onSuccess: () => setConfirmFarm(null),
            onError: () => setConfirmFarm(null),
        });
    }

    const activeFarms = farms.filter((f) => !f.deleted_at);
    const inactiveFarms = farms.filter((f) => f.deleted_at);

    return (
        <AuthenticatedLayout>
            <Head title="Mis Fincas" />

            <div className="mx-auto max-w-4xl px-4 py-8">
                {/* Título */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-on-surface">
                            Mis Fincas
                        </h1>
                        <p className="text-sm text-on-surface-variant">
                            {activeFarms.length} activa
                            {activeFarms.length !== 1 ? 's' : ''}
                            {inactiveFarms.length > 0 &&
                                ` · ${inactiveFarms.length} inactiva${inactiveFarms.length !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                    {!showForm && !editingFarm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add
                            </span>
                            Nueva Finca
                        </button>
                    )}
                </div>

                <Flash />

                {/* Formulario crear */}
                {showForm && (
                    <div className="mb-6">
                        <FarmForm onCancel={() => setShowForm(false)} />
                    </div>
                )}

                {/* Formulario editar */}
                {editingFarm && (
                    <div className="mb-6">
                        <FarmForm
                            farm={editingFarm}
                            onCancel={() => setEditingFarm(null)}
                        />
                    </div>
                )}

                {/* Sin fincas */}
                {farms.length === 0 && !showForm && (
                    <div className="rounded-xl border border-dashed border-outline-variant py-16 text-center">
                        <span className="material-symbols-outlined mb-2 text-[40px] text-on-surface-variant/40">
                            forest
                        </span>
                        <p className="text-sm text-on-surface-variant">
                            Aún no tienes fincas registradas.
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-3 text-sm text-primary underline-offset-2 hover:underline"
                        >
                            Crear mi primera finca
                        </button>
                    </div>
                )}

                {/* Fincas activas */}
                {activeFarms.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {activeFarms.map((farm) => (
                            <FarmCard
                                key={farm.id}
                                farm={farm}
                                onEdit={handleEdit}
                                onDeactivate={handleDeactivate}
                            />
                        ))}
                    </div>
                )}

                {/* Fincas inactivas */}
                {inactiveFarms.length > 0 && (
                    <div className="mt-8">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant/60">
                            Inactivas
                        </p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {inactiveFarms.map((farm) => (
                                <FarmCard
                                    key={farm.id}
                                    farm={farm}
                                    onEdit={handleEdit}
                                    onDeactivate={handleDeactivate}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal confirmación */}
            {confirmFarm && (
                <ConfirmDialog
                    farm={confirmFarm}
                    onConfirm={confirmDeactivate}
                    onCancel={() => setConfirmFarm(null)}
                />
            )}
        </AuthenticatedLayout>
    );
}
