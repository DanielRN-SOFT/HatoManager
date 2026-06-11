import formatearDinero from '@/helpers/formatearDinero';

const statusConfig = {
    Activo: {
        label: 'Disponible',
        dot: 'bg-green-400',
        badge: 'bg-primary-container text-on-primary-container',
    },
    Reservado: {
        label: 'Reservado',
        dot: 'bg-amber-400',
        badge: 'bg-tertiary-container text-on-tertiary-container',
    },
    Vendido: {
        label: 'Vendido',
        dot: 'bg-red-400',
        badge: 'bg-error-container text-on-error-container',
    },
};

const CatalogCard = ({ animal, onDetail, onCart }) => {
    const status = statusConfig[animal.status] ?? statusConfig.disponible;

    return (
        <div className="group overflow-hidden rounded-xl border border-outline-variant bg-white transition-all duration-300 hover:shadow-lg">
            <div className="relative h-56">
                {animal.photo ? (
                    <img
                        src={animal.photo}
                        alt={animal.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary transition-transform duration-300 group-hover:scale-105">
                        <span className="text-4xl font-bold text-gray-200">
                            {animal.name
                                .split(' ')
                                .slice(0, 2)
                                .map((word) => word[0].toUpperCase())
                                .join('')}
                        </span>
                    </div>
                )}
                <span
                    className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${status.badge}`}
                >
                    <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                    {status.label}
                </span>
            </div>
            <div className="p-6">
                <h3 className="mb-2 font-bold leading-tight text-on-surface">
                    {animal.name}
                </h3>

                <div className="mb-4 flex items-center gap-1.5 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">
                        location_on
                    </span>
                    {animal.farm.city}, {animal.farm.department}
                </div>

                <div className="mb-5 flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-on-surface-variant">
                        Precio
                    </span>
                    <span className="text-xl font-extrabold text-primary">
                        {formatearDinero(animal.price)}
                    </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    <button
                        onClick={() => onDetail?.(animal)}
                        className="col-span-4 rounded-lg bg-primary py-2.5 text-sm font-bold text-on-primary transition-all hover:bg-primary-container active:opacity-80"
                    >
                        Ver detalle
                    </button>
                    <button
                        onClick={() => onCart?.(animal)}
                        className="col-span-1 flex items-center justify-center rounded-lg border border-primary text-primary transition-all hover:bg-primary/5"
                        aria-label="Agregar al carrito"
                    >
                        <span className="material-symbols-outlined text-lg">
                            shopping_cart
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatalogCard;
