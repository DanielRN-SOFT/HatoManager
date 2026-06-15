import { useState } from 'react';
import DetalleTransaccion from './DetalleTransaccion';
import FooterCard from './FooterCard';
import Header from './Header';
import ResumenAnimales from './ResumenAnimales';

const OrderCard = ({ order }) => {
    const [open, setOpen] = useState(false);

    const visibleAnimals = order.animals.slice(0, 3);
    const remainingCount = order.animals.length - visibleAnimals.length;

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
            {/* ── Header ── */}
            <Header order={order} />

            {/* ── Resumen animales ── */}
            <div className="mx-5 mb-4 flex-1 overflow-hidden rounded-xl border border-outline-variant bg-surface-container/40">
                {visibleAnimals.map((animal, idx) => (
                    <ResumenAnimales
                        key={animal.id}
                        animal={animal}
                        idx={idx}
                    />
                ))}

                {remainingCount > 0 && (
                    <div className="border-t border-outline-variant px-3 py-2 text-center text-xs font-medium text-on-surface-variant">
                        +{remainingCount}{' '}
                        {remainingCount === 1 ? 'animal más' : 'animales más'}
                    </div>
                )}
            </div>

            {/* ── Footer: total + toggle ── */}
            <FooterCard order={order} open={open} setOpen={setOpen} />

            {/* ── Detalle transacción (colapsable) ── */}
            {open && order.transaction && <DetalleTransaccion order={order} />}

            {open && !order.transaction && (
                <div className="border-t border-outline-variant bg-surface-container/30 px-5 py-4 text-sm text-on-surface-variant">
                    Sin transacción registrada.
                </div>
            )}
        </div>
    );
};

export default OrderCard;
