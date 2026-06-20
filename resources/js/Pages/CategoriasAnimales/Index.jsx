import AnimalCategoryFilterBar from '@/Components/CategoriasAnimales/AnimalCategoryFilterBar';
import AnimalCategoryTable from '@/Components/CategoriasAnimales/AnimalCategoryTable';
import ModalFormAnimalCategory from '@/Components/CategoriasAnimales/ModalFormAnimalCategory';
import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ categories, filters }) {
    const [showModalCrear, setShowModalCrear] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Categorías de Animales" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Categorías de Animales
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Administra las categorías para clasificar los animales
                        del hato
                    </p>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        add
                    </span>
                    Nueva categoría
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="sm"
            >
                <ModalFormAnimalCategory
                    onClose={() => setShowModalCrear(false)}
                />
            </Modal>

            <div className="space-y-4">
                <AnimalCategoryFilterBar filters={filters} />
                <AnimalCategoryTable categories={categories} />
            </div>
        </AuthenticatedLayout>
    );
}
