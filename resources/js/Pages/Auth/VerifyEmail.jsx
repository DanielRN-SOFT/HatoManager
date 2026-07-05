import PrimaryButton from '@/Components/Auth/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar correo electrónico" />

            {/* Header de marca */}
            <div className="flex flex-col items-center px-8 pb-6 pt-2">
                <span className="mb-1 text-2xl font-bold tracking-tight text-primary">
                    HatoManager
                </span>
                <h1 className="text-center text-xl font-bold text-on-surface">
                    Verifica tu correo
                </h1>
                <p className="mt-1 text-center text-sm text-on-surface-variant">
                    Gestión ganadera inteligente y profesional.
                </p>
            </div>

            {/* Descripción */}
            <div className="mx-8 mb-5 rounded-lg bg-gray-100 px-4 py-3 text-sm text-on-secondary-container shadow-sm">
                ¡Gracias por registrarte. Antes de
                comenzar, verifica tu correo electrónico haciendo clic en el
                enlace que te enviamos. Si no lo recibiste, con gusto te
                enviaremos otro.
            </div>

            {/* Mensaje de éxito */}
            {status === 'verification-link-sent' && (
                <div className="mx-8 mb-5 rounded-lg bg-secondary-container px-4 py-3 text-sm font-medium text-on-secondary-container">
                    Se ha enviado un nuevo enlace de verificación al correo
                    registrado.
                </div>
            )}

            <form onSubmit={submit} className="space-y-5 px-8 pb-8">
                <PrimaryButton disabled={processing}>
                    {processing
                        ? 'Enviando...'
                        : 'Reenviar correo de verificación'}
                </PrimaryButton>

                <p className="pt-1 text-center text-sm text-on-surface-variant">
                    ¿Deseas salir?{' '}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="font-semibold text-primary hover:underline"
                    >
                        Cerrar sesión
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
