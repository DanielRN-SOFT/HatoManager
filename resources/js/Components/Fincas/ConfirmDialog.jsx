export default function ConfirmDialog({ farm, onConfirm, onCancel }) {
    if (!farm) return null;
    return (
        <div className="p-6">
            <div className="mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-[28px] text-error">
                    warning
                </span>
                <h2 className="text-base font-semibold text-on-surface">
                    ¿Desactivar finca?
                </h2>
            </div>
            <p className="mb-5 text-sm text-on-surface-variant">
                La finca{' '}
                <span className="font-medium text-on-surface">
                    "{farm.name}"
                </span>{' '}
                pasará a modo solo lectura. No podrás agregar nuevos animales,
                eventos sanitarios ni subastas, pero conservarás todo el
                historial.
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
                    Sí, desactivar
                </button>
            </div>
        </div>
    );
}
