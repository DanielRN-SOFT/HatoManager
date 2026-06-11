import formatearDinero from '@/helpers/formatearDinero';

const AnimalCard = ({ animal, onCart }) => {
    const reservado = animal.status === 'Reservado';

    return (
        <article
            className={`group overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-all duration-300 ${
                reservado
                    ? 'opacity-80'
                    : 'hover:-translate-y-0.5 hover:shadow-xl'
            }`}
        >
            {/* Imagen */}
            <div className="relative h-48 overflow-hidden bg-surface-container">
                <img
                    src={animal.photo}
                    alt={`${animal.breed_name} - ${animal.category_name}`}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                        !reservado ? 'group-hover:scale-105' : ''
                    }`}
                />

                {/* Overlay reservado */}
                {reservado && (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-[2px]">
                        <span className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                            Reservado
                        </span>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-on-primary shadow-sm">
                        {animal.breed_name}
                    </span>
                    <span className="rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold uppercase text-on-secondary-container shadow-sm">
                        {animal.category_name}
                    </span>
                </div>
            </div>

            {/* Contenido */}
            <div className="space-y-3 p-4">
                {/* Precio y peso */}
                <div className="flex items-baseline justify-between">
                    <span
                        className={`text-xl font-bold ${
                            reservado
                                ? 'text-outline line-through'
                                : 'text-primary'
                        }`}
                    >
                        {formatearDinero(animal.price)}
                    </span>
                    <span
                        className={`text-sm font-semibold ${
                            reservado
                                ? 'text-outline'
                                : 'text-on-surface-variant'
                        }`}
                    >
                        {animal.weight} kg
                    </span>
                </div>

                {/* Ubicación */}
                <div className="flex items-center gap-1.5 text-sm text-outline">
                    <span className="material-symbols-outlined text-[16px]">
                        location_on
                    </span>
                    <span className="truncate">
                        {animal.farm.city}, {animal.farm.department}
                    </span>
                </div>

                {/* Botón */}
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
                ) : (
                    <button
                        onClick={() => onCart?.(animal)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2 text-sm font-bold text-on-primary shadow-sm shadow-primary/20 transition-all duration-150 hover:bg-primary-container hover:text-on-primary active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            shopping_cart
                        </span>
                        Agregar al carrito
                    </button>
                )}
            </div>
        </article>
    );
};

export default AnimalCard;
