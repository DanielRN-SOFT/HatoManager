import formatearDinero from "@/helpers/formatearDinero";

const FooterCard = ({setOpen, open, order}) => {
    return (
        <div className="flex items-center justify-between gap-3 border-t border-outline-variant px-5 py-4">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
                <span
                    className="material-symbols-outlined text-[18px] transition-transform"
                    style={{ transform: open ? 'rotate(180deg)' : 'none' }}
                >
                    expand_more
                </span>
                {open ? 'Ocultar' : 'Detalle'}
            </button>

            <div className="flex flex-col items-end">
                <span className="text-[11px] text-on-surface-variant">
                    Total
                </span>
                <span className="font-mono text-base font-bold text-on-surface">
                    {formatearDinero(order.subtotal)} COP
                </span>
            </div>
        </div>
    );
};

export default FooterCard;
