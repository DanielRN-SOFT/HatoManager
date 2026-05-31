// resources/js/Pages/Animales/Index.jsx
import AnimalFilterBar from '@/Components/Animales/AnimalFilterBar';
import AnimalTable from '@/Components/Animales/AnimalTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { SiSwisscows } from 'react-icons/si';

export default function Index({ animales, filters, finca }) {
    function handleEdit(animal) {
        router.visit(route('animales.edit', animal.id));
    }

    function handleNuevo() {
        router.visit(route('animales.create'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Inventario del hato" />
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-on-surface">
                            <SiSwisscows className='inline-block mr-2' />
                            Inventario del hato
                        </h2>
                        <p className="mt-0.5 text-sm text-on-surface-variant">
                            <span className="font-semibold text-primary">
                                {finca.nombre}
                            </span>
                            <span className="mx-2 opacity-30">·</span>
                            {animales.total} cabezas activas
                        </p>
                    </div>
                    <button
                        onClick={handleNuevo}
                        className="flex w-fit items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            add_circle
                        </span>
                        Registrar animal
                    </button>
                </div>
                <AnimalFilterBar filters={filters} />
                <AnimalTable animales={animales} onEdit={handleEdit} />
            </div>
        </AuthenticatedLayout>
    );
}
