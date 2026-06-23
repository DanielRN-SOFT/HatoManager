import ConfirmDialog from '@/Components/Fincas/ConfirmDialog';
import FarmCard from '@/Components/Fincas/FarmCard';
import FarmForm from '@/Components/Fincas/FarmForm';
import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function MisFincas({ farms }) {
    const [showForm, setShowForm] = useState(false);
    const [editingFarm, setEditingFarm] = useState(null);
    const [confirmFarm, setConfirmFarm] = useState(null);

    const { delete: destroy } = useForm();

    function handleEdit(farm) {
        setEditingFarm(farm);
    }

    function handleRestore(farm) {
        router.put(route('farms.restore', farm.id));
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

            <div>
                {/* Título */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-container">
                            <span className="material-symbols-outlined text-[24px] text-on-primary">
                                forest
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                {activeFarms.length} activa
                                {activeFarms.length !== 1 ? 's' : ''}
                                {inactiveFarms.length > 0 &&
                                    ` · ${inactiveFarms.length} inactiva${inactiveFarms.length !== 1 ? 's' : ''}`}
                            </p>
                            <h1 className="text-2xl font-bold text-on-surface">
                                Mis Fincas
                            </h1>
                            <p className="mt-0.5 text-xs text-on-surface-variant">
                                Administra los fincas disponibles para administrar el sistema
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95 sm:w-auto sm:justify-start"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            add_circle
                        </span>
                        Nueva Finca
                    </button>
                </div>
                <Flash />

                {/* Sin fincas */}
                {farms.length === 0 && (
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
                                onRestore={handleRestore}
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
                                    onRestore={handleRestore}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal crear/editar */}
            <Modal
                show={showForm || !!editingFarm}
                maxWidth="2xl"
                onClose={() => {
                    setShowForm(false);
                    setEditingFarm(null);
                }}
            >
                <div className="p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-container">
                            <span className="material-symbols-outlined text-[18px] text-on-primary">
                                forest
                            </span>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-on-surface">
                                {editingFarm
                                    ? `Editando: ${editingFarm.name}`
                                    : 'Nueva Finca'}
                            </h2>
                            <p className="text-xs text-on-surface-variant">
                                {editingFarm
                                    ? 'Modifica los datos de la finca'
                                    : 'Completa los datos para crear la finca'}
                            </p>
                        </div>
                    </div>
                    <FarmForm
                        farm={editingFarm}
                        hideTitle
                        onCancel={() => {
                            setShowForm(false);
                            setEditingFarm(null);
                        }}
                    />
                </div>
            </Modal>

            {/* Modal confirmar desactivar */}
            <Modal
                show={!!confirmFarm}
                maxWidth="sm"
                onClose={() => setConfirmFarm(null)}
            >
                <ConfirmDialog
                    farm={confirmFarm}
                    onConfirm={confirmDeactivate}
                    onCancel={() => setConfirmFarm(null)}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
