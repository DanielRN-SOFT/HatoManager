import { useForm } from '@inertiajs/react';

const AnimalForm = ({ animal, onCancel, categoriasAnimal, razas }) => {
    const { data, setData, post, processing, errors } = useForm({
        photo: animal?.photo ?? '',
        ear_tag: animal?.ear_tag ?? '',
        breed: animal?.breed ?? '',
        sex: animal?.sex ?? '',
        birth_date: animal?.birth_date ?? '',
        status: animal?.status ?? '',
        animal_category_id: animal?.animal_category.id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (animal) {
            post(route('animales.update', animal.id), {
                forceFormData: true,
                _method: 'PUT',
                onSuccess: onCancel,
            });
        } else {
            post(route('animales.store'), {
                forceFormData: true,
                onSuccess: onCancel,
            });
        }
    }

    return (
        <div className="mx-auto max-w-lg">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                        {animal ? 'edit' : 'add_circle'}
                    </span>
                    <h2 className="text-xl font-bold text-on-surface">
                        {animal ? 'Editar animal' : 'Registrar animal'}
                    </h2>
                </div>
                <p className="text-sm text-on-surface-variant">
                    {animal
                        ? 'Actualiza la información del animal en el sistema.'
                        : 'Completa los datos para añadir un nuevo animal al hato.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Foto */}
                <div className="group">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                        Foto del animal
                    </label>
                    <label className="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low px-4 py-6 transition-all duration-200 hover:border-primary hover:bg-surface-container">
                        {animal?.photo ? (
                            <img
                                src={animal.photo}
                                className="h-24 w-24 rounded-xl object-cover shadow-md"
                            />
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40">
                                    add_photo_alternate
                                </span>
                                <span className="text-xs text-on-surface-variant">
                                    Haz clic para subir una imagen
                                </span>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={(e) =>
                                setData('photo', e.target.files[0])
                            }
                        />
                    </label>
                    {errors.photo && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-error">
                            <span className="material-symbols-outlined text-[14px]">
                                error
                            </span>
                            {errors.photo}
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-outline-variant" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant/50">
                        Identificación
                    </span>
                    <div className="h-px flex-1 bg-outline-variant" />
                </div>

                {/* Arete + Sexo — fila */}
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Arete #" icon="sell" error={errors.ear_tag}>
                        <input
                            type="text"
                            value={data.ear_tag}
                            onChange={(e) => setData('ear_tag', e.target.value)}
                            placeholder="Ej. BR-4502"
                            className="field-input"
                        />
                    </Field>

                    <Field label="Género" icon="transgender" error={errors.sex}>
                        <select
                            value={data.sex}
                            onChange={(e) => setData('sex', e.target.value)}
                            className="field-input"
                        >
                            <option value="">Seleccionar</option>
                            <option value="M">♂ Macho</option>
                            <option value="H">♀ Hembra</option>
                        </select>
                    </Field>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-outline-variant" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant/50">
                        Clasificación
                    </span>
                    <div className="h-px flex-1 bg-outline-variant" />
                </div>

                {/* Raza + Categoría */}
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Raza" icon="pets" error={errors.breed}>
                        <select
                            value={data.breed}
                            onChange={(e) => setData('breed', e.target.value)}
                            className="field-input"
                        >
                            {razas.map((raza) => {
                                return (
                                    <option value={raza.id}>{raza.name}</option>
                                );
                            })}
                        </select>
                    </Field>

                    <Field
                        label="Categoría"
                        icon="category"
                        error={errors.animal_category_id}
                    >
                        <select
                            value={data.animal_category_id}
                            onChange={(e) =>
                                setData('animal_category_id', e.target.value)
                            }
                            className="field-input"
                        >
                            {categoriasAnimal.map((cat) => {
                                return (
                                    <option value={cat.id}>{cat.name}</option>
                                );
                            })}
                        </select>
                    </Field>
                </div>

                {/* Fecha de nacimiento */}
                <Field
                    label="Fecha de nacimiento"
                    icon="cake"
                    error={errors.birth_date}
                >
                    <input
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className="field-input"
                    />
                </Field>

                {/* Acciones */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-outline-variant px-4 py-2.5 text-sm font-medium text-on-surface transition-all duration-200 hover:bg-surface-container active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            close
                        </span>
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
                    >
                        {processing ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-[18px]">
                                    progress_activity
                                </span>
                                Guardando…
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[18px]">
                                    {animal ? 'save' : 'add_circle'}
                                </span>
                                {animal
                                    ? 'Guardar cambios'
                                    : 'Registrar animal'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

/* Campo con label + icono + slot para input/select */
const Field = ({ label, icon, error, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">
                {icon}
            </span>
            {label}
        </label>
        <div className="relative">{children}</div>
        {error && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-error">
                <span className="material-symbols-outlined text-[14px]">
                    error
                </span>
                {error}
            </p>
        )}
    </div>
);

export default AnimalForm;
