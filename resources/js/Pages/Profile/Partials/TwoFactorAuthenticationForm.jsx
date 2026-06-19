import { ConfirmacionQR } from '@/Components/2FA/ConfirmacionQR';
import EstadoActual from '@/Components/2FA/EstadoActual';
import Header2FA from '@/Components/2FA/Header2FA';
import TwoFactorActivado from '@/Components/2FA/TwoFactorActivado';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

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

export default function TwoFactorAuthenticationForm({ layout, className = '' }) {
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
            <Header2FA />

            {/* Estado actual */}
            <EstadoActual twoFactorEnabled={twoFactorEnabled} />

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
                <ConfirmacionQR
                    qrCode={qrCode}
                    setupKey={setupKey}
                    confirmTwoFactor={confirmTwoFactor}
                    loading={loading}
                    setConfirming={setConfirming}
                    setQrCode={setQrCode}
                    setSetupKey={setSetupKey}
                    code={code}
                    setCode={setCode}
                />
            )}

            {/* Ya activado */}
            {twoFactorEnabled && (
                <TwoFactorActivado
                    handleToggleRecovery={handleToggleRecovery}
                    showRecovery={showRecovery}
                    recoveryCodes={recoveryCodes}
                    regenerateCodes={regenerateCodes}
                    loading={loading}
                    disableTwoFactor={disableTwoFactor}
                />
            )}
        </section>
    );
}
