import { useState } from "react";

const ConfirmDeleteRecord = ({ record, onConfirm, onCancel }) => {
    if (!record) return null;
    const [isDisabling, setIsDisabling] = useState(false);

    const handleConfirm = async () => {
        setIsDisabling(true); // Desactiva el botón inmediatamente

        try {
            onConfirm();
        } catch (error) {
            console.error(error);
            setIsDisabling(false); // Vuelve a activarlo si ocurre un error
        }
    };

    console.log(record);
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
                El registro con fecha y hora:{' '}
                <span className="font-semibold text-on-surface">
                    {record.weight_date}
                </span>{' '}
                de{' '}
                <span className="font-semibold text-on-surface">
                    "{record.animal.name}"
                </span>{' '}
                con pesaje:{' '}
                <span className="font-semibold text-on-surface">
                    "{record.weight}" KG
                </span>{' '}
                será eliminado, puedes restablecerlo despues.
            </p>
            <div className="flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    className="rounded-lg border border-outline-variant px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={isDisabling} 
                    className="rounded-lg bg-error px-4 py-2 text-sm font-medium text-on-error transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    Sí, eliminar
                </button>
            </div>
        </div>
    );
};

export default ConfirmDeleteRecord;
