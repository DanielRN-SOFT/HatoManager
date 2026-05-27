import InputError from '@/Components/Auth/InputError';
import InputLabel from '@/Components/Auth/InputLabel';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import TextInput from '@/Components/Auth/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

function RoleSelector({ value, onChange }) {
    const roles = [
        { id: 'ganadero', label: 'Ganadero', icon: 'agriculture' },
        { id: 'comprador', label: 'Comprador', icon: 'shopping_bag' },
    ];

    return (
        <div className="mb-6 grid grid-cols-2 gap-3">
            {roles.map((role) => {
                const selected = value === role.id;
                return (
                    <button
                        key={role.id}
                        type="button"
                        onClick={() => onChange(role.id)}
                        className={
                            'flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 p-4 transition-all duration-200 ' +
                            (selected
                                ? 'border-primary-container bg-primary-container/10'
                                : 'border-outline-variant bg-transparent hover:border-primary-container/50')
                        }
                    >
                        <span
                            className={
                                'material-symbols-outlined ' +
                                (selected
                                    ? 'text-primary'
                                    : 'text-on-surface-variant')
                            }
                            style={{ fontSize: '32px' }}
                        >
                            {role.icon}
                        </span>
                        <span
                            className={
                                'text-sm font-bold ' +
                                (selected
                                    ? 'text-primary'
                                    : 'text-on-surface-variant')
                            }
                        >
                            {role.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

function PasswordStrength({ password }) {
    const getStrength = (pwd) => {
        if (!pwd) return 0;
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score;
    };

    const strength = getStrength(password);
    const colors = [
        'bg-surface-container-high',
        'bg-error',
        'bg-tertiary',
        'bg-secondary',
        'bg-primary',
    ];
    const labels = ['', 'Muy débil', 'Débil', 'Buena', 'Fuerte'];

    return (
        <div className="mt-2 space-y-1">
            <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={
                            'h-1.5 flex-1 rounded-full transition-all duration-300 ' +
                            (i <= strength
                                ? colors[strength]
                                : 'bg-surface-container-high')
                        }
                    />
                ))}
            </div>
            {password.length > 0 && (
                <p className="text-xs text-on-surface-variant">
                    {labels[strength]}
                </p>
            )}
        </div>
    );
}

function PasswordInput({
    id,
    name,
    value,
    onChange,
    hasError,
    placeholder,
    autoComplete,
}) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <TextInput
                id={id}
                type={visible ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                hasError={hasError}
                autoComplete={autoComplete}
                placeholder={placeholder ?? '••••••••'}
                className="border-outline-variant pr-11 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
                type="button"
                onClick={() => setVisible(!visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-on-surface"
                aria-label={
                    visible ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
            >
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px' }}
                >
                    {visible ? 'visibility' : 'visibility_off'}
                </span>
            </button>
        </div>
    );
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'ganadero',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Crear cuenta" />

            <div className="flex flex-col items-center px-8 pb-6 pt-2">
                <span className="mb-1 text-2xl font-bold tracking-tight text-primary">
                    HatoManager
                </span>
                <h1 className="text-center text-xl font-bold text-on-surface">
                    Crea tu cuenta
                </h1>
                <p className="mt-1 text-center text-sm text-on-surface-variant">
                    Únete a la red ganadera más grande de Colombia
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5 px-8 pb-8">
                <RoleSelector
                    value={data.role}
                    onChange={(role) => setData('role', role)}
                />

                <div>
                    <InputLabel htmlFor="name" value="Nombre completo" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        isFocused={true}
                        hasError={!!errors.name}
                        placeholder="Ej. Juan Pérez"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        hasError={!!errors.email}
                        placeholder="ej. juan@rancho.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <PasswordInput
                        id="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        hasError={!!errors.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <PasswordStrength password={data.password} />
                    <InputError message={errors.password} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar contraseña"
                    />
                    <PasswordInput
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        hasError={!!errors.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <PrimaryButton disabled={processing} className="mt-2">
                    {processing ? 'Creando cuenta...' : 'Crear cuenta'}
                </PrimaryButton>

                <p className="pt-1 text-center text-sm text-on-surface-variant">
                    ¿Ya tienes cuenta?{' '}
                    <Link
                        href={route('login')}
                        className="font-semibold text-primary hover:underline"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
