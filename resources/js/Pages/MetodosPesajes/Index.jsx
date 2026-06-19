import ModalFormWeightMethod from '@/Components/MetodosPesajes/ModalFormWeightMethod';
import WeightMethodFilterBar from '@/Components/MetodosPesajes/WeightMethodFilterBar';
import WeightMethodTable from '@/Components/MetodosPesajes/WeightMethodTable';
import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ methods, filters }) {
    const [showModalCrear, setShowModalCrear] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Métodos de Pesaje" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Métodos de Pesaje
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Administra los métodos disponibles para registrar
                        pesajes
                    </p>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        add
                    </span>
                    Nuevo método
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="sm"
            >
                <ModalFormWeightMethod
                    onClose={() => setShowModalCrear(false)}
                />
            </Modal>

            <div className="space-y-4">
                <WeightMethodFilterBar filters={filters} />
                <WeightMethodTable methods={methods} />
            </div>
        </AuthenticatedLayout>
    );
}
