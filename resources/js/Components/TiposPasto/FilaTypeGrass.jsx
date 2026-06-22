import { router } from '@inertiajs/react';
import { GiGrass } from 'react-icons/gi';

const FilaTypeGrass = ({ grass, index, setModalEditar, setModalEliminar }) => {
    const isDeleted = !!grass.deleted_at;
    const paddockCount = grass.paddocks?.length ?? 0;

    return (
        <tr
            className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${isDeleted ? 'opacity-50' : ''}`}
        >
            {/* # */}
            <td className="px-4 py-3 text-xs tabular-nums text-gray-400">
                {index}
            </td>

            {/* Nombre */}
            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                <div className="flex items-center gap-2">
                    <GiGrass />
                    {grass.name}
                    {isDeleted && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                            Eliminado
                        </span>
                    )}
                </div>
            </td>

            {/* Potreros */}
            <td className="px-4 py-3">
                {paddockCount > 0 ? (
                    <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        {paddockCount}{' '}
                        {paddockCount === 1 ? 'potrero' : 'potreros'}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">Sin potreros</span>
                )}
            </td>

            {/* Estado */}
            <td className="px-4 py-3">
                {isDeleted ? (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-500">
                        Inactivo
                    </span>
                ) : (
                    <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        Activo
                    </span>
                )}
            </td>

            {/* Creado */}
            <td className="px-4 py-3 text-sm tabular-nums text-gray-400">
                {new Date(grass.created_at).toLocaleDateString()} -{' '}
                {new Date(grass.created_at).toLocaleTimeString()}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    {!isDeleted && (
                        <>
                            <ActionBtn
                                icon="edit"
                                label="Editar"
                                onClick={() => setModalEditar(grass)}
                                cls="hover:text-secondary"
                            />
                            <ActionBtn
                                icon="delete"
                                label={
                                    paddockCount > 0
                                        ? 'No se puede eliminar: tiene potreros asociados'
                                        : 'Eliminar'
                                }
                                onClick={() =>
                                    paddockCount === 0 &&
                                    setModalEliminar(grass)
                                }
                                cls={
                                    paddockCount > 0
                                        ? 'cursor-not-allowed opacity-30'
                                        : 'hover:text-red-500'
                                }
                            />
                        </>
                    )}
                    {isDeleted && (
                        <ActionBtn
                            icon="restore_from_trash"
                            label="Restaurar"
                            onClick={() =>
                                router.put(
                                    route('type-grasses.restore', grass.id),
                                )
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

export default FilaTypeGrass;
