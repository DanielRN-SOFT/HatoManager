import formatearDinero from '@/helpers/formatearDinero';

const DetalleTransaccion = ({ order }) => {
    return (
        <div className="border-t border-outline-variant bg-surface-container/30 px-5 py-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Transacción
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {[
                    {
                        label: 'Fecha',
                        value: order.transaction.transaction_date,
                        mono: false,
                    },
                    {
                        label: 'Monto',
                        value: `${formatearDinero(order.transaction.amount)} COP`,
                        mono: true,
                    },
                    {
                        label: 'Estado',
                        value: order.transaction.transaction_status,
                        mono: false,
                    },
                    {
                        label: 'Tipo',
                        value: order.transaction.transaction_type.replace(
                            /_/g,
                            ' ',
                        ),
                        mono: false,
                    },
                ].map(({ label, value, mono }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                        <span className="text-xs text-on-surface-variant">
                            {label}
                        </span>
                        <span
                            className={`truncate text-sm capitalize text-on-surface ${mono ? 'font-mono' : ''}`}
                        >
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetalleTransaccion;
