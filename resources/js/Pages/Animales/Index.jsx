import AnimalFilterBar from '@/Components/Animales/AnimalFilterBar';
import AnimalTable from '@/Components/Animales/AnimalTable';
import Header from '@/Components/Animales/Header';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ animales, filters, finca, razas, categorias }) {
    return (
        <AuthenticatedLayout>
            <Head title="Inventario del hato" />

            <Header finca={finca} />

            <Flash />

            <div className="space-y-4">
                <div>
                    <AnimalFilterBar
                        razas={razas}
                        categorias={categorias}
                        filters={filters}
                    />
                </div>

                <AnimalTable animales={animales} />
            </div>
        </AuthenticatedLayout>
    );
}
