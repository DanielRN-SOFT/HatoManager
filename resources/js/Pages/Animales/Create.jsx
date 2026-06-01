import AnimalForm from '@/Components/Animales/Form/AnimalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { SiSwisscows } from 'react-icons/si';

export default function Create({ razas, categoriasAnimales }) {
    function handleCancel() {
        router.visit(route('animals.index'));
    }
    return (
        <AuthenticatedLayout>
            <Head title="Registrar animal" />

            {/* Page header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                        <SiSwisscows className="text-[24px] text-on-primary" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                            Inventario
                        </p>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Registrar animal
                        </h1>
                    </div>
                </div>

                <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                    </span>
                    Volver
                </button>
            </div>

            <div className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
                <AnimalForm
                    razas={razas}
                    categoriasAnimal={categoriasAnimales}
                    onCancel={handleCancel}
                />
            </div>
        </AuthenticatedLayout>
    );
}
