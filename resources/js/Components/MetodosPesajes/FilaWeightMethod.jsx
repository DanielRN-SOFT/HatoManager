import { router } from '@inertiajs/react';

const FilaWeightMethod = ({
    method,
    index,
    setModalEditar,
    setModalEliminar,
}) => {
    const isDeleted = !!method.deleted_at;
    const hasWeightRecords = method.weight_records.length > 0;

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
                    <span className="material-symbols-outlined text-[18px] text-primary">
                        monitor_weight
                    </span>
                    {method.name}
                    {isDeleted && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                            Eliminado
                        </span>
                    )}
                </div>
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
                {new Date(method.created_at).toLocaleDateString()} -{' '}
                {new Date(method.created_at).toLocaleTimeString()}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    {!isDeleted && (
                        <>
                            <ActionBtn
                                icon="edit"
                                label="Editar"
                                onClick={() => setModalEditar(method)}
                                cls="hover:text-secondary"
                            />
                            <ActionBtn
                                icon="delete"
                                label={
                                    hasWeightRecords
                                        ? 'No se puede eliminar: tiene registros de peso asignados'
                                        : 'Eliminar'
                                }
                                onClick={() =>
                                    !hasWeightRecords &&
                                    setModalEliminar(method)
                                }
                                cls={`${
                                    hasWeightRecords
                                        ? 'cursor-not-allowed opacity-30'
                                        : 'hover:text-red-500'
                                }`}
                            />
                        </>
                    )}
                    {isDeleted && (
                        <ActionBtn
                            icon="restore_from_trash"
                            label="Restaurar"
                            onClick={() =>
                                router.put(
                                    route('weight-methods.restore', method.id),
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

export default FilaWeightMethod;
