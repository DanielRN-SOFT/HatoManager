import AnimalFilterBar from '@/Components/Animales/AnimalFilterBar';
import AnimalForm from '@/Components/Animales/AnimalForm';
import AnimalTable from '@/Components/Animales/AnimalTable';
import SlideOver from '@/Components/Animales/SlideOver';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ animales, filters, stats, finca }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingAnimal, setEditingAnimal] = useState(null);

    function handleEdit(animal) {
        setEditingAnimal(animal);
        setDrawerOpen(true);
    }
    function handleNuevo() {
        setEditingAnimal(null);
        setDrawerOpen(true);
    }
    function handleClose() {
        setDrawerOpen(false);
        setEditingAnimal(null);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Inventario del hato" />
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-on-surface">
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

            <SlideOver
                open={drawerOpen}
                onClose={handleClose}
                title={
                    editingAnimal
                        ? `Editando: ${editingAnimal.ear_tag}`
                        : 'Registrar animal'
                }
            >
                <AnimalForm animal={editingAnimal} onCancel={handleClose} />
            </SlideOver>
        </AuthenticatedLayout>
    );
}
