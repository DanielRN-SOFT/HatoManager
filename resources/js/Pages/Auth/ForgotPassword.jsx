import InputError from '@/Components/Auth/InputError';
import InputLabel from '@/Components/Auth/InputLabel';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import TextInput from '@/Components/Auth/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar contraseña" />

            <div className="flex flex-col items-center px-8 pb-6 pt-2">
                <span className="mb-1 text-2xl font-bold tracking-tight text-primary">
                    HatoManager
                </span>
                <h1 className="text-center text-xl font-bold text-on-surface">
                    ¿Olvidaste tu contraseña?
                </h1>
                <p className="mt-1 text-center text-sm text-on-surface-variant">
                    Te enviaremos un enlace para restablecerla.
                </p>
            </div>

            <div className="space-y-5 px-8 pb-8">
                {/* Mensaje de éxito */}
                {status && (
                    <div className="flex items-start gap-3 rounded-lg border border-secondary-container bg-secondary-container/30 p-3">
                        <span
                            className="material-symbols-outlined shrink-0 text-secondary"
                            style={{ fontSize: '18px' }}
                        >
                            mark_email_read
                        </span>
                        <p className="text-xs leading-relaxed text-on-surface-variant">
                            {status}
                        </p>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Correo electrónico"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            isFocused={true}
                            hasError={!!errors.email}
                            placeholder="ej. juan@rancho.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <PrimaryButton disabled={processing}>
                        {processing ? 'Enviando...' : 'Enviar enlace'}
                    </PrimaryButton>
                </form>

                <p className="text-center text-sm text-on-surface-variant">
                    <Link
                        href={route('login')}
                        className="font-semibold text-primary hover:underline"
                    >
                        Volver al inicio de sesión
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
