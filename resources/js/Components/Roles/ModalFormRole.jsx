import { useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const ModalFormRole = ({ role = null, permissions, onClose }) => {
    const isEdit = !!role;
    const [search, setSearch] = useState('');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: role?.name ?? '',
        permissions: role?.permissions?.map((p) => p.name) ?? [],
    });

    // Tus permisos son frases completas (ej. "gestionar usuarios"), no siguen
    // convención modulo.accion, así que se filtran como lista plana en vez de agrupar.
    const filteredPermissions = useMemo(() => {
        return permissions.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [permissions, search]);

    const allChecked =
        filteredPermissions.length > 0 &&
        filteredPermissions.every((p) => data.permissions.includes(p.name));

    function toggleAll() {
        const names = filteredPermissions.map((p) => p.name);
        setData(
            'permissions',
            allChecked
                ? data.permissions.filter((p) => !names.includes(p))
                : [...new Set([...data.permissions, ...names])],
        );
    }

    function togglePermission(name) {
        setData(
            'permissions',
            data.permissions.includes(name)
                ? data.permissions.filter((p) => p !== name)
                : [...data.permissions, name],
        );
    }

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
            put(route('roles.update', role.id), options);
        } else {
            post(route('roles.store'), options);
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                        shield_person
                    </span>
                    <h2 className="text-base font-bold text-gray-800">
                        {isEdit ? 'Editar rol' : 'Nuevo rol'}
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
                        Nombre del rol
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ej. admin, ganadero, veterinario..."
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

                {/* Permisos */}
                <div>
                    <div className="mb-1.5 flex items-center justify-between">
                        <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                            <span className="material-symbols-outlined text-[13px] text-primary">
                                key
                            </span>
                            Permisos
                        </label>
                        <span className="text-[11px] text-gray-400">
                            {data.permissions.length} seleccionados
                        </span>
                    </div>

                    {/* Buscador + seleccionar todos */}
                    <div className="mb-2 flex items-center gap-2">
                        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5">
                            <span className="material-symbols-outlined text-[16px] text-gray-400">
                                search
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar permiso..."
                                className="w-full text-sm outline-none"
                            />
                        </div>
                        {filteredPermissions.length > 0 && (
                            <button
                                type="button"
                                onClick={toggleAll}
                                className="shrink-0 text-[11px] font-medium text-primary hover:underline"
                            >
                                {allChecked
                                    ? 'Quitar todos'
                                    : 'Seleccionar todos'}
                            </button>
                        )}
                    </div>

                    {/* Lista de permisos */}
                    <div className="max-h-64 space-y-1 overflow-y-auto rounded-xl border border-gray-100 p-3">
                        {filteredPermissions.length === 0 ? (
                            <p className="py-4 text-center text-xs text-gray-400">
                                No se encontraron permisos.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                                {filteredPermissions.map((p) => (
                                    <label
                                        key={p.id}
                                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs capitalize text-gray-600 hover:bg-gray-50"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.permissions.includes(
                                                p.name,
                                            )}
                                            onChange={() =>
                                                togglePermission(p.name)
                                            }
                                            className="h-3.5 w-3.5 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        {p.name}
                                    </label>
                                ))}
                            </div>
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
                        {isEdit ? 'Guardar cambios' : 'Crear rol'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalFormRole;
