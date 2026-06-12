import formatearDinero from '@/helpers/formatearDinero';
import { useRole } from '@/hooks/useRole';

const statusConfig = {
    Publicado: {
        label: 'Disponible',
        dot: 'bg-green-400',
        badge: 'bg-primary-container text-on-primary-container',
    },
    Reservado: {
        label: 'Reservado',
        dot: 'bg-amber-400',
        badge: 'bg-tertiary-container text-on-tertiary-container',
    },
};

const CatalogCard = ({ animal, enCarrito, onCart }) => {
    const { isVeterinario } = useRole();
    const status = statusConfig[animal.status] ?? statusConfig.disponible;
    const reservado = animal.status === 'Reservado';

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

                {reservado ? (
                    <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container py-2 text-sm font-semibold text-outline"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            remove_shopping_cart
                        </span>
                        No disponible
                    </button>
                ) : isVeterinario ? (
                    <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container py-2 text-sm font-semibold text-outline"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            visibility
                        </span>
                        Solo visualización
                    </button>
                ) : enCarrito ? (
                    <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-2 text-sm font-semibold text-primary"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            check_circle
                        </span>
                        En tu carrito
                    </button>
                ) : (
                    <button
                        onClick={(e) => onCart?.(animal, e)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2 text-sm font-bold text-on-primary shadow-sm shadow-primary/20 transition-all duration-150 hover:bg-primary-container hover:text-on-primary active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            shopping_cart
                        </span>
                        Agregar al carrito
                    </button>
                )}
            </div>
        </div>
    );
};

export default CatalogCard;
