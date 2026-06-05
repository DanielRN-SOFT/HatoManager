import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import WeightRecordForm from './WeightRecordForm';

export default function WeightRecordModal({
    show,
    mode,
    record,
    animals,
    selectedAnimal,
    onClose,
    weightMethods,
    productiveStages,
}) {
    const isEdit = mode === 'edit';

    const { data, setData, post, put, processing, errors, reset } = useForm({
        animal_id: record?.animal_id ?? selectedAnimal ?? '',
        weigth_date: record?.weigth_date ?? '',
        weight: record?.weight ?? '',
        body_condition_score: record?.body_condition_score ?? '',
        observations: record?.observations ?? '',
        productive_stage_id: record?.productive_stage_id,
        weight_method_id: record?.weight_method_id ?? '',
        previous_fast: record?.previous_fast ?? '',
        room_temperature: record?.room_temperature ?? '',
    });

    useEffect(() => {
        if (show && record) {
            setData({
                animal_id: record?.animal_id ?? selectedAnimal ?? '',
                weigth_date: record?.weigth_date ?? '',
                weight: record?.weight ?? '',
                body_condition_score: record?.body_condition_score ?? '',
                observations: record?.observations ?? '',
                productive_stage_id: record?.productive_stage_id,
                weight_method_id: record?.weight_method_id ?? '',
                previous_fast: record?.previous_fast ?? '',
                room_temperature: record?.room_temperature ?? '',
            });
        } else if (show && !record) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, record]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            put(route('weight-records.update', record.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('weight-records.store'), {
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
                            {isEdit ? 'edit' : 'balance'}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-on-surface">
                            {isEdit
                                ? 'Editar registro de peso'
                                : 'Nuevo registro de peso'}
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                            {isEdit
                                ? 'Modifica los datos del registro'
                                : 'Completa los datos del registro'}
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
                    <WeightRecordForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        animals={animals}
                        processing={processing}
                        productiveStages={productiveStages}
                        weightMethods={weightMethods}
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
                    <button
                        weigth_date="button"
                        onClick={onClose}
                        className="rounded-lg border border-outline-variant px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container"
                        disabled={processing}
                    >
                        Cancelar
                    </button>
                    <button
                        weigth_date="submit"
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
