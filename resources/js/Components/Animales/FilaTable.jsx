import { router } from '@inertiajs/react';

const SEX_LABELS = {
    M: { label: 'Macho', cls: 'bg-blue-50 text-blue-700' },
    H: { label: 'Hembra', cls: 'bg-pink-50 text-pink-700' },
};

const STATUS_STYLES = {
    al_dia: {
        icon: 'check_circle',
        cls: 'bg-secondary-container/50 text-secondary',
    },
    proxima_a_vencer: { icon: 'warning', cls: 'bg-amber-50 text-amber-700' },
    vencida: { icon: 'cancel', cls: 'bg-error-container/50 text-error' },
};

const FilaTable = ({ animal, onEdit }) => {
    console.log(animal)
    const sexInfo = SEX_LABELS[animal.sex] ?? {
        label: animal.sex,
        cls: 'bg-surface-container text-on-surface',
    };
    const statusInfo = STATUS_STYLES[animal.status] ?? {
        icon: 'help',
        cls: 'bg-surface-container text-on-surface-variant',
    };

    return (
        <tr className="bg-white transition-colors duration-150 border-y border-gray-300 rounded-lg">
            {/* Foto */}
            <td className="px-5 py-3.5">
                {animal.photo ? (
                    <img
                        src={animal.photo}
                        alt={animal.ear_tag}
                        className="h-10 w-10 rounded-xl object-cover shadow-sm"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low">
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant/30">
                            photo_camera
                        </span>
                    </div>
                )}
            </td>

            {/* Arete */}
            <td className="px-5 py-3.5">
                <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    {animal.ear_tag}
                </span>
            </td>

            {/* Raza */}
            <td className="px-5 py-3.5 text-sm text-on-surface">
                {animal.breed}
            </td>

            {/* Sexo */}
            <td className="px-5 py-3.5">
                <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sexInfo.cls}`}
                >
                    {sexInfo.label}
                </span>
            </td>

            {/* Nacimiento */}
            <td className="px-5 py-3.5 text-sm tabular-nums text-on-surface-variant">
                {animal.birth_date}
            </td>

            {/* Estado */}
            <td className="px-5 py-3.5">
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.cls}`}
                >
                    <span className="material-symbols-outlined text-[13px]">
                        {statusInfo.icon}
                    </span>
                    {animal.status?.replace(/_/g, ' ')}
                </span>
            </td>

            {/* Categoría */}
            <td className="px-5 py-3.5 text-sm text-on-surface-variant">
                {animal?.animal_category ?? '—'}
            </td>

            {/* Acciones */}
            <td className="px-5 py-3.5">
                <div className="flex items-center justify-center gap-1">
                    <ActionBtn
                        icon="visibility"
                        label="Ver detalle"
                        onClick={() =>
                            router.visit(route('inventory.show', animal.id))
                        }
                        hover="hover:bg-primary/10 hover:text-primary"
                    />
                    <ActionBtn
                        icon="edit"
                        label="Editar"
                        onClick={() => onEdit(animal)}
                        hover="hover:bg-secondary/10 hover:text-secondary"
                    />
                    <ActionBtn
                        icon="picture_as_pdf"
                        label="Exportar PDF"
                        onClick={() =>
                            window.open(
                                route('inventory.pdf', animal.id),
                                '_blank',
                            )
                        }
                        hover="hover:bg-error-container/50 hover:text-error"
                    />
                </div>
            </td>
        </tr>
    );
};

const ActionBtn = ({ icon, label, onClick, hover }) => (
    <button
        onClick={onClick}
        title={label}
        className={`rounded-xl p-1.5 text-on-surface-variant/50 transition-all duration-150 active:scale-90 ${hover}`}
    >
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </button>
);

export default FilaTable;
