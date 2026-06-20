const MAX_VISIBLE_PERMISSIONS = 3;

const FilaRole = ({
    role,
    index,
    setModalDetalle,
    setModalEditar,
    setModalEliminar,
}) => {
    const hasUsers = role.users_count > 0;
    const permissions = role.permissions ?? [];
    const visible = permissions.slice(0, MAX_VISIBLE_PERMISSIONS);
    const extra = permissions.length - visible.length;

    return (
        <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
            {/* # */}
            <td className="px-4 py-3 text-xs tabular-nums text-gray-400">
                {index}
            </td>

            {/* Nombre */}
            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                        shield_person
                    </span>
                    <span className="capitalize">{role.name}</span>
                </div>
            </td>

            {/* Permisos */}
            <td className="px-4 py-3">
                {permissions.length === 0 ? (
                    <span className="text-xs text-gray-400">Sin permisos</span>
                ) : (
                    <div className="flex flex-wrap items-center gap-1">
                        {visible.map((p) => (
                            <span
                                key={p.id}
                                className="rounded bg-purple-50 px-1.5 py-0.5 text-[10px] font-medium capitalize text-purple-700"
                            >
                                {p.name}
                            </span>
                        ))}
                        {extra > 0 && (
                            <span
                                title={permissions
                                    .slice(MAX_VISIBLE_PERMISSIONS)
                                    .map((p) => p.name)
                                    .join(', ')}
                                className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500"
                            >
                                +{extra}
                            </span>
                        )}
                    </div>
                )}
            </td>

            {/* Usuarios */}
            <td className="px-4 py-3">
                {hasUsers ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {role.users_count}{' '}
                        {role.users_count === 1 ? 'usuario' : 'usuarios'}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">Sin usuarios</span>
                )}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    <ActionBtn
                        icon="visibility"
                        label="Ver detalle"
                        onClick={() => setModalDetalle(role)}
                        cls="hover:text-blue-500"
                    />
                    <ActionBtn
                        icon="edit"
                        label="Editar"
                        onClick={() => setModalEditar(role)}
                        cls="hover:text-secondary"
                    />
                    <ActionBtn
                        icon="delete"
                        label={
                            hasUsers
                                ? 'No se puede eliminar: tiene usuarios asignados'
                                : 'Eliminar'
                        }
                        onClick={() => !hasUsers && setModalEliminar(role)}
                        cls={
                            hasUsers
                                ? 'cursor-not-allowed opacity-30'
                                : 'hover:text-red-500'
                        }
                    />
                </div>
            </td>
        </tr>
    );
};

const ActionBtn = ({ icon, label, onClick, cls }) => (
    <button
        onClick={onClick}
        title={label}
        className="rounded p-1.5 text-gray-400 transition-all active:scale-90"
    >
        <span className={`material-symbols-outlined text-[18px] ${cls}`}>
            {icon}
        </span>
    </button>
);

export default FilaRole;
