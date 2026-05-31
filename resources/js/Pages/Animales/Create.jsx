// resources/js/Pages/Animales/Create.jsx
import AnimalForm from '@/Components/Animales/Form/AnimalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Create({ razas, categoriasAnimales }) {
    function handleCancel() {
        router.visit(route('animales.index'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Registrar animal" />
            <div className="">
                <div className="rounded-2xl bg-white p-8 shadow-sm shadow-black/5">
                    <AnimalForm
                        razas={razas}
                        categoriasAnimal={categoriasAnimales}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
