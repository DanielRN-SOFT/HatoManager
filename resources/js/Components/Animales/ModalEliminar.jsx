import { router } from '@inertiajs/react';

const ModalEliminar = ({ animal, onClose }) => {

    const handleEliminar = () => {
        router.delete(route('animals.destroy', animal.id), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="p-6">
            {/* Ícono */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <span className="material-symbols-outlined text-2xl text-red-600">
                    delete
                </span>
            </div>

            {/* Texto */}
            <h3 className="mb-1 text-center text-base font-semibold text-gray-800">
                ¿Eliminar animal?
            </h3>
            <p className="mb-1 text-center text-sm text-gray-500">
                Vas a eliminar a{' '}
                <span className="font-medium text-gray-700">{animal?.name}</span>{' '}
                (arete{' '}
                <span className="font-medium text-gray-700">
                    {animal?.ear_tag}
                </span>
                ).
            </p>
            <p className="mb-6 text-center text-xs text-gray-600">
                El registro no se borrará permanentemente y podrás reactivarlo
                luego.
            </p>

            {/* Acciones */}
            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleEliminar}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
                >
                    Sí, eliminar
                </button>
            </div>
        </div>
    );
};

export default ModalEliminar;
