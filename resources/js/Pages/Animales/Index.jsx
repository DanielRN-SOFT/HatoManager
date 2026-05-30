// resources/js/Pages/Inventario/Index.jsx
import AnimalFilterBar from '@/Components/Ganado/AnimalFilterBar';
import AnimalForm from '@/Components/Ganado/AnimalForm';
import AnimalTable from '@/Components/Ganado/AnimalTable';
import HatoStatCards from '@/Components/Ganado/HatoStatCards';
import SlideOver from '@/Components/SlideOver';
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

            <div className="flex-1 space-y-6 p-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-headline-lg font-bold text-on-surface">
                            Inventario del hato
                        </h2>
                        <p className="text-body-md text-on-surface-variant">
                            {finca.nombre} • {animales.total} cabezas activas
                        </p>
                    </div>
                    <button
                        onClick={handleNuevo}
                        className="flex items-center gap-2 rounded-xl bg-primary-container px-6 py-3 font-bold text-on-primary-container shadow-sm transition-all hover:opacity-90 active:scale-95"
                    >
                        <span className="material-symbols-outlined">
                            add_circle
                        </span>
                        Registrar animal
                    </button>
                </div>

                {/* Filtros */}
                <AnimalFilterBar filters={filters} />

                {/* Tabla */}
                <AnimalTable animales={animales} onEdit={handleEdit} />

                {/* Stats */}
                <HatoStatCards stats={stats} />
            </div>

            {/* Drawer — fuera del contenedor principal */}
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
