import Flash from '@/Components/Shared/Flash';
import VetFarmCard from '@/Components/Veterinarios/VetFarmCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MisVeterinarios({ farms }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mis Veterinarios" />

            <div className="">
                <Flash />

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 p-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-container sm:h-12 sm:w-12">
                            <span className="material-symbols-outlined text-[20px] text-on-primary sm:text-[24px]">
                                medical_services
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                Accesos
                            </p>
                            <h1 className="text-xl font-bold text-on-surface sm:text-2xl">
                                Mis Veterinarios
                            </h1>
                            <p className="mt-0.5 text-xs text-on-surface-variant">
                                Gestiona qué veterinarios tienen acceso al
                                estado sanitario de tus fincas.
                            </p>
                        </div>
                    </div>
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
