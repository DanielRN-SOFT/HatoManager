import AnimalForm from '@/Components/Animales/Form/AnimalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Create({ razas, categoriasAnimales }) {
    return (
        <AuthenticatedLayout>
            <Head title="Registrar animal" />
            <div className="p-6">
                <AnimalForm
                    razas={razas}
                    categoriasAnimal={categoriasAnimales}
                />
            </div>
        </AuthenticatedLayout>
    );
}
