import { useForm } from '@inertiajs/react';

const AnimalForm = ({ animal, onCancel }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        photo: animal?.photo ?? '',
        ear_tag: animal?.ear_tag ?? '',
        breed: animal?.breed ?? '',
        sex: animal?.sex ?? '',
        birth_date: animal?.birth_date ?? '',
        status: animal?.status ?? '',
        animal_category_id: animal?.animal_category_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (animal) {
            put(route('inventory.update', animal.id, { onSuccess: onCancel }));
        } else {
            post(route('inventory.store', { onSuccess: onCancel }));
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Arete */}
            <div>
                <label className="text-label-md mb-1 block text-on-surface-variant">
                    Arete #
                </label>
                <input
                    type="text"
                    value={data.ear_tag}
                    onChange={(e) => setData('ear_tag', e.target.value)}
                    placeholder="Ej. BR-4502"
                    className="text-body-sm w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 focus:border-primary focus:outline-none"
                />
                {errors.ear_tag && (
                    <p className="mt-1 text-xs text-error">{errors.arete}</p>
                )}
            </div>

            {/* Raza */}
            <div>
                <label className="text-label-md mb-1 block text-on-surface-variant">
                    Raza
                </label>
                <select
                    value={data.breed}
                    onChange={(e) => setData('breed', e.target.value)}
                    className="text-body-sm w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 focus:border-primary focus:outline-none"
                >
                    <option value="">Seleccionar raza</option>
                    <option value="Brahman Blanco">Brahman Blanco</option>
                    <option value="Brahman Rojo">Brahman Rojo</option>
                    <option value="Gyr Lechero">Gyr Lechero</option>
                    <option value="Angus Negro">Angus Negro</option>
                </select>
                {errors.breed && (
                    <p className="mt-1 text-xs text-error">{errors.raza}</p>
                )}
            </div>

            {/* Categoría */}
            <div>
                <label className="text-label-md mb-1 block text-on-surface-variant">
                    Categoría
                </label>
                <select
                    value={data.animal_category_id}
                    onChange={(e) =>
                        setData('animal_category_id', e.target.value)
                    }
                    className="text-body-sm w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 focus:border-primary focus:outline-none"
                >
                    <option value="">Seleccionar categoría</option>
                    <option value="Vaca Parida">Vaca Parida</option>
                    <option value="Novilla">Novilla</option>
                    <option value="Toro Reproductor">Toro Reproductor</option>
                    <option value="Ternero">Ternero</option>
                </select>
                {errors.animal_category_id && (
                    <p className="mt-1 text-xs text-error">
                        {errors.categoria}
                    </p>
                )}
            </div>

            {/* Sexto */}
            <div>
                <label className="text-label-md mb-1 block text-on-surface-variant">
                    Genero
                </label>
                <select
                    value={data.sex}
                    onChange={(e) => setData('sex', e.target.value)}
                    className="text-body-sm w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 focus:border-primary focus:outline-none"
                >
                    <option value="">Seleccionar genero</option>
                    <option value="M">Macho</option>
                    <option value="H">Hembra</option>
                </select>
                {errors.sex && (
                    <p className="mt-1 text-xs text-error">{errors.sex}</p>
                )}
            </div>

            {/* Fecha de nacimiento */}
            <div>
                <label className="text-label-md mb-1 block text-on-surface-variant">
                    Fecha de nacimiento
                </label>
                <input
                    type="date"
                    className="text-body-sm w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 focus:border-primary focus:outline-none"
                />

                {errors.birth_date && (
                    <p className="mt-1 text-xs text-error">
                        {errors.birth_date}
                    </p>
                )}
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    {processing
                        ? 'Guardando…'
                        : animal
                          ? 'Guardar cambios'
                          : 'Registrar animal'}
                </button>
            </div>
        </form>
    );
};

export default AnimalForm;
