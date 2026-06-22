import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import ModalFormTypeGrass from '@/Components/TiposPasto/ModalFormTypeGrass';
import TypeGrassFilterBar from '@/Components/TiposPasto/TypeGrassFilterBar';
import TypeGrassTable from '@/Components/TiposPasto/TypeGrassTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ grasses, filters }) {
    const [showModalCrear, setShowModalCrear] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Tipos de Pasto" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Tipos de Pasto
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Administra los tipos de pasto disponibles para los
                        potreros
                    </p>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        add
                    </span>
                    Nuevo tipo de pasto
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="sm"
            >
                <ModalFormTypeGrass onClose={() => setShowModalCrear(false)} />
            </Modal>

            <div className="space-y-4">
                <TypeGrassFilterBar filters={filters} />
                <TypeGrassTable grasses={grasses} />
            </div>
        </AuthenticatedLayout>
    );
}
