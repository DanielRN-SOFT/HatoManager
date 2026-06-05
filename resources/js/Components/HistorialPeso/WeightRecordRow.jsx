const WeightRecordRow = ({ record, onEdit, onDelete }) => {
    return (
        <tr className="border-b border-gray-100 transition hover:bg-gray-50">
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
                </div>
            </td>
        </tr>
    );
};

export default WeightRecordRow;
