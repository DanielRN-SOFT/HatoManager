import { useForm } from '@inertiajs/react';

const ModalFormBreed = ({ breed = null, onClose }) => {
    const isEdit = !!breed;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: breed?.name ?? '',
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
            put(route('breeds.update', breed.id), options);
        } else {
            post(route('breeds.store'), options);
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                        pets
                    </span>
                    <h2 className="text-base font-bold text-gray-800">
                        {isEdit ? 'Editar raza' : 'Nueva raza'}
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
                <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                        <span className="material-symbols-outlined text-[13px] text-primary">
                            label
                        </span>
                        Nombre de la raza
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ej. Holstein, Brahman, Angus..."
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
                        {isEdit ? 'Guardar cambios' : 'Crear raza'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalFormBreed;
