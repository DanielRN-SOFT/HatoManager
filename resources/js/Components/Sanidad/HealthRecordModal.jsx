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

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Modal */}
            <div className="relative mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-600">
                            {isEdit ? 'edit' : 'vaccines'}
                        </span>
                        <h2 className="text-base font-semibold text-gray-800">
                            {isEdit
                                ? 'Editar registro sanitario'
                                : 'Nuevo registro sanitario'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 transition hover:text-gray-600"
                    >
                        <span className="material-symbols-outlined">close</span>
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
                            className="px-4 py-2 text-sm text-gray-600 transition hover:text-gray-800"
                            disabled={processing}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '18px' }}
                            >
                                {isEdit ? 'save' : 'add'}
                            </span>
                            {isEdit ? 'Guardar cambios' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
