import { useRole } from '@/hooks/useRole';

const WeightRecordRow = ({ record, onEdit, onDelete, onRestore, onShow }) => {
    const isDeleted = !!record.deleted_at;
    const { isGanadero } = useRole();

    return (
        <tr
            className={`border-b border-gray-100 transition-colors duration-150 hover:bg-green-50/50 ${
                isDeleted ? 'opacity-60' : ''
            }`}
        >
            {/* Fecha */}
            <td className="px-4 py-3">
                <span
                    className={`text-sm ${isDeleted ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    {new Date(record.weight_date).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}
                    <span className="ml-1 text-xs text-gray-400">
                        {new Date(record.weight_date).toLocaleTimeString(
                            'es-CO',
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                            },
                        )}
                    </span>
                </span>
            </td>

            {/* Peso */}
            <td className="px-4 py-3">
                <span
                    className={`text-sm font-semibold ${isDeleted ? 'text-gray-400' : 'text-gray-800'}`}
                >
                    {record.weight}
                    <span className="ml-0.5 text-xs font-normal text-gray-400">
                        kg
                    </span>
                </span>
            </td>

            {/* Condición corporal */}
            <td className="px-4 py-3">
                {(() => {
                    const score = record.body_condition_score;
                    const labels = {
                        1: 'Extremadamente flaco',
                        2: 'Flaco',
                        3: 'Moderado / Promedio',
                        4: 'Obeso / Gordo',
                        5: 'Extremadamente gordo',
                    };
                    const colors = {
                        1: isDeleted
                            ? 'bg-gray-100 text-gray-400 border-gray-200'
                            : 'bg-red-50 text-red-700 border-red-100',
                        2: isDeleted
                            ? 'bg-gray-100 text-gray-400 border-gray-200'
                            : 'bg-orange-50 text-orange-700 border-orange-100',
                        3: isDeleted
                            ? 'bg-gray-100 text-gray-400 border-gray-200'
                            : 'bg-blue-50 text-blue-700 border-blue-100',
                        4: isDeleted
                            ? 'bg-gray-100 text-gray-400 border-gray-200'
                            : 'bg-amber-50 text-amber-700 border-amber-100',
                        5: isDeleted
                            ? 'bg-gray-100 text-gray-400 border-gray-200'
                            : 'bg-rose-50 text-rose-700 border-rose-100',
                    };
                    return (
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-xs font-medium ${colors[score]}`}
                        >
                            <span className="text-[10px] font-bold opacity-70">
                                {score}
                            </span>
                            {labels[score]}
                        </span>
                    );
                })()}
            </td>

            {/* Etapa productiva */}
            <td className="px-4 py-3">
                <span
                    className={`text-sm ${isDeleted ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    {record.productive_stage.name}
                </span>
            </td>

            {/* Método */}
            <td className="max-w-[160px] px-4 py-3">
                <span
                    className={`block truncate text-sm ${isDeleted ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    {record.weight_method?.name ?? (
                        <span className="text-gray-300">—</span>
                    )}
                </span>
            </td>

            {/* Estado */}
            <td className="px-4 py-3">
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isDeleted
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-green-50 text-green-700'
                    }`}
                >
                    <span
                        className={`h-1.5 w-1.5 rounded-full ${isDeleted ? 'bg-amber-400' : 'bg-green-500'}`}
                    />
                    {isDeleted ? 'Inactivo' : 'Activo'}
                </span>
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-0.5">
                    <button
                        onClick={() => onShow(record)}
                        title="Ver detalle"
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-500"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            visibility
                        </span>
                    </button>

                    {isGanadero && (
                        <button
                            onClick={() => onEdit(record)}
                            title="Editar"
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                edit
                            </span>
                        </button>
                    )}

                    {!isDeleted && isGanadero && (
                        <button
                            onClick={() => onDelete(record)}
                            title="Eliminar"
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                delete
                            </span>
                        </button>
                    )}

                    {isDeleted && isGanadero && (
                        <button
                            onClick={() => onRestore(record)}
                            title="Restaurar"
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-700"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                restore_from_trash
                            </span>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default WeightRecordRow;
