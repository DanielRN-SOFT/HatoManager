import InputError from '@/Components/Auth/InputError';
import InputLabel from '@/Components/Auth/InputLabel';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import TextInput from '@/Components/Auth/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ConfirmPassword() {
    const [visible, setVisible] = useState(false);

    // ✅ Un solo useForm
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/user/confirm-password', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmar contraseña" />

            <div className="flex flex-col items-center px-8 pb-6 pt-2">
                <span className="mb-1 text-2xl font-bold tracking-tight text-primary">
                    HatoManager
                </span>
                <h1 className="text-center text-xl font-bold text-on-surface">
                    Zona segura
                </h1>
                <p className="mt-1 text-center text-sm text-on-surface-variant">
                    Confirma tu contraseña para continuar.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5 px-8 pb-8">
                <div className="flex items-start gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-3">
                    <span
                        className="material-symbols-outlined shrink-0 text-primary"
                        style={{ fontSize: '18px' }}
                    >
                        verified_user
                    </span>
                    <p className="text-xs leading-relaxed text-on-surface-variant">
                        Esta es un área protegida. Por seguridad, confirma tu
                        contraseña antes de continuar.
                    </p>
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type={visible ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            isFocused={true}
                            hasError={!!errors.password}
                            placeholder="••••••••"
                            className="pr-11"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        <button
                            type="button"
                            onClick={() => setVisible((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary"
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '20px' }}
                            >
                                {visible ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                <PrimaryButton disabled={processing}>
                    {processing ? 'Verificando...' : 'Confirmar contraseña'}
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
