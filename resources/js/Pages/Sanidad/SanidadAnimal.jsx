import Modal from '@/Components/Modal';
import AnimalSelector from '@/Components/Sanidad/AnimalSelector';
import ConfirmDeleteRecord from '@/Components/Sanidad/ConfirmDeleteRecord';
import HealthAlertPanel from '@/Components/Sanidad/HealthAlertPanel';
import HealthAlertsModal from '@/Components/Sanidad/HealthAlertsModal';
import HealthRecordModal from '@/Components/Sanidad/HealthRecordModal';
import HealthRecordRow from '@/Components/Sanidad/HealthRecordRow';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function SanidadAnimal({
    animals,
    selectedAnimal,
    records,
    alerts,
    allAlerts,
    alertsTotal,
    flash,
}) {
    const ESTADO_OPTS = [
        { value: '', label: 'Todos' },
        { value: 'activo', label: 'Activos' },
        { value: 'inactivo', label: 'Inactivos' },
    ];

    const [estado, setEstado] = useState("");
    const [modal, setModal] = useState({
        show: false,
        mode: 'create',
        record: null,
    });
    const [toDelete, setToDelete] = useState(null);
    const [showAlertsModal, setShowAlertsModal] = useState(false);

    function openCreate() {
        setModal({ show: true, mode: 'create', record: null });
    }

    function openEdit(record) {
        setModal({ show: true, mode: 'edit', record });
    }

    function closeModal() {
        setModal({ show: false, mode: 'create', record: null });
    }

    function handleDelete(record) {
        setToDelete(record);
    }

    function confirmDelete() {
        router.delete(route('health.destroy', toDelete.id), {
            preserveScroll: true,
            onSuccess: () => setToDelete(null),
        });
    }
    // Filtro de estado en frontend
    const rows = (records.data ?? []).filter((r) => {
        if (estado === 'activo') return !r.deleted_at;
        if (estado === 'inactivo') return !!r.deleted_at;
        return true;
    });

    return (
        <AuthenticatedLayout>
            <Head title="Sanidad Animal" />

            <div>
                {/* Flash */}
                <Flash flash={flash} />

                {/* Alertas*/}
                <HealthAlertPanel
                    alerts={alerts}
                    allAlerts={allAlerts}
                    alertsTotal={alertsTotal}
                    onVerTodas={() => setShowAlertsModal(true)}
                />

                {/* Header */}
                <div className="mb-6 flex flex-col gap-3 p-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-container">
                            <span className="material-symbols-outlined text-[24px] text-on-primary">
                                vaccines
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                {selectedAnimal
                                    ? selectedAnimal.ear_tag
                                    : 'Finca'}
                            </p>
                            <h1 className="text-2xl font-bold text-on-surface">
                                Sanidad Animal
                            </h1>
                        </div>
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95 sm:w-auto"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            add_circle
                        </span>
                        Nuevo registro
                    </button>
                </div>

                {/* Selector de animal */}
                <div className="mb-4 rounded-xl border border-t-4 border-gray-200 border-t-primary bg-white px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Animal
                            </span>
                            <AnimalSelector
                                animals={animals}
                                selectedAnimal={selectedAnimal}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Total registros */}
                            <span className="text-xs text-gray-400">
                                {records.total}{' '}
                                {records.total === 1 ? 'registro' : 'registros'}
                            </span>

                            {/* Filtro estado */}
                            <div className="flex gap-1">
                                {ESTADO_OPTS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setEstado(opt.value)}
                                        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                                            estado === opt.value
                                                ? 'border-secondary bg-secondary text-white'
                                                : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla */}
                {rows.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-xl border-t-4 border-primary bg-white py-16 text-gray-400 shadow-sm">
                        <span className="material-symbols-outlined text-5xl">
                            vaccines
                        </span>
                        <p className="text-sm">
                            No hay registros sanitarios para este animal.
                        </p>
                        <button
                            onClick={openCreate}
                            className="mt-2 text-sm text-green-600 hover:underline"
                        >
                            Agregar el primero
                        </button>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-secondary text-xs font-semibold uppercase tracking-wide text-white">
                                        <th className="px-4 py-3">Tipo</th>
                                        <th className="px-4 py-3">Producto</th>
                                        <th className="px-4 py-3">Dosis</th>
                                        <th className="px-4 py-3">Aplicado</th>
                                        <th className="px-4 py-3">
                                            Próxima alerta
                                        </th>
                                        <th className="px-4 py-3">Notas</th>
                                        <th className="px-4 py-3">
                                            Registrado por
                                        </th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {rows.map((record) => (
                                        <HealthRecordRow
                                            key={record.id}
                                            record={record}
                                            onEdit={openEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Paginación */}
                        {records.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                                <span className="text-xs text-gray-500">
                                    Página {records.current_page} de{' '}
                                    {records.last_page}
                                </span>
                                <div className="flex gap-2">
                                    {records.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            onClick={() =>
                                                link.url &&
                                                router.get(
                                                    link.url,
                                                    {},
                                                    { preserveState: false },
                                                )
                                            }
                                            className={`rounded px-3 py-1 text-xs transition ${
                                                link.active
                                                    ? 'bg-primary text-white'
                                                    : 'text-gray-500 hover:bg-gray-100 disabled:opacity-40'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal crear/editar */}
            <HealthRecordModal
                show={modal.show}
                mode={modal.mode}
                record={modal.record}
                animals={animals}
                selectedAnimal={selectedAnimal}
                onClose={closeModal}
            />

            {/* Confirm delete */}
            <Modal
                show={!!toDelete}
                maxWidth="sm"
                onClose={() => setToDelete(null)}
            >
                <ConfirmDeleteRecord
                    record={toDelete}
                    onConfirm={confirmDelete}
                    onCancel={() => setToDelete(null)}
                />
            </Modal>
            <HealthAlertsModal
                show={showAlertsModal}
                alerts={allAlerts}
                onClose={() => setShowAlertsModal(false)}
            />
        </AuthenticatedLayout>
    );
}
