import AnimalForm from '@/Components/Animales/Form/AnimalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { SiSwisscows } from 'react-icons/si';

export default function Edit({ animal, razas, categoriasAnimales, lotes }) {
    function handleCancel() {
        router.visit(route('animals.index'));
    }
    return (
        <AuthenticatedLayout>
            <Head title={`Editar animal · ${animal.ear_tag}`} />

            <div className="p-6">
                <AnimalForm
                    animal={animal}
                    razas={razas}
                    categoriasAnimal={categoriasAnimales}
                    onCancel={handleCancel}
                    lotes={lotes}
                />
            </div>
        </AuthenticatedLayout>
    );
}
