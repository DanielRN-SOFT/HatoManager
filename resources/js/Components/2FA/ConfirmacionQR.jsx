import PrimaryButton from '@/Components/Auth/PrimaryButton';
export const ConfirmacionQR = ({
    qrCode,
    setupKey,
    confirmTwoFactor,
    loading,
    setConfirming,
    setQrCode,
    setSetupKey,
    setCode,
    code
}) => {
    return (
        <div className="space-y-4">
            <p className="text-xs leading-relaxed text-on-surface-variant">
                Escanea este código QR con tu app autenticadora y luego ingresa
                el código de 6 dígitos para confirmar.
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
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
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
    );
};
