import AlertBadge from '@/Components/Sanidad/AlertBadge';
import HealthTypeBadge from '@/Components/Sanidad/HealthTypeBadge';

export default function HealthRecordRow({ record, onEdit, onDelete }) {
    return (
        <tr className="border-b border-gray-100 transition hover:bg-gray-50">
            <td className="px-4 py-3">
                <HealthTypeBadge type={record.type} />
            </td>
            <td className="px-4 py-3 text-sm text-gray-800">
                {record.product}
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">{record.dose}</td>
            <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(record.applied_at).toLocaleDateString('es-CO')}
            </td>
            <td className="px-4 py-3">
                <AlertBadge nextDate={record.next_date} />
            </td>
            <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-500">
                {record.notes ?? '—'}
            </td>
            <td className="px-4 py-3 text-sm text-gray-500">
                {record.registered_by?.name ?? '—'}
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
}
