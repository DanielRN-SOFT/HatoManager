const WeightRecordRow = ({ record, onEdit, onDelete, onRestore }) => {
    return (
        <tr
            className={`border-b border-gray-100 transition hover:bg-gray-50 ${record.deleted_at ? 'opacity-50' : ''}`}
        >
            <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(record.weight_date).toLocaleDateString('es-CO')}
            </td>
            <td className="px-4 py-3 text-sm text-gray-800">{record.weight}</td>
            <td className="px-4 py-3 text-sm text-gray-600">
                {record.body_condition_score}
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">
                {record.productive_stage.name}
            </td>
            <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-500">
                {record.weight_method.name ?? '—'}
            </td>

            <td className={`px-4 py-3 text-sm text-gray-600`}>
                <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${record.deleted_at ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}
                >
                    {record.deleted_at ? 'Inactivo' : 'Activo'}{' '}
                </span>
            </td>

            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(record)}
                        className="text-gray-400 transition hover:text-green-600"
                        title="Editar"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '20px' }}
                        >
                            edit
                        </span>
                    </button>
                    {!record.deleted_at ? (
                        <button
                            onClick={() => onDelete(record)}
                            className="text-gray-400 transition hover:text-red-500"
                            title="Eliminar"
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '20px' }}
                            >
                                delete
                            </span>
                        </button>
                    ) : (
                        <button
                            onClick={() => onRestore(record)}
                            className="text-gray-400 transition hover:text-green-700"
                            title="Restaurar"
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '20px' }}
                            >
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
