import AnimalSelector from '@/Components/HistorialPeso/AnimalSelector';
import ConfirmDeleteRecord from '@/Components/HistorialPeso/ConfirmDeleteRecord';
import PaginacionTabla from '@/Components/HistorialPeso/PaginacionTabla';
import WeightRecordModal from '@/Components/HistorialPeso/WeightRecordModal';
import WeightRecordRow from '@/Components/HistorialPeso/WeightRecordRow';
import WeightRecordShow from '@/Components/HistorialPeso/WeightRecordShow';
import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import { useRole } from '@/hooks/useRole';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const ESTADO_OPTS = [
    { value: '', label: 'Todos' },
    { value: 'activo', label: 'Activos' },
    { value: 'inactivo', label: 'Inactivos' },
];

export default function Index({
    animals,
    selectedAnimal,
    weightRecords,
    productiveStages,
    weightMethods,
}) {
    const { isGanadero } = useRole();
    const [modal, setModal] = useState({
        show: false,
        mode: 'create',
        record: null,
    });
    const [show, setShow] = useState({ show: false, record: null });
    const [toDelete, setToDelete] = useState(null);
    const [estado, setEstado] = useState('');

    function openCreate() {
        setModal({ show: true, mode: 'create', record: null });
    }
    function openEdit(record) {
        setModal({ show: true, mode: 'edit', record });
    }
    function openShow(record) {
        setShow({ show: true, record });
    }
    function closeShow() {
        setShow({ show: false, record: null });
    }
    function closeModal() {
        setModal({ show: false, mode: 'create', record: null });
    }
    function handleDelete(record) {
        setToDelete(record);
    }

    function confirmRestore(toRestore) {
        router.put(route('weight-records.restore', toRestore.id));
    }

    function confirmDelete() {
        router.delete(route('weight-records.destroy', toDelete.id), {
            preserveScroll: true,
            onSuccess: () => setToDelete(null),
        });
    }

    // Filtro de estado en frontend
    const rows = (weightRecords.data ?? []).filter((r) => {
        if (estado === 'activo') return !r.deleted_at;
        if (estado === 'inactivo') return !!r.deleted_at;
        return true;
    });

    return (
        <AuthenticatedLayout>
            <Head title="Historial Pesajes" />

            <div className="px-4 py-6">
                <Flash />

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Historial Pesajes
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Registros de peso por animal en la finca activa.
                        </p>
                    </div>
                    {isGanadero && (
                        <button
                            onClick={openCreate}
                            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add_circle
                            </span>
                            Nuevo registro
                        </button>
                    )}
                </div>

                {/* Card de filtros */}
                <div className="mb-4 rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Selector animal */}
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
                                {weightRecords.total}{' '}
                                {weightRecords.total === 1
                                    ? 'registro'
                                    : 'registros'}
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
                    <div className="flex flex-col items-center gap-3 rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white py-16 text-gray-400">
                        <span className="material-symbols-outlined text-5xl">
                            balance
                        </span>
                        <p className="text-sm">
                            No hay registros para mostrar.
                        </p>
                        {isGanadero && (
                            <button
                                onClick={openCreate}
                                className="mt-1 text-sm text-primary hover:underline"
                            >
                                Agregar el primero
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-secondary text-xs font-semibold uppercase tracking-wide text-white">
                                        <th className="px-4 py-3">
                                            Fecha de pesaje
                                        </th>
                                        <th className="px-4 py-3">Peso (kg)</th>
                                        <th className="px-4 py-3">
                                            Condición corporal
                                        </th>
                                        <th className="px-4 py-3">
                                            Etapa productiva
                                        </th>
                                        <th className="px-4 py-3">
                                            Método de pesaje
                                        </th>
                                        <th className="px-4 py-3">Estado</th>
                                        <th className="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((record) => (
                                        <WeightRecordRow
                                            key={record.id}
                                            record={record}
                                            onEdit={openEdit}
                                            onDelete={handleDelete}
                                            onRestore={confirmRestore}
                                            onShow={openShow}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {weightRecords.last_page > 1 && (
                            <PaginacionTabla weightRecords={weightRecords} />
                        )}
                    </div>
                )}
            </div>

            <WeightRecordShow
                show={show.show}
                onClose={closeShow}
                record={show.record}
            />

            <WeightRecordModal
                show={modal.show}
                mode={modal.mode}
                record={modal.record}
                animals={animals}
                selectedAnimal={selectedAnimal}
                onClose={closeModal}
                productiveStages={productiveStages}
                weightMethods={weightMethods}
            />

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
        </AuthenticatedLayout>
    );
}
