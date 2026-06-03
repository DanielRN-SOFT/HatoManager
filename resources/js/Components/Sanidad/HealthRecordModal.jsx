import Modal from '@/Components/Modal';
import HealthRecordForm from '@/Components/Sanidad/HealthRecordForm';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function HealthRecordModal({
    show,
    mode,
    record,
    animals,
    selectedAnimal,
    onClose,
}) {
    const isEdit = mode === 'edit';

    const { data, setData, post, put, processing, errors, reset } = useForm({
        animal_id: record?.animal_id ?? selectedAnimal ?? '',
        type: record?.type ?? '',
        product: record?.product ?? '',
        dose: record?.dose ?? '',
        applied_at: record?.applied_at
            ? record.applied_at.substring(0, 10)
            : '',
        next_date: record?.next_date ? record.next_date.substring(0, 10) : '',
        notes: record?.notes ?? '',
    });

    useEffect(() => {
        if (show && record) {
            setData({
                animal_id: record.animal_id ?? '',
                type: record.type ?? '',
                product: record.product ?? '',
                dose: record.dose ?? '',
                applied_at: record.applied_at
                    ? record.applied_at.substring(0, 10)
                    : '',
                next_date: record.next_date
                    ? record.next_date.substring(0, 10)
                    : '',
                notes: record.notes ?? '',
            });
        } else if (show && !record) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, record]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            put(route('health.update', record.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('health.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    }

    return (
        <Modal show={show} maxWidth="lg" onClose={onClose}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-container">
                        <span className="material-symbols-outlined text-[18px] text-on-primary">
                            {isEdit ? 'edit' : 'vaccines'}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-on-surface">
                            {isEdit
                                ? 'Editar registro sanitario'
                                : 'Nuevo registro sanitario'}
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                            {isEdit
                                ? 'Modifica los datos del registro'
                                : 'Completa los datos del tratamiento'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit}>
                <div className="px-6 py-4">
                    <HealthRecordForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        animals={animals}
                        processing={processing}
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-outline-variant px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container"
                        disabled={processing}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all hover:shadow-lg active:scale-95 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isEdit ? 'save' : 'add_circle'}
                        </span>
                        {isEdit ? 'Guardar cambios' : 'Registrar'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
