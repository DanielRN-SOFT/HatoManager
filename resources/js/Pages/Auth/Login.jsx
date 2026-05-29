import InputError from '@/Components/Auth/InputError';
import InputLabel from '@/Components/Auth/InputLabel';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import TextInput from '@/Components/Auth/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ canResetPassword, status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />

            {/* Header de marca */}
            <div className="flex flex-col items-center px-8 pb-6 pt-2">
                <span className="mb-1 text-2xl font-bold tracking-tight text-primary">
                    HatoManager
                </span>
                <h1 className="text-center text-xl font-bold text-on-surface">
                    Bienvenido de nuevo
                </h1>
                <p className="mt-1 text-center text-sm text-on-surface-variant">
                    Gestión ganadera inteligente y profesional.
                </p>
            </div>

            {/* Mensaje de estado (ej. "contraseña restablecida") */}
            {status && (
                <div className="mx-8 mb-4 rounded-lg bg-secondary-container px-4 py-3 text-sm font-medium text-on-secondary-container">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5 px-8 pb-8">
                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
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

                {/* Contraseña */}
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        hasError={!!errors.password}
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                {/* Recordarme + Olvidé contraseña */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route('password.request')}
                        className="text-sm font-semibold text-primary hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                {/* Botón */}
                <PrimaryButton disabled={processing}>
                    {processing ? 'Ingresando...' : 'Iniciar sesión'}
                </PrimaryButton>

                {/* Link a registro */}
                <p className="pt-1 text-center text-sm text-on-surface-variant">
                    ¿No tienes cuenta?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-primary hover:underline"
                    >
                        Regístrate
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
