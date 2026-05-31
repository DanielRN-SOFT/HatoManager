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
                <div className="mb-6 flex items-center">
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>
                        Volver
                    </button>
                </div>
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
