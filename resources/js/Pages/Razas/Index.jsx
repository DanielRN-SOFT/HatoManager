import BreedFilterBar from '@/Components/Razas/BreedFilterBar';
import BreedTable from '@/Components/Razas/BreedTable';
import ModalFormBreed from '@/Components/Razas/ModalFormBreed';
import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ breeds, filters }) {
    const [showModalCrear, setShowModalCrear] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Razas" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Razas</h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Administra las razas disponibles para el registro de
                        animales
                    </p>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        add
                    </span>
                    Nueva raza
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="sm"
            >
                <ModalFormBreed onClose={() => setShowModalCrear(false)} />
            </Modal>

            <div className="space-y-4">
                <BreedFilterBar filters={filters} />
                <BreedTable breeds={breeds} />
            </div>
        </AuthenticatedLayout>
    );
}
