export default function ConfirmDeleteRecord({ record, onConfirm, onCancel }) {
    if (!record) return null;
    return (
        <div className="p-6">
            <div className="mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px] text-error">
                    warning
                </span>
                <h2 className="text-base font-semibold text-on-surface">
                    ¿Eliminar registro?
                </h2>
            </div>
            <p className="mb-5 text-sm text-on-surface-variant">
                El registro de{' '}
                <span className="font-medium text-on-surface">
                    "{record.product}"
                </span>{' '}
                será eliminado permanentemente junto con su alerta programada.
            </p>
            <div className="flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    className="rounded-lg border border-outline-variant px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    className="rounded-lg bg-error px-4 py-2 text-sm font-medium text-on-error transition-opacity hover:opacity-90"
                >
                    Sí, eliminar
                </button>
            </div>
        </div>
    );
}
