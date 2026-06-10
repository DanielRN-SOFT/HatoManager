import { useRole } from '@/hooks/useRole';
import { router } from '@inertiajs/react';

const SEX_LABELS = {
    M: { label: 'Macho', cls: 'bg-blue-50 text-blue-700' },
    H: { label: 'Hembra', cls: 'bg-pink-50 text-pink-700' },
};

const STATUS_STYLES = {
    Activo: { cls: 'bg-green-50 text-green-700' },
    Inactivo: { cls: 'bg-amber-50 text-amber-700' },
    Muerto: { cls: 'bg-red-50 text-red-600' },
    Reservado: { cls: 'bg-blue-50 text-blue-600' },
    Vendido: { cls: 'bg-purple-50 text-purple-600' },
    Publicado: { cls: 'bg-orange-50 text-orange-600' },
};

const FilaTable = ({ animal, setShowModalEliminar }) => {
    const sexInfo = SEX_LABELS[animal.sex] ?? {
        label: animal.sex,
        cls: 'bg-gray-100 text-gray-600',
    };
    const statusInfo = STATUS_STYLES[animal.status] ?? {
        cls: 'bg-gray-100 text-gray-600',
    };

    const { isGanadero } = useRole();

    return (
        <tr className="bg- border-b border-gray-100 transition-colors hover:bg-gray-50">
            {/* Foto */}
            <td className="px-4 py-3">
                {animal.photo ? (
                    <img
                        src={animal.photo}
                        alt={animal.ear_tag}
                        className="h-10 w-10 rounded-lg object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                        <span className="material-symbols-outlined text-[20px] text-gray-300">
                            photo_camera
                        </span>
                    </div>
                )}
            </td>

            {/* Nombre */}
            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                {animal.name}
            </td>

            {/* Arete */}
            <td className="px-4 py-3">
                <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700">
                    {animal.ear_tag}
                </span>
            </td>

            {/* Raza */}
            <td className="px-4 py-3 text-sm text-gray-600">{animal.breed}</td>

            {/* Sexo */}
            <td className="px-4 py-3">
                <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sexInfo.cls}`}
                >
                    {sexInfo.label}
                </span>
            </td>

            {/* Nacimiento */}
            <td className="px-4 py-3 text-sm tabular-nums text-gray-500">
                {animal.birth_date}
            </td>

            {/* Estado */}
            <td className="px-4 py-3">
                <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.cls}`}
                >
                    {animal.status?.replace(/_/g, ' ')}
                </span>
            </td>

            {/* Categoría */}
            <td className="px-4 py-3 text-sm text-gray-500">
                {animal?.animal_category ?? '—'}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    <ActionBtn
                        icon="visibility"
                        label="Ver detalle"
                        onClick={() =>
                            router.visit(route('animals.show', animal.id))
                        }
                        cls="hover:text-blue-500"
                    />
                    {isGanadero && (
                        <ActionBtn
                            icon="edit"
                            label="Editar"
                            onClick={() =>
                                router.visit(route('animals.edit', animal.id))
                            }
                            cls="hover:text-secondary"
                        />
                    )}

                    {/* Certificado sanitario */}
                    <div className="group relative">
                        <button
                            title="Certificado sanitario"
                            className="rounded p-1.5 text-gray-400 transition-all active:scale-90"
                        >
                            <span className="material-symbols-outlined text-[18px] hover:text-green-600">
                                verified
                            </span>
                        </button>
                        <div className="absolute right-0 z-20 hidden w-44 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg group-hover:block">
                            <button
                                onClick={() =>
                                    window.open(
                                        route('health.certificado.individual', {
                                            animal: animal.id,
                                            modo: 'color',
                                        }),
                                        '_blank',
                                    )
                                }
                                className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700"
                            >
                                <span className="material-symbols-outlined text-[15px]">
                                    picture_as_pdf
                                </span>
                                Color
                            </button>
                            <button
                                onClick={() =>
                                    window.open(
                                        route('health.certificado.individual', {
                                            animal: animal.id,
                                            modo: 'byn',
                                        }),
                                        '_blank',
                                    )
                                }
                                className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50"
                            >
                                <span className="material-symbols-outlined text-[15px]">
                                    picture_as_pdf
                                </span>
                                Blanco y negro
                            </button>
                        </div>
                    </div>

                    {animal.status === 'Activo' && isGanadero && (
                        <ActionBtn
                            icon="delete"
                            label="Eliminar"
                            onClick={() => setShowModalEliminar(animal)}
                            cls="hover:text-red-500"
                        />
                    )}
                    {animal.status === 'Inactivo' && isGanadero && (
                        <ActionBtn
                            icon="restore_from_trash"
                            label="Restaurar"
                            onClick={() =>
                                router.put(route('animals.restore', animal.id))
                            }
                            cls="hover:text-green-500"
                        />
                    )}
                </div>
            </td>
        </tr>
    );
};

const ActionBtn = ({ icon, label, onClick, cls }) => (
    <button
        onClick={onClick}
        title={label}
        className="rounded p-1.5 text-gray-400 transition-all active:scale-90"
    >
        <span className={`material-symbols-outlined text-[18px] ${cls}`}>
            {icon}
        </span>
    </button>
);

export default FilaTable;
