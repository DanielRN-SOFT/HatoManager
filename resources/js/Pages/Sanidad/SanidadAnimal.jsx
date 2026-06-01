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

    return (
        <AuthenticatedLayout>
            <Head title="Sanidad Animal" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Sanidad Animal
                        </h1>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Vacunas, desparasitaciones y tratamientos
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '18px' }}
                        >
                            add
                        </span>
                        Nuevo registro
                    </button>
                </div>

                {/* Selector de animal */}
                <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
                    <AnimalSelector
                        animals={animals}
                        selectedAnimal={selectedAnimal}
                    />
                    <span className="text-xs text-gray-400">
                        {records.total}{' '}
                        {records.total === 1 ? 'registro' : 'registros'}
                    </span>
                </div>

                {/* Tabla */}
                {records.data.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white py-16 text-gray-400">
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
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
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
                                    {records.data.map((record) => (
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
                                                    ? 'bg-green-600 text-white'
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
            {toDelete && (
                <ConfirmDeleteRecord
                    record={toDelete}
                    onConfirm={confirmDelete}
                    onCancel={() => setToDelete(null)}
                />
            )}
            <HealthAlertsModal
                show={showAlertsModal}
                alerts={allAlerts}
                onClose={() => setShowAlertsModal(false)}
            />
        </AuthenticatedLayout>
    );
}
