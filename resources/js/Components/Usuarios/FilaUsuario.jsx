import { router } from '@inertiajs/react';

const ROLE_STYLES = {
    admin: 'bg-purple-50 text-purple-700',
    ganadero: 'bg-green-50 text-green-700',
    veterinario: 'bg-blue-50 text-blue-700',
};

const FilaUsuario = ({ usuario, setModalEditar, setModalEliminar }) => {
    const initials = usuario.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    const role = usuario.roles?.[0]?.name ?? null;
    const roleCls = ROLE_STYLES[role] ?? 'bg-gray-100 text-gray-600';
    const isDeleted = !!usuario.deleted_at;

    return (
        <tr
            className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${isDeleted ? 'opacity-50' : ''}`}
        >
            {/* Avatar */}
            <td className="px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {initials}
                </div>
            </td>

            {/* Nombre */}
            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                {usuario.name}
                {isDeleted && (
                    <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                        Eliminado
                    </span>
                )}
            </td>

            {/* Email */}
            <td className="px-4 py-3 text-sm text-gray-500">{usuario.email}</td>

            {/* Rol */}
            <td className="px-4 py-3">
                {role ? (
                    <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${roleCls}`}
                    >
                        {role}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">—</span>
                )}
            </td>

            {/* Verificado */}
            <td className="px-4 py-3">
                {usuario.email_verified_at ? (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                        <span className="material-symbols-outlined text-[15px]">
                            verified
                        </span>
                        Verificado
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                        <span className="material-symbols-outlined text-[15px]">
                            schedule
                        </span>
                        Pendiente
                    </span>
                )}
            </td>

            {/* Creado */}
            <td className="px-4 py-3 text-sm tabular-nums text-gray-400">
                { new Date(usuario.created_at).toLocaleDateString()} - {new Date(usuario.created_at).toLocaleTimeString()}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    {!isDeleted && (
                        <>
                            <ActionBtn
                                icon="edit"
                                label="Editar"
                                onClick={() => setModalEditar(usuario)}
                                cls="hover:text-secondary"
                            />
                            <ActionBtn
                                icon="delete"
                                label="Eliminar"
                                onClick={() => setModalEliminar(usuario)}
                                cls="hover:text-red-500"
                            />
                        </>
                    )}
                    {isDeleted && (
                        <ActionBtn
                            icon="restore_from_trash"
                            label="Restaurar"
                            onClick={() =>
                                router.put(route('users.restore', usuario.id))
                            }
                            cls="hover:text-green-500"
                        />
                    )}
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

export default FilaUsuario;
