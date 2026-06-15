const Header = ({ order }) => {
    const BUSINESS_BADGE = {
        'Pendiente de confirmacion': {
            bg: 'bg-amber-50 border border-amber-200',
            text: 'text-amber-700',
        },
        'Cancelado por comprador': {
            bg: 'bg-red-50 border border-red-200',
            text: 'text-red-600',
        },
        'Rechazado por ganadero': {
            bg: 'bg-red-50 border border-red-200',
            text: 'text-red-600',
        },
        Confirmado: {
            bg: 'bg-blue-50 border border-blue-200',
            text: 'text-blue-700',
        },
        Completado: {
            bg: 'bg-green-50 border border-green-200',
            text: 'text-green-700',
        },
    };

    const PAYMENT_BADGE = {
        Pendiente: {
            bg: 'bg-amber-50 border border-amber-200',
            text: 'text-amber-700',
        },
        Aprobado: {
            bg: 'bg-green-50 border border-green-200',
            text: 'text-green-700',
        },
        Rechazado: {
            bg: 'bg-red-50 border border-red-200',
            text: 'text-red-600',
        },
        Expirado: {
            bg: 'bg-gray-100 border border-gray-200',
            text: 'text-gray-500',
        },
        Reembolsado: {
            bg: 'bg-purple-50 border border-purple-200',
            text: 'text-purple-700',
        },
    };

    return (
        <div className="flex flex-col gap-3 px-5 pb-4 pt-5">
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm font-bold text-on-surface">
                        Pedido #{order.id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px]">
                            calendar_today
                        </span>
                        {order.date}
                    </div>
                </div>
                {order.reference && (
                    <span className="shrink-0 rounded bg-surface-container px-2 py-0.5 font-mono text-[11px] text-on-surface-variant">
                        {order.reference}
                    </span>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Badge
                    label={order.bussiness_status}
                    style={BUSINESS_BADGE[order.bussiness_status]}
                />
                <Badge
                    label={order.payment_status}
                    style={PAYMENT_BADGE[order.payment_status]}
                />
            </div>
        </div>
    );
};

function Badge({ label, style }) {
    const s = style ?? {
        bg: 'bg-gray-100 border border-gray-200',
        text: 'text-gray-500',
    };
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}
        >
            {label}
        </span>
    );
}

export default Header;
