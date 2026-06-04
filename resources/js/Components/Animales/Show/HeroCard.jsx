import StatBadge from './StatBadge';

const HeroCard = ({ animal, statusInfo, fmt, lastWeight, gain }) => {
    /* ─────────────────────────────────────────────
            Helpers
───────────────────────────────────────────── */

    const SEX_LABELS = {
        M: { label: 'Macho', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
        H: { label: 'Hembra', cls: 'bg-pink-50 text-pink-700 border-pink-200' },
    };

    const sexInfo = SEX_LABELS[animal.sex] ?? {
        label: animal.sex,
        cls: 'bg-gray-100 text-gray-600 border-gray-200',
    };

    function age(dateStr) {
        if (!dateStr) return '—';
        const birth = new Date(dateStr);
        const now = new Date();
        const months =
            (now.getFullYear() - birth.getFullYear()) * 12 +
            (now.getMonth() - birth.getMonth());
        if (months < 12) return `${months} meses`;
        const years = Math.floor(months / 12);
        const rem = months % 12;
        return rem > 0 ? `${years} a ${rem} m` : `${years} años`;
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-t-4 border-primary" />
            <div className="flex flex-wrap items-start gap-6 p-5">
                {/* Foto */}
                <div className="shrink-0">
                    {animal.photo ? (
                        <img
                            src={animal.photo}
                            alt={animal.name}
                            className="h-36 w-36 rounded-2xl object-cover shadow-md"
                        />
                    ) : (
                        <div className="flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-2xl bg-gray-100 text-gray-300 shadow-inner">
                            <span className="material-symbols-outlined text-5xl">
                                photo_camera
                            </span>
                            <span className="text-[10px]">Sin foto</span>
                        </div>
                    )}
                </div>

                {/* Datos principales */}
                <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusInfo.cls}`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`}
                            />
                            {animal.status}
                        </span>
                        <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${sexInfo.cls}`}
                        >
                            {sexInfo.label}
                        </span>
                        {animal.animal_category && (
                            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                                {animal.animal_category.name}
                            </span>
                        )}
                    </div>

                    {/* Stat badges */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <StatBadge
                            icon="cake"
                            label="Edad"
                            value={age(animal.birth_date)}
                            sub={fmt(animal.birth_date)}
                        />
                        <StatBadge
                            icon="monitor_weight"
                            label="Peso actual"
                            value={
                                lastWeight ? `${lastWeight.toFixed(1)} kg` : '—'
                            }
                            sub={gain ? `+${gain} kg ganados` : undefined}
                        />
                        <StatBadge
                            icon="flag"
                            label="Peso objetivo"
                            value={
                                animal.target_weight
                                    ? `${animal.target_weight} kg`
                                    : '—'
                            }
                        />
                        <StatBadge
                            icon="payments"
                            label="Precio/kg"
                            value={
                                animal.price_weight
                                    ? `$${parseFloat(animal.price_weight).toLocaleString('es-CO')}`
                                    : '—'
                            }
                            sub={
                                animal.price
                                    ? `Val. total $${parseFloat(animal.price).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
                                    : undefined
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;
