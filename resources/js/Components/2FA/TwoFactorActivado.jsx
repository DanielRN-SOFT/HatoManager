const TwoFactorActivado = ({
    handleToggleRecovery,
    showRecovery,
    recoveryCodes,
    regenerateCodes,
    loading,
    disableTwoFactor,
}) => {
    return (
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
                        Guarda estos códigos en un lugar seguro. Cada uno solo
                        puede usarse una vez.
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
    );
};

export default TwoFactorActivado;
