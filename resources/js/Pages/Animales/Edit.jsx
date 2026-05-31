import AnimalForm from '@/Components/Animales/Form/AnimalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { SiSwisscows } from 'react-icons/si';

export default function Edit({ animal, razas, categoriasAnimales }) {
    function handleCancel() {
        router.visit(route('animales.index'));
    }
    return (
        <AuthenticatedLayout>
            <Head title={`Editar animal · ${animal.ear_tag}`} />

            {/* Page header */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                    <SiSwisscows className="text-[24px] text-on-primary" />
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                        Inventario
                    </p>
                    <h1 className="text-2xl font-semibold text-on-surface">
                        Editar animal
                    </h1>
                </div>
            </div>

            <div className="rounded-2xl border border-outline-variant bg-surface p-6 shadow-sm">
                <AnimalForm
                    animal={animal}
                    razas={razas}
                    categoriasAnimal={categoriasAnimales}
                    onCancel={handleCancel}
                />
            </div>
        </AuthenticatedLayout>
    );
}
