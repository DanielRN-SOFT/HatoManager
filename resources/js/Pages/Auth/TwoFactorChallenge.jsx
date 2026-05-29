import InputLabel from '@/Components/Auth/InputLabel';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TwoFactorChallenge() {
    const [recovery, setRecovery] = useState(false);

    const form = useForm({
        code: '',
        recovery_code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post('/two-factor-challenge');
    };

    return (
        <GuestLayout>
            <Head title="Verificación en dos pasos" />

            <div className="flex flex-col items-center px-8 pb-6 pt-2">
                <h1 className="text-center text-xl font-bold text-on-surface">
                    Verificación en dos pasos
                </h1>
                <p className="mt-1 text-center text-sm text-on-surface-variant">
                    {!recovery
                        ? 'Ingresa el código de tu app autenticadora.'
                        : 'Ingresa uno de tus códigos de recuperación.'}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5 px-8 pb-8">
                {!recovery ? (
                    <div className="group relative">
                        <InputLabel htmlFor="code">
                            Código de autenticación
                        </InputLabel>
                        <div className="relative">
                            {/* Icono izquierdo */}
                            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-on-surface-variant/50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="5"
                                        y="11"
                                        width="14"
                                        height="10"
                                        rx="2"
                                    />
                                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                                </svg>
                            </span>
                            <input
                                id="code"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={form.data.code}
                                autoComplete="one-time-code"
                                autoFocus
                                placeholder="• • • • • •"
                                onChange={(e) =>
                                    form.setData('code', e.target.value)
                                }
                                className={`w-full rounded-lg border bg-surface-container-lowest py-3 pl-10 pr-4 text-center text-lg font-bold tracking-[0.5em] text-on-surface transition-all duration-200 placeholder:tracking-[0.4em] placeholder:text-on-surface-variant/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                                    form.errors.code
                                        ? 'border-error focus:border-error focus:ring-error/30'
                                        : 'border-outline-variant hover:border-outline'
                                } `}
                            />
                        </div>
                        {form.errors.code && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {form.errors.code}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="group relative">
                        <InputLabel htmlFor="recovery_code">
                            Código de recuperación
                        </InputLabel>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-on-surface-variant/50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7m2 4V7" />
                                </svg>
                            </span>
                            <input
                                id="recovery_code"
                                type="text"
                                autoFocus
                                value={form.data.recovery_code}
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                onChange={(e) =>
                                    form.setData(
                                        'recovery_code',
                                        e.target.value,
                                    )
                                }
                                className={`w-full rounded-lg border bg-surface-container-lowest py-3 pl-10 pr-4 font-mono text-sm text-on-surface transition-all duration-200 placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                                    form.errors.recovery_code
                                        ? 'border-error focus:border-error focus:ring-error/30'
                                        : 'border-outline-variant hover:border-outline'
                                } `}
                            />
                        </div>
                        {form.errors.recovery_code && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {form.errors.recovery_code}
                            </p>
                        )}
                    </div>
                )}

                {/* Botón principal */}
                <button
                    type="submit"
                    disabled={form.processing}
                    className="relative w-full overflow-hidden rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {form.processing ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                />
                            </svg>
                            Verificando...
                        </span>
                    ) : (
                        'Verificar'
                    )}
                </button>

                {/* Toggle recuperación */}
                <p className="pt-1 text-center text-sm text-on-surface-variant">
                    <button
                        type="button"
                        onClick={() => {
                            setRecovery(!recovery);
                            form.setData({ code: '', recovery_code: '' });
                        }}
                        className="font-semibold text-primary hover:underline"
                    >
                        {recovery
                            ? '← Usar código de autenticadora'
                            : 'Usar código de recuperación →'}
                    </button>
                </p>
            </form>
        </GuestLayout>
    );
}
