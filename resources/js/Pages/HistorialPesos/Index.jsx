import AnimalSelector from '@/Components/HistorialPeso/AnimalSelector';
import ConfirmDeleteRecord from '@/Components/HistorialPeso/ConfirmDeleteRecord';
import WeightRecordModal from '@/Components/HistorialPeso/WeightRecordModal';
import WeightRecordRow from '@/Components/HistorialPeso/WeightRecordRow';
import WeightRecordShow from '@/Components/HistorialPeso/WeightRecordShow';
import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({
    animals,
    selectedAnimal,
    weightRecords,
    flash,
    productiveStages,
    weightMethods,
}) {
    console.log(weightRecords);
    const [modal, setModal] = useState({
        show: false,
        mode: 'create',
        record: null,
    });

    const [show, setShow] = useState({
        show: false,
        record: null,
    });

    const [toDelete, setToDelete] = useState(null);

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
        console.log(toRestore);
        router.put(route('weight-records.restore', toRestore.id));
    }

    function confirmDelete() {
        router.delete(route('weight-records.destroy', toDelete.id), {
            preserveScroll: true,
            onSuccess: () => setToDelete(null),
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Pesaje de animal" />

            <div>
                {/* Flash */}
                <Flash flash={flash} />

                {/* Header */}
                <div className="mb-6 flex items-center justify-between gap-4 p-2">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                            <span className="material-symbols-outlined text-[24px] text-on-primary">
                                balance
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                {selectedAnimal
                                    ? selectedAnimal.ear_tag
                                    : 'Finca'}
                            </p>
                            <h1 className="text-2xl font-bold text-on-surface">
                                Historial Pesajes
                            </h1>
                        </div>
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            add_circle
                        </span>
                        Nuevo registro
                    </button>
                </div>

                {/* Selector de animal */}
                <div className="mb-4 flex items-center justify-between rounded-xl border-t-4 border-primary bg-white px-4 py-3 shadow-sm">
                    <AnimalSelector
                        animals={animals}
                        selectedAnimal={selectedAnimal}
                    />
                    <span className="text-xs text-gray-400">
                        {weightRecords.total}{' '}
                        {weightRecords.total === 1 ? 'registro' : 'registros'}
                    </span>
                </div>

                {/* Tabla */}
                {weightRecords.data.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-xl border-t-4 border-primary bg-white py-16 text-gray-400 shadow-sm">
                        <span className="material-symbols-outlined text-5xl">
                            balance
                        </span>
                        <p className="text-sm">
                            No hay registros de peso para este animal.
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
                                        <th className="px-4 py-3">
                                            Fecha de pesaje
                                        </th>
                                        <th className="px-4 py-3">Peso(kg)</th>
                                        <th className="px-4 py-3">
                                            Condicion Corporal
                                        </th>
                                        <th className="px-4 py-3">
                                            Etapa Productiva
                                        </th>
                                        <th className="px-4 py-3">
                                            Metodo de Pesaje
                                        </th>
                                        <th className="px-4 py-3">Estado</th>

                                        <th className="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {weightRecords.data.map((record) => (
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

                        {/* Paginación */}
                        {weightRecords.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                                <span className="text-xs text-gray-500">
                                    Página {weightRecords.current_page} de{' '}
                                    {weightRecords.last_page}
                                </span>
                                <div className="flex gap-2">
                                    {weightRecords.links.map((link, i) => (
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

            <WeightRecordShow
                show={show.show}
                onClose={closeShow}
                record={show.record}
            />

            {/* Modal crear/editar */}
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
        </AuthenticatedLayout>
    );
}
