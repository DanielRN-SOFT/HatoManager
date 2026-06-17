import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function VetRow({ vet, farm }) {
    const [showModal, setShowModal] = useState(false);

    function unlink() {
        router.delete(
            route('veterinarians.unlink', {
                farm: farm.id,
                veterinarian: vet.id,
            }),
            {
                preserveState: false,
                onSuccess: () => setShowModal(false),
            },
        );
    }

    return (
        <>
            <Modal
                show={showModal}
                maxWidth="sm"
                closeable={true}
                onClose={() => setShowModal(false)}
            >
                <div className="p-6">
                    {/* Ícono */}
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <span className="material-symbols-outlined text-2xl text-red-600">
                            link_off
                        </span>
                    </div>

                    {/* Texto */}
                    <h3 className="mb-1 text-center text-base font-semibold text-gray-800">
                        ¿Desvincular veterinario?
                    </h3>
                    <p className="mb-1 text-center text-sm text-gray-500">
                        Vas a desvincular a{' '}
                        <span className="font-medium text-gray-700">
                            {vet.name}
                        </span>{' '}
                        de{' '}
                        <span className="font-medium text-gray-700">
                            {farm.name}
                        </span>
                        .
                    </p>
                    <p className="mb-6 text-center text-xs text-gray-400">
                        Perderá el acceso inmediatamente al inventario y datos
                        sanitarios de esta finca.
                    </p>

                    {/* Acciones */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowModal(false)}
                            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={unlink}
                            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
                        >
                            Sí, desvincular
                        </button>
                    </div>
                </div>
            </Modal>

            <tr className="border-b border-gray-100 transition hover:bg-gray-50">
                <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-primary">
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: 16 }}
                            >
                                medical_services
                            </span>
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                            {vet.name}
                        </span>
                    </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">{vet.email}</td>
                <td className="px-6 py-3 text-right">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:border-red-300 hover:text-red-500"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 14 }}
                        >
                            link_off
                        </span>
                        Desvincular
                    </button>
                </td>
            </tr>
        </>
    );
}
