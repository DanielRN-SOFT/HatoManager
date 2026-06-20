const ModalDetalleRole = ({ role, onClose }) => {
    if (!role) return null;

    const permissions = role.permissions ?? [];
    const totalPermisos = permissions.length;
    const users = role.users ?? [];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <span className="material-symbols-outlined text-[22px] text-primary">
                            shield_person
                        </span>
                    </div>
                    <div>
                        <h2 className="text-base font-bold capitalize text-gray-800">
                            {role.name}
                        </h2>
                        <p className="text-xs text-gray-400">
                            Guard: {role.guard_name ?? 'web'}
                        </p>
                    </div>
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

            {/* Resumen */}
            <div className="mb-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-purple-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-600">
                        Permisos
                    </p>
                    <p className="text-xl font-bold text-purple-700">
                        {totalPermisos}
                    </p>
                </div>
                <div className="rounded-xl bg-blue-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                        Usuarios
                    </p>
                    <p className="text-xl font-bold text-blue-700">
                        {users.length}
                    </p>
                </div>
            </div>

            {/* Permisos agrupados */}
            <div className="mb-5">
                <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    <span className="material-symbols-outlined text-[13px] text-primary">
                        key
                    </span>
                    Permisos asignados
                </h3>

                {totalPermisos === 0 ? (
                    <p className="rounded-xl bg-gray-50 px-4 py-6 text-center text-xs text-gray-400">
                        Este rol no tiene permisos asignados.
                    </p>
                ) : (
                    <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-100 p-3">
                        <div className="flex flex-wrap gap-1.5">
                            {permissions.map((p) => (
                                <span
                                    key={p.id}
                                    className="rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-medium capitalize text-purple-700"
                                >
                                    {p.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Usuarios con este rol */}
            <div>
                <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    <span className="material-symbols-outlined text-[13px] text-primary">
                        group
                    </span>
                    Usuarios con este rol
                </h3>

                {users.length === 0 ? (
                    <p className="rounded-xl bg-gray-50 px-4 py-6 text-center text-xs text-gray-400">
                        Ningún usuario tiene este rol asignado.
                    </p>
                ) : (
                    <div className="max-h-40 space-y-1.5 overflow-y-auto">
                        {users.map((u) => (
                            <div
                                key={u.id}
                                className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-50"
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                    {u.name?.[0]?.toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-xs font-medium text-gray-700">
                                        {u.name}
                                    </p>
                                    <p className="truncate text-[11px] text-gray-400">
                                        {u.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Acción */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={onClose}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ModalDetalleRole;
