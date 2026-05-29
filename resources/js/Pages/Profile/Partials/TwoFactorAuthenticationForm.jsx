import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/Auth/PrimaryButton';

// Helper para obtener el CSRF token que Laravel requiere
function getCsrf() {
    return document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
}

// Reemplaza tu fortifyFetch actual por esta versión
async function fortifyFetch(url, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(getCsrf() ?? ''),
    };

    const res = await fetch(url, {
        method,
        headers,
        credentials: 'same-origin',
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    // Fortify devuelve 423 cuando la contraseña no ha sido confirmada
    if (res.status === 423) {
        // Guarda la URL actual para que Laravel redirija de vuelta al confirmar
        window.location.href = `/user/confirm-password?redirect=${encodeURIComponent(window.location.pathname)}`;
        return; // Detiene la ejecución
    }

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Error ${res.status}`);
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

export default function TwoFactorAuthenticationForm({ className = '' }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const twoFactorEnabled =
        user.two_factor_confirmed_at !== null &&
        user.two_factor_confirmed_at !== undefined;

    const [confirming, setConfirming] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [recoveryCodes, setRecoveryCodes] = useState([]);
    const [setupKey, setSetupKey] = useState(null);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showRecovery, setShowRecovery] = useState(false);

    async function enableTwoFactor() {
        setLoading(true);
        setError('');
        try {
            // 1. Activar — Fortify responde 200 sin body
            await fortifyFetch('/user/two-factor-authentication', 'POST');

            // 2. Obtener QR, clave y códigos en paralelo
            const [qr, key, codes] = await Promise.all([
                fortifyFetch('/user/two-factor-qr-code'),
                fortifyFetch('/user/two-factor-secret-key'),
                fortifyFetch('/user/two-factor-recovery-codes'),
            ]);

            setQrCode(qr.svg);
            setSetupKey(key.secretKey);
            setRecoveryCodes(codes);
            setConfirming(true);
        } catch (e) {
            setError(e.message || 'No se pudo iniciar la configuración.');
        } finally {
            setLoading(false);
        }
    }

    async function confirmTwoFactor() {
        setLoading(true);
        setError('');
        try {
            await fortifyFetch(
                '/user/confirmed-two-factor-authentication',
                'POST',
                { code },
            );
            // Recargamos solo la prop auth para reflejar two_factor_confirmed_at
            router.reload({ only: ['auth'] });
            setConfirming(false);
            setQrCode(null);
            setSetupKey(null);
            setCode('');
        } catch (e) {
            setError('Código incorrecto. Verifica tu app autenticadora.');
        } finally {
            setLoading(false);
        }
    }

    async function disableTwoFactor() {
        setLoading(true);
        setError('');
        try {
            await fortifyFetch('/user/two-factor-authentication', 'DELETE');
            router.reload({ only: ['auth'] });
        } catch (e) {
            setError(e.message || 'No se pudo desactivar.');
        } finally {
            setLoading(false);
        }
    }

    async function loadRecoveryCodes() {
        const codes = await fortifyFetch('/user/two-factor-recovery-codes');
        setRecoveryCodes(codes);
    }

    async function regenerateCodes() {
        setLoading(true);
        try {
            await fortifyFetch('/user/two-factor-recovery-codes', 'POST');
            await loadRecoveryCodes();
            setShowRecovery(true);
        } catch (e) {
            setError(e.message || 'No se pudieron regenerar los códigos.');
        } finally {
            setLoading(false);
        }
    }

    async function handleToggleRecovery() {
        if (!showRecovery && recoveryCodes.length === 0) {
            await loadRecoveryCodes();
        }
        setShowRecovery((v) => !v);
    }

    return (
        <section className={className}>
            {/* Header */}
            <div className="mb-5 flex items-center gap-3 border-b border-outline-variant pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
                    <span className="material-symbols-outlined text-[20px] text-on-primary">
                        verified_user
                    </span>
                </div>
                <div>
                    <h2 className="text-base font-semibold text-on-surface">
                        Verificación en dos pasos
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                        Protege tu cuenta con autenticación 2FA
                    </p>
                </div>
            </div>

            {/* Estado actual */}
            <div
                className={[
                    'mb-5 flex items-center gap-3 rounded-xl border px-4 py-3',
                    twoFactorEnabled
                        ? 'border-green-200 bg-green-50'
                        : 'border-outline-variant bg-surface-container-low',
                ].join(' ')}
            >
                <span
                    className={[
                        'material-symbols-outlined text-[22px]',
                        twoFactorEnabled
                            ? 'text-green-600'
                            : 'text-on-surface-variant',
                    ].join(' ')}
                >
                    {twoFactorEnabled ? 'lock' : 'lock_open'}
                </span>
                <div>
                    <p
                        className={[
                            'text-sm font-semibold',
                            twoFactorEnabled
                                ? 'text-green-800'
                                : 'text-on-surface',
                        ].join(' ')}
                    >
                        {twoFactorEnabled ? '2FA activado' : '2FA desactivado'}
                    </p>
                    <p
                        className={[
                            'text-xs',
                            twoFactorEnabled
                                ? 'text-green-700'
                                : 'text-on-surface-variant',
                        ].join(' ')}
                    >
                        {twoFactorEnabled
                            ? 'Tu cuenta tiene una capa adicional de seguridad.'
                            : 'Te recomendamos activar 2FA para mayor seguridad.'}
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-error/30 bg-error-container/30 px-3 py-2">
                    <span className="material-symbols-outlined text-[16px] text-error">
                        error
                    </span>
                    <p className="text-xs text-error">{error}</p>
                </div>
            )}

            {/* Activar */}
            {!twoFactorEnabled && !confirming && (
                <PrimaryButton onClick={enableTwoFactor} disabled={loading}>
                    {loading
                        ? 'Iniciando...'
                        : 'Activar verificación en dos pasos'}
                </PrimaryButton>
            )}

            {/* QR + confirmación */}
            {confirming && (
                <div className="space-y-4">
                    <p className="text-xs leading-relaxed text-on-surface-variant">
                        Escanea este código QR con tu app autenticadora y luego
                        ingresa el código de 6 dígitos para confirmar.
                    </p>

                    {qrCode && (
                        <div className="flex justify-center rounded-xl border border-outline-variant bg-white p-4">
                            <div dangerouslySetInnerHTML={{ __html: qrCode }} />
                        </div>
                    )}

                    {setupKey && (
                        <div className="rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
                                Clave manual
                            </p>
                            <p className="font-mono text-sm font-medium tracking-widest text-on-surface">
                                {setupKey}
                            </p>
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-sm font-medium text-on-surface">
                            Código de verificación
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value.replace(/\D/g, ''))
                            }
                            placeholder="000000"
                            className="block w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 text-center font-mono text-lg tracking-[0.5em] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <PrimaryButton
                            onClick={confirmTwoFactor}
                            disabled={loading || code.length < 6}
                        >
                            {loading ? 'Verificando...' : 'Confirmar'}
                        </PrimaryButton>
                        <button
                            onClick={() => {
                                setConfirming(false);
                                setQrCode(null);
                                setSetupKey(null);
                                setCode('');
                            }}
                            className="text-sm text-on-surface-variant hover:text-on-surface"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Ya activado */}
            {twoFactorEnabled && (
                <div className="space-y-3">
                    <button
                        onClick={handleToggleRecovery}
                        className="flex w-full items-center justify-between rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-left transition-colors hover:bg-surface-container"
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                                key
                            </span>
                            <span className="text-sm font-medium text-on-surface">
                                Códigos de recuperación
                            </span>
                        </div>
                        <span
                            className={[
                                'material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200',
                                showRecovery ? 'rotate-180' : '',
                            ].join(' ')}
                        >
                            expand_more
                        </span>
                    </button>

                    {showRecovery && recoveryCodes.length > 0 && (
                        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
                            <p className="mb-3 text-xs text-on-surface-variant">
                                Guarda estos códigos en un lugar seguro. Cada
                                uno solo puede usarse una vez.
                            </p>
                            <div className="grid grid-cols-2 gap-1.5">
                                {recoveryCodes.map((c) => (
                                    <span
                                        key={c}
                                        className="rounded-lg bg-surface px-3 py-1.5 text-center font-mono text-xs text-on-surface"
                                    >
                                        {c}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={regenerateCodes}
                                disabled={loading}
                                className="mt-3 flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-on-surface disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[14px]">
                                    refresh
                                </span>
                                Regenerar códigos
                            </button>
                        </div>
                    )}

                    <button
                        onClick={disableTwoFactor}
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-error/30 bg-error-container/20 px-4 py-2.5 text-sm font-medium text-error transition-colors hover:bg-error-container/40 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            no_encryption
                        </span>
                        {loading ? 'Desactivando...' : 'Desactivar 2FA'}
                    </button>
                </div>
            )}
        </section>
    );
}
