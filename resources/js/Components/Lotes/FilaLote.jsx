import { router } from '@inertiajs/react';

const FilaLote = ({ paddock, index, setModalEditar, setModalEliminar }) => {
    const isDeleted = !!paddock.deleted_at;
    const hasActiveAnimals = paddock.animals.length > 0;
    const animalCount = paddock.animals.length;
    console.log(hasActiveAnimals);

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
                    {paddock.name}
                    {isDeleted && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                            Eliminado
                        </span>
                    )}
                </div>
            </td>

            {/* Area */}
            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                        center_focus_weak
                    </span>
                    {paddock.area}
                </div>
            </td>

            {/* Tipo de pasto */}
            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                        grass
                    </span>
                    {paddock.type_grass?.name}
                </div>
            </td>

            {/* Capacidad */}
            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                        high_density
                    </span>
                    {paddock.capacity}
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

            {/* Potreros */}
            <td className="px-4 py-3">
                {animalCount > 0 ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {animalCount}{' '}
                        {animalCount === 1 ? 'animal' : 'animales'}
                    </span>
                ) : (
                    <span className="text-xs text-gray-400">Sin animalaes</span>
                )}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    {!isDeleted && (
                        <>
                            <ActionBtn
                                icon="edit"
                                label="Editar"
                                onClick={() => setModalEditar(paddock)}
                                cls="hover:text-secondary"
                            />
                            <ActionBtn
                                icon="delete"
                                label={
                                    hasActiveAnimals
                                        ? 'No se puede eliminar, tiene animales asociados'
                                        : 'Eliminar'
                                }
                                onClick={() =>
                                    !hasActiveAnimals &&
                                    setModalEliminar(paddock)
                                }
                                cls={`${hasActiveAnimals ? 'cursor-not-allowed opacity-50' : 'hover:text-red-500'}`}
                            />
                        </>
                    )}
                    {isDeleted && (
                        <ActionBtn
                            icon="restore_from_trash"
                            label="Restaurar"
                            onClick={() =>
                                router.put(route('paddock.restore', paddock.id))
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

export default FilaLote;
