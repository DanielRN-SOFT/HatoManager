import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PiCowFill } from 'react-icons/pi';
import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mi Perfil" />

            {/* Page header */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                    <PiCowFill className="text-[26px] text-on-primary" />
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                        Configuración
                    </p>
                    <h1 className="text-2xl font-semibold text-on-surface">
                        Mi Perfil
                    </h1>
                </div>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Columna izquierda */}
                <div className="space-y-4">
                    {/* Información del perfil */}
                    <div className="rounded-2xl border border-outline-variant bg-surface p-6 shadow-sm">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="rounded-2xl border border-outline-variant bg-surface p-6 shadow-sm">
                        <UpdatePasswordForm />
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-4">
                    {/* 2FA */}
                    <div className="rounded-2xl border border-outline-variant bg-surface p-6 shadow-sm">
                        <TwoFactorAuthenticationForm />
                    </div>

                    {/* Tarjeta informativa de seguridad */}
                    <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-6">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container">
                                <span className="material-symbols-outlined text-[18px] text-on-primary">
                                    shield
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-on-surface">
                                Consejos de seguridad
                            </h3>
                        </div>
                        <ul className="space-y-2.5">
                            {[
                                {
                                    icon: 'check_circle',
                                    text: 'Activa la verificación en dos pasos para mayor protección.',
                                },
                                {
                                    icon: 'check_circle',
                                    text: 'Usa una contraseña única para esta cuenta.',
                                },
                                {
                                    icon: 'check_circle',
                                    text: 'No compartas tus credenciales con terceros.',
                                },
                                {
                                    icon: 'check_circle',
                                    text: 'Cierra sesión en dispositivos compartidos.',
                                },
                            ].map(({ icon, text }) => (
                                <li
                                    key={text}
                                    className="flex items-start gap-2.5"
                                >
                                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-[16px] text-primary">
                                        {icon}
                                    </span>
                                    <span className="text-xs leading-relaxed text-on-surface-variant">
                                        {text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
