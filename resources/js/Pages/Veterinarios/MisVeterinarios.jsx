import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import Flash from '@/Components/Shared/Flash';
import VetFarmCard from '@/Components/Veterinarios/VetFarmCard';

export default function MisVeterinarios({ farms }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mis Veterinarios" />

            <div className="mx-auto max-w-3xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-on-surface">
                        Mis Veterinarios
                    </h1>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        Gestiona qué veterinarios tienen acceso al estado
                        sanitario de tus fincas.
                    </p>
                </div>

                <Flash />

                {farms.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low px-6 py-12 text-center">
                        <span className="material-symbols-outlined mb-3 text-[40px] text-on-surface-variant">
                            agriculture
                        </span>
                        <p className="font-medium text-on-surface">
                            Sin fincas registradas
                        </p>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            Primero debes registrar una finca para poder invitar
                            veterinarios.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {farms.map((farm) => (
                            <VetFarmCard key={farm.id} farm={farm} />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
