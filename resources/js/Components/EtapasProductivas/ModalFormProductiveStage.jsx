import { useForm } from '@inertiajs/react';

const ModalFormProductiveStage = ({ stage = null, onClose }) => {
    const isEdit = !!stage;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: stage?.name ?? '',
        lactation_days: stage?.lactation_days ?? '',
        number_of_births: stage?.number_of_births ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        };

        if (isEdit) {
            put(route('productive-stages.update', stage.id), options);
        } else {
            post(route('productive-stages.store'), options);
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                        timeline
                    </span>
                    <h2 className="text-base font-bold text-gray-800">
                        {isEdit
                            ? 'Editar etapa productiva'
                            : 'Nueva etapa productiva'}
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <FormField
                    label="Nombre de la etapa"
                    icon="label"
                    error={errors.name}
                >
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ej. Lactancia temprana, Seca, Primer parto..."
                        autoFocus
                        className={`field-input w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                    />
                </FormField>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Días de lactancia */}
                    <FormField
                        label="Días de lactancia"
                        icon="water_drop"
                        error={errors.lactation_days}
                    >
                        <input
                            type="number"
                            min="0"
                            max="1000"
                            value={data.lactation_days}
                            onChange={(e) =>
                                setData('lactation_days', e.target.value)
                            }
                            placeholder="Opcional"
                            className={`field-input w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${errors.lactation_days ? 'border-red-400' : 'border-gray-200'}`}
                        />
                    </FormField>

                    {/* N.º de partos */}
                    <FormField
                        label="N.º de partos"
                        icon="child_friendly"
                        error={errors.number_of_births}
                    >
                        <input
                            type="number"
                            min="0"
                            max="50"
                            value={data.number_of_births}
                            onChange={(e) =>
                                setData('number_of_births', e.target.value)
                            }
                            placeholder="Opcional"
                            className={`field-input w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${errors.number_of_births ? 'border-red-400' : 'border-gray-200'}`}
                        />
                    </FormField>
                </div>

                {/* Acciones */}
                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                    >
                        {processing && (
                            <span className="material-symbols-outlined animate-spin text-[16px]">
                                progress_activity
                            </span>
                        )}
                        {isEdit ? 'Guardar cambios' : 'Crear etapa'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const FormField = ({ label, icon, error, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-[13px] text-primary">
                {icon}
            </span>
            {label}
        </label>
        {children}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

export default ModalFormProductiveStage;
