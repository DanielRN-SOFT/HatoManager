import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mi Perfil" />

            <div className="max-w-2xl space-y-4">
                {/* Header */}
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                        Configuración
                    </p>
                    <h1 className="text-2xl font-semibold text-on-surface">
                        Mi Perfil
                    </h1>
                </div>

                {/* Información del perfil */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                {/* Contraseña */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <UpdatePasswordForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
