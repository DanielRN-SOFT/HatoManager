import { useForm } from '@inertiajs/react';

const ModalFormPermission = ({ permission = null, onClose }) => {
    const isEdit = !!permission;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: permission?.name ?? '',
        guard_name: permission?.guard_name ?? 'web',
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
            put(route('permissions.update', permission.id), options);
        } else {
            post(route('permissions.store'), options);
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                        key
                    </span>
                    <h2 className="text-base font-bold text-gray-800">
                        {isEdit ? 'Editar permiso' : 'Nuevo permiso'}
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
                        Nombre del permiso
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ej. gestionar usuarios, gestionar razas..."
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
                    <p className="mt-1 text-[11px] text-gray-400">
                        Usa el formato "gestionar [módulo]" en minúsculas (ej.
                        gestionar sanidad)
                    </p>
                </div>

                {/* Guard (solo creación) */}
                {!isEdit && (
                    <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                            <span className="material-symbols-outlined text-[13px] text-primary">
                                security
                            </span>
                            Guard
                        </label>
                        <input
                            type="text"
                            value={data.guard_name}
                            onChange={(e) =>
                                setData('guard_name', e.target.value)
                            }
                            className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${
                                errors.guard_name
                                    ? 'border-red-400'
                                    : 'border-gray-200'
                            }`}
                        />
                    </div>
                )}

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
                        {isEdit ? 'Guardar cambios' : 'Crear permiso'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalFormPermission;
