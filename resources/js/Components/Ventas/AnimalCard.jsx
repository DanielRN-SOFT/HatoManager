import formatearDinero from '@/helpers/formatearDinero';
import { router } from '@inertiajs/react';
const AnimalCard = ({
    animal,
    onCart,
    enCarrito = false,
    puedeComprar = true,
}) => {
    const reservado = animal.status === 'Reservado';

    return (
        <article
            onClick={() =>
                router.visit(route('ecommerce.sales.show', animal.id))
            }
            className={`group cursor-pointer overflow-hidden rounded-2xl border border-outline-variant bg-surface transition-all duration-300 ${
                reservado
                    ? 'opacity-80'
                    : 'hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl'
            }`}
        >
            {/* Imagen */}
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
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
                        <span className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                            Reservado
                        </span>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase text-on-primary shadow-sm">
                        {animal.breed_name}
                    </span>
                    <span className="rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-bold uppercase text-on-surface shadow-sm backdrop-blur-sm">
                        {animal.category_name}
                    </span>
                </div>
            </div>

            {/* Contenido */}
            <div className="space-y-3 p-4">
                {/* Nombre */}
                <span className="block truncate font-bold text-on-surface">
                    {animal.name}
                </span>

                {/* Precio y peso */}
                <div className="flex items-baseline justify-between">
                    <span
                        className={`text-xl font-extrabold ${
                            reservado
                                ? 'text-outline line-through'
                                : 'text-primary'
                        }`}
                    >
                        {formatearDinero(animal.price)}
                    </span>
                    <span
                        className={`flex items-center gap-1 text-sm font-semibold ${
                            reservado
                                ? 'text-outline'
                                : 'text-on-surface-variant'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            monitor_weight
                        </span>
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
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container py-2.5 text-sm font-semibold text-outline"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            remove_shopping_cart
                        </span>
                        No disponible
                    </button>
                ) : !puedeComprar ? (
                    <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container py-2.5 text-sm font-semibold text-outline"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            visibility
                        </span>
                        Solo visualización
                    </button>
                ) : enCarrito ? (
                    <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-2.5 text-sm font-semibold text-primary"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            check_circle
                        </span>
                        En tu carrito
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onCart?.(animal, e);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-on-primary shadow-sm shadow-primary/20 transition-all duration-150 hover:opacity-90 active:scale-95"
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
