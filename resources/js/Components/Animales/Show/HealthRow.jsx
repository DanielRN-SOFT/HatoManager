import { useState } from "react";

const HealthRow = ({ record, fmt }) => {
    const HEALTH_TYPE_STYLES = {
        vacuna: {
            icon: 'vaccines',
            cls: 'bg-blue-50 text-blue-600',
            label: 'Vacuna',
        },
        desparasitacion: {
            icon: 'bug_report',
            cls: 'bg-amber-50 text-amber-600',
            label: 'Desparasitación',
        },
        tratamiento: {
            icon: 'medication',
            cls: 'bg-red-50 text-red-600',
            label: 'Tratamiento',
        },
        revision: {
            icon: 'stethoscope',
            cls: 'bg-green-50 text-green-600',
            label: 'Revisión',
        },
        cirugia: {
            icon: 'surgical',
            cls: 'bg-purple-50 text-purple-600',
            label: 'Cirugía',
        },
    };

    const [open, setOpen] = useState(false);
    const type = HEALTH_TYPE_STYLES[record.type] ?? {
        icon: 'medical_services',
        cls: 'bg-gray-50 text-gray-600',
        label: record.type,
    };

    return (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 transition hover:border-gray-200 hover:bg-white">
            <div
                className="flex cursor-pointer items-center justify-between gap-3"
                onClick={() => setOpen((o) => !o)}
            >
                <div className="flex items-center gap-3">
                    <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${type.cls}`}
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            {type.icon}
                        </span>
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            {record.product}
                        </p>
                        <p className="text-[11px] text-gray-400">
                            {type.label} · {fmt(record.applied_at)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {record.dose && (
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                            {record.dose}
                        </span>
                    )}
                    {record.next_date && (
                        <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-600">
                            Próx: {fmt(record.next_date)}
                        </span>
                    )}
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                        {open ? 'expand_less' : 'expand_more'}
                    </span>
                </div>
            </div>
            {open && record.notes && (
                <p className="mt-2 border-t border-gray-100 pt-2 text-xs text-gray-500">
                    {record.notes}
                </p>
            )}
        </div>
    );
};

export default HealthRow;
