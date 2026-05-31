import AnimalFilterBar from '@/Components/Animales/AnimalFilterBar';
import AnimalTable from '@/Components/Animales/AnimalTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { SiSwisscows } from 'react-icons/si';

export default function Index({ animales, filters, finca, razas, categorias }) {
    function handleEdit(animal) {
        router.visit(route('animales.edit', animal.id));
    }
    function handleNuevo() {
        router.visit(route('animales.create'));
    }
    return (
        <AuthenticatedLayout>
            <Head title="Inventario del hato" />

            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                        <SiSwisscows className="text-[24px] text-on-primary" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                            {finca.nombre}
                        </p>
                        <h1 className="text-2xl font-semibold text-on-surface">
                            Inventario del hato
                        </h1>
                    </div>
                </div>
                <button
                    onClick={handleNuevo}
                    className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        add_circle
                    </span>
                    Registrar animal
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <AnimalFilterBar
                        razas={razas}
                        categorias={categorias}
                        filters={filters}
                    />
                </div>
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                    <AnimalTable animales={animales} onEdit={handleEdit} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
