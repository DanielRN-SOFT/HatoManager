const WeightRecordRow = ({ record, onEdit, onDelete, onRestore }) => {
    const isDeleted = !!record.deleted_at;

    return (
        <tr
            className={`border-b border-gray-100 transition-colors duration-150 hover:bg-green-50/40 ${
                isDeleted ? 'bg-gray-50/60' : ''
            }`}
        >
            {/* Fecha */}
            <td className="px-4 py-3">
                <span
                    className={`text-sm ${isDeleted ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    {new Date(record.weight_date).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                    })}
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
            <td className="px-4 py-3 text-center">
                <span
                    className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium ${
                        isDeleted
                            ? 'border-gray-200 bg-gray-100 text-gray-400'
                            : 'border-blue-100 bg-blue-50 text-blue-700'
                    }`}
                >
                    {record.body_condition_score == 1
                        ? `${record.body_condition_score} - Extremadamente flaco`
                        : record.body_condition_score == 2
                          ? `${record.body_condition_score} - Flaco`
                          : record.body_condition_score == 3
                            ? `${record.body_condition_score} - Moderado / Promedio`
                            : record.body_condition_score == 4
                              ? `${record.body_condition_score} - Obseso / Gordo`
                              : `${record.body_condition_score} - Extremadamente Gordo`}
                </span>
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
                    {record.weight_method?.name ?? '—'}
                </span>
            </td>

            {/* Estado */}
            <td className="px-4 py-3">
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
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
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onEdit(record)}
                        title="Editar"
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            edit
                        </span>
                    </button>

                    {!isDeleted ? (
                        <button
                            onClick={() => onDelete(record)}
                            title="Eliminar"
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                delete
                            </span>
                        </button>
                    ) : (
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
