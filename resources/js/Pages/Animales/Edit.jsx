// resources/js/Pages/Animales/Edit.jsx
import AnimalForm from '@/Components/Animales/Form/AnimalForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Edit({ animal, razas, categoriasAnimales }) {
    function handleCancel() {
        router.visit(route('animales.index'));
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Editar animal · ${animal.ear_tag}`} />
            <div className="px-4 py-6">
                <div className="mb-6 flex items-center gap-3">
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>
                        Volver
                    </button>
                    <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                        Arete #{animal.ear_tag}
                    </span>
                </div>
                <div className="rounded-2xl bg-white p-8 shadow-sm shadow-black/5">
                    <AnimalForm
                        animal={animal}
                        razas={razas}
                        categoriasAnimal={categoriasAnimales}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
