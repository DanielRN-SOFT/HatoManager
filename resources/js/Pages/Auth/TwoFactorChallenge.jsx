import { useForm } from '@inertiajs/react';
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
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
                <h2 className="mb-2 text-2xl font-bold">
                    Verificación en dos pasos
                </h2>

                {!recovery ? (
                    <p className="mb-6 text-gray-600">
                        Ingresa el código de tu app autenticadora.
                    </p>
                ) : (
                    <p className="mb-6 text-gray-600">
                        Ingresa uno de tus códigos de recuperación.
                    </p>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {!recovery ? (
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Código (6 dígitos)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={form.data.code}
                                onChange={(e) =>
                                    form.setData('code', e.target.value)
                                }
                                autoFocus
                                autoComplete="one-time-code"
                                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {form.errors.code && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.code}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Código de recuperación
                            </label>
                            <input
                                type="text"
                                value={form.data.recovery_code}
                                onChange={(e) =>
                                    form.setData(
                                        'recovery_code',
                                        e.target.value,
                                    )
                                }
                                autoFocus
                                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {form.errors.recovery_code && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.errors.recovery_code}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setRecovery(!recovery)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            {recovery
                                ? 'Usar código de autenticadora'
                                : 'Usar código de recuperación'}
                        </button>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {form.processing ? 'Verificando...' : 'Verificar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
