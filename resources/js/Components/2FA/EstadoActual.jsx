const EstadoActual = ({ twoFactorEnabled }) => {
    return (
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
                        twoFactorEnabled ? 'text-green-800' : 'text-on-surface',
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
    );
};

export default EstadoActual;
