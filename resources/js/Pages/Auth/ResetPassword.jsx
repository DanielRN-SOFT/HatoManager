import InputError from '@/Components/Auth/InputError';
import InputLabel from '@/Components/Auth/InputLabel';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import TextInput from '@/Components/Auth/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

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
                className="pr-11"
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary"
                aria-label={
                    visible ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
            >
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px' }}
                >
                    {visible ? 'visibility_off' : 'visibility'}
                </span>
            </button>
        </div>
    );
}

function PasswordStrength({ password }) {
    const getStrength = (pwd) => {
        if (!pwd) return 0;
        if (pwd.length >= 10 && /[^A-Za-z0-9]/.test(pwd)) return 3;
        if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 2;
        if (pwd.length > 0) return 1;
        return 0;
    };

    const strength = getStrength(password);

    const segmentColor = (index) => {
        if (index > strength) return 'bg-surface-container-high';
        if (strength === 1) return 'bg-error';
        if (strength === 2) return 'bg-tertiary';
        return 'bg-primary';
    };

    const label = ['', 'Débil', 'Moderada', 'Fuerte'];
    const labelColor = ['', 'text-error', 'text-tertiary', 'text-primary'];

    return (
        <div className="space-y-1.5 pt-1">
            <div className="flex h-1.5 w-full gap-1">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={
                            'flex-1 rounded-full transition-all duration-300 ' +
                            segmentColor(i)
                        }
                    />
                ))}
            </div>
            <div className="flex items-center justify-between">
                <span
                    className={
                        'text-xs font-medium transition-colors ' +
                        (strength > 0
                            ? labelColor[strength]
                            : 'text-on-surface-variant')
                    }
                >
                    {strength > 0 ? label[strength] : 'Nivel de seguridad'}
                </span>
                <span className="text-xs italic text-outline">
                    Usa símbolos y números
                </span>
            </div>
        </div>
    );
}

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Restablecer contraseña" />

            <div className="flex flex-col items-center px-8 pb-6 pt-2">
                <span className="mb-1 text-2xl font-bold tracking-tight text-primary">
                    HatoManager
                </span>
                <h1 className="text-center text-xl font-bold text-on-surface">
                    Nueva contraseña
                </h1>
                <p className="mt-1 text-center text-sm text-on-surface-variant">
                    Asegura tu cuenta con una clave robusta.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5 px-8 pb-8">
                {/* Email (readonly, solo referencia) */}
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        hasError={!!errors.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                {/* Nueva contraseña */}
                <div>
                    <InputLabel htmlFor="password" value="Nueva contraseña" />
                    <PasswordInput
                        id="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        hasError={!!errors.password}
                        placeholder="Mínimo 8 caracteres"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <PasswordStrength password={data.password} />
                    <InputError message={errors.password} />
                </div>

                {/* Confirmar contraseña */}
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
                        placeholder="Repite tu contraseña"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                {/* Nota de seguridad */}
                <div className="flex items-start gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-3">
                    <span
                        className="material-symbols-outlined shrink-0 text-primary"
                        style={{ fontSize: '18px' }}
                    >
                        verified_user
                    </span>
                    <p className="text-xs leading-relaxed text-on-surface-variant">
                        HatoManager utiliza encriptación de grado bancario para
                        proteger tus datos de producción.
                    </p>
                </div>

                {/* Botón */}
                <PrimaryButton disabled={processing}>
                    {processing ? 'Guardando...' : 'Guardar contraseña'}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
