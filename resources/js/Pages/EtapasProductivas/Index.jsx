import Modal from '@/Components/Modal';
import ModalFormProductiveStage from '@/Components/EtapasProductivas/ModalFormProductiveStage';
import ProductiveStageFilterBar from '@/Components/EtapasProductivas/ProductiveStageFilterBar';
import ProductiveStageTable from '@/Components/EtapasProductivas/ProductiveStageTable';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ stages, filters }) {
    const [showModalCrear, setShowModalCrear] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Etapas Productivas" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Etapas Productivas
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Administra las etapas productivas del hato (lactancia y
                        partos)
                    </p>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        add
                    </span>
                    Nueva etapa
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="md"
            >
                <ModalFormProductiveStage
                    onClose={() => setShowModalCrear(false)}
                />
            </Modal>

            <div className="space-y-4">
                <ProductiveStageFilterBar filters={filters} />
                <ProductiveStageTable stages={stages} />
            </div>
        </AuthenticatedLayout>
    );
}
