import { router } from '@inertiajs/react';

const FilaBreed = ({ breed, index, setModalEditar, setModalEliminar }) => {
    const isDeleted = !!breed.deleted_at;
    const hasAnimals = breed.animals.length > 0;
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
                        pets
                    </span>
                    {breed.name}
                    {isDeleted && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                            Eliminada
                        </span>
                    )}
                </div>
            </td>

            {/* Estado */}
            <td className="px-4 py-3">
                {isDeleted ? (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-500">
                        Inactiva
                    </span>
                ) : (
                    <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        Activa
                    </span>
                )}
            </td>

            {/* Creado */}
            <td className="px-4 py-3 text-sm tabular-nums text-gray-400">
                {new Date(breed.created_at).toLocaleDateString()} -{' '}
                {new Date(breed.created_at).toLocaleTimeString()}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    {!isDeleted && (
                        <>
                            <ActionBtn
                                icon="edit"
                                label="Editar"
                                onClick={() => setModalEditar(breed)}
                                cls="hover:text-secondary"
                            />
                            <ActionBtn
                                icon="delete"
                                label={
                                    hasAnimals
                                        ? 'No se puede eliminar: tiene registros de animales asignados'
                                        : 'Eliminar'
                                }
                                onClick={() =>
                                    !hasAnimals && setModalEliminar(breed)
                                }
                                cls={
                                    hasAnimals
                                        ? 'cursor-not-allowed opacity-30'
                                        : 'hover:text-red-600'
                                }
                            />
                        </>
                    )}
                    {isDeleted && (
                        <ActionBtn
                            icon="restore_from_trash"
                            label="Restaurar"
                            onClick={() =>
                                router.put(route('breeds.restore', breed.id))
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

export default FilaBreed;
