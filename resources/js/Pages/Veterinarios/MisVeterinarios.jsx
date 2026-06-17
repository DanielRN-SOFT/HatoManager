import Flash from '@/Components/Shared/Flash';
import VetFarmCard from '@/Components/Veterinarios/VetFarmCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MisVeterinarios({ farms }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mis Veterinarios" />

            <div className="px-4 py-6">
                <Flash />

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Mis Veterinarios
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Gestiona qué veterinarios tienen acceso al estado
                        sanitario de tus fincas.
                    </p>
                </div>

                {farms.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
                        <span className="material-symbols-outlined mb-3 text-5xl text-gray-300">
                            agriculture
                        </span>
                        <p className="font-medium text-gray-600">
                            Sin fincas registradas
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                            Primero debes registrar una finca para poder invitar
                            veterinarios.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {farms.map((farm) => (
                            <VetFarmCard key={farm.id} farm={farm} />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
