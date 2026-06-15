import formatearDinero from '@/helpers/formatearDinero';

const ResumenAnimales = ({ animal, idx }) => {
    const ANIMAL_STATUS = {
        'Pendiente de confirmacion': 'text-amber-600',
        Confirmado: 'text-green-600',
        Rechazado: 'text-red-500',
    };
    return (
        <div

            className={`flex items-center gap-3 px-3 py-2.5 ${idx !== 0 ? 'border-t border-outline-variant' : ''}`}
        >
            {/* Imagen */}
            {animal.image ? (
                <img
                    src={animal.image}
                    alt={animal.name ?? `Animal #${animal.id}`}
                    className="h-10 w-10 shrink-0 rounded-lg border border-outline-variant object-cover"
                />
            ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">
                        pets
                    </span>
                </div>
            )}

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-semibold text-on-surface">
                    {animal.name ?? `Animal #${animal.id}`}
                </span>
                {animal.ear_tag && (
                    <span className="truncate font-mono text-xs text-on-surface-variant">
                        Arete: {animal.ear_tag}
                    </span>
                )}
            </div>

            {/* Estado + precio */}
            <div className="flex shrink-0 flex-col items-end gap-1">
                <span
                    className={`text-xs font-medium ${ANIMAL_STATUS[animal.status_order] ?? 'text-on-surface-variant'}`}
                >
                    {animal.status_order}
                </span>
                <span className="font-mono text-sm font-bold text-on-surface">
                    {formatearDinero(animal.snapshot_price)}
                </span>
            </div>
        </div>
    );
};

export default ResumenAnimales;
