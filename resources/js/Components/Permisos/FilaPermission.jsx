const FilaPermission = ({
    permission,
    index,
    setModalEditar,
    setModalEliminar,
}) => {
    const hasRoles = permission.roles_count > 0;

    return (
        <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
            {/* # */}
            <td className="px-4 py-3 text-xs tabular-nums text-gray-400">
                {index}
            </td>

            {/* Nombre */}
            <td className="px-4 py-3 text-sm font-medium capitalize text-gray-800">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                        key
                    </span>
                    {permission.name}
                </div>
            </td>

            {/* Guard */}
            <td className="px-4 py-3">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                    {permission.guard_name}
                </span>
            </td>

            {/* Roles asignados */}
            <td className="px-4 py-3">
                {hasRoles ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {permission.roles_count}{' '}
                        {permission.roles_count === 1 ? 'rol' : 'roles'}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">Sin asignar</span>
                )}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    <ActionBtn
                        icon="edit"
                        label="Editar"
                        onClick={() => setModalEditar(permission)}
                        cls="hover:text-secondary"
                    />
                    <ActionBtn
                        icon="delete"
                        label={
                            hasRoles
                                ? 'No se puede eliminar: tiene roles asignados'
                                : 'Eliminar'
                        }
                        onClick={() =>
                            !hasRoles && setModalEliminar(permission)
                        }
                        cls={
                            hasRoles
                                ? 'opacity-30 cursor-not-allowed'
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

export default FilaPermission;
