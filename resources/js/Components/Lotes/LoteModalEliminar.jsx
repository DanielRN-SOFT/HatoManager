import { useForm } from '@inertiajs/react';

const LoteModalEliminar = ({ paddock, onClose }) => {
    const { delete: destroy, processing } = useForm();

    function handleEliminar() {
        destroy(route('paddocks.destroy', paddock.id), {
            preserveScroll: true,
            onSuccess: onClose,
        });
    }

    if (!paddock) return null;

    return (
        <div className="p-6">
            {/* Ícono */}
            <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                    <span className="material-symbols-outlined text-[28px] text-red-500">
                        monitor_weight
                    </span>
                </div>
            </div>

            {/* Texto */}
            <h2 className="mb-1 text-center text-base font-bold text-gray-800">
                ¿Eliminar método?
            </h2>
            <p className="mb-1 text-center text-sm text-gray-500">
                Vas a eliminar{' '}
                <span className="font-semibold text-gray-700">
                    "{paddock.name}"
                </span>
                .
            </p>
            <p className="text-center text-xs text-gray-400">
                Podrás restaurarlo en cualquier momento desde el listado.
            </p>

            {/* Acciones */}
            <div className="mt-6 flex justify-end gap-2">
                <button
                    onClick={onClose}
                    className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleEliminar}
                    disabled={processing}
                    className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                    {processing && (
                        <span className="material-symbols-outlined animate-spin text-[16px]">
                            progress_activity
                        </span>
                    )}
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default LoteModalEliminar;
