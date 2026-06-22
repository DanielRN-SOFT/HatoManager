import { useForm } from '@inertiajs/react';

const ModalFormLote = ({ paddock = null, onClose }) => {
    const isEdit = !!paddock;
    console.log(paddock);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: paddock?.name ?? '',
        type_of_grass: paddock?.type_of_grass ?? '',
        area: paddock?.area ?? '',
        capacity: paddock?.capacity ?? '',
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
            put(route('paddocks.update', paddock.id), options);
        } else {
            post(route('paddocks.store'), options);
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                        location_on
                    </span>
                    <h2 className="text-base font-bold text-gray-800">
                        {isEdit ? 'Editar lote' : 'Nuevo lote'}
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
                <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                        <span className="material-symbols-outlined text-[13px] text-primary">
                            label
                        </span>
                        Nombre del lote
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ej. Corral 23"
                        autoFocus
                        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                            errors.name ? 'border-red-400' : 'border-gray-200'
                        }`}
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Tipo de pasto */}
                <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                        <span className="material-symbols-outlined text-[13px] text-primary">
                            grass
                        </span>
                        Tipo de pasto
                    </label>
                    <input
                        type="text"
                        value={data.type_of_grass}
                        onChange={(e) =>
                            setData('type_of_grass', e.target.value)
                        }
                        placeholder="Ej. Corral 23"
                        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                            errors.type_of_grass
                                ? 'border-red-400'
                                : 'border-gray-200'
                        }`}
                    />
                    {errors.type_of_grass && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.type_of_grass}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                            <span className="material-symbols-outlined text-[13px] text-primary">
                                center_focus_weak
                            </span>
                            Area
                        </label>
                        <input
                            type="number"
                            value={data.area}
                            onChange={(e) => setData('area', e.target.value)}
                            placeholder="100"
                            className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                                errors.area
                                    ? 'border-red-400'
                                    : 'border-gray-200'
                            }`}
                        />
                        {errors.area && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.area}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                            <span className="material-symbols-outlined text-[13px] text-primary">
                                high_density
                            </span>
                            Capacidad
                        </label>
                        <input
                            type="number"
                            value={data.capacity}
                            onChange={(e) =>
                                setData('capacity', e.target.value)
                            }
                            placeholder="Ej. Corral 23"
                            className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                                errors.capacity
                                    ? 'border-red-400'
                                    : 'border-gray-200'
                            }`}
                        />
                        {errors.capacity && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.capacity}
                            </p>
                        )}
                    </div>
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
                        {isEdit ? 'Guardar cambios' : 'Crear lote'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalFormLote;
