// resources/js/Components/Animales/AnimalForm.jsx
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

/* ─────────────────────────────────────────────
   Shared primitives
───────────────────────────────────────────── */
const SectionCard = ({
    icon,
    title,
    accent = 'border-primary',
    children,
    hint,
}) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div
            className={`flex items-center justify-between border-t-4 ${accent} px-5 py-3`}
        >
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-secondary">
                    {icon}
                </span>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    {title}
                </h3>
            </div>
            {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
        </div>
        <div className="px-5 pb-5 pt-3">{children}</div>
    </div>
);

const Field = ({ label, icon, error, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-[12px] text-primary">
                {icon}
            </span>
            {label}
        </label>
        {children}
        {error && (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                <span className="material-symbols-outlined text-[12px]">
                    error
                </span>
                {error}
            </p>
        )}
    </div>
);

const inputCls =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10';
const selectCls =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 cursor-pointer';
const textareaCls =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 resize-none';

/* ─────────────────────────────────────────────
   Photo zone
───────────────────────────────────────────── */
const PhotoZone = ({ preview, onPhoto, onClear }) => (
    <div className="flex flex-col items-center gap-4">
        {/* Preview / Placeholder */}
        <div className="relative">
            {preview ? (
                <>
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-44 w-44 rounded-2xl object-cover shadow-md ring-2 ring-primary/20"
                    />
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600 active:scale-90"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            close
                        </span>
                    </button>
                </>
            ) : (
                <div className="flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-300">
                    <span className="material-symbols-outlined text-5xl">
                        photo_camera
                    </span>
                    <span className="text-[10px] tracking-wide">Sin foto</span>
                </div>
            )}
        </div>

        {/* Upload button */}
        <div className="text-center">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-primary hover:text-primary active:scale-95">
                <span className="material-symbols-outlined text-[15px]">
                    upload
                </span>
                {preview ? 'Cambiar foto' : 'Seleccionar foto'}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onPhoto}
                />
            </label>
            <p className="mt-1.5 text-[10px] text-gray-400">
                JPG, PNG o WebP · Máx 2 MB
            </p>
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   Main Form
───────────────────────────────────────────── */
const AnimalForm = ({ animal, onCancel, categoriasAnimal, razas }) => {
    const { data, setData, post, processing, errors } = useForm({
        _method: animal ? 'PUT' : 'POST',
        photo: '',
        name: animal?.name ?? '',
        ear_tag: animal?.ear_tag ?? '',
        sex: animal?.sex ?? '',
        birth_date: animal?.birth_date ?? '',
        status: animal?.status ?? '',
        description: animal?.description ?? '',
        previous_diseases: animal?.previous_diseases ?? '',
        price: animal?.price ?? '',
        target_weight: animal?.target_weight ?? '',
        price_weight: animal?.price_weight ?? '',
        publication_date: animal?.publication_date ?? '',
        animal_category_id: animal?.animal_category?.id ?? '',
        breed_id: animal?.breed?.id ?? '',
        reason_to_death:
            animal?.status === 'Muerto' ? animal?.reason_to_death : null,
    });

    const [preview, setPreview] = useState(animal?.photo ?? null);
    const [showReason, setShowReason] = useState(data.status === 'Muerto');

    function handlePhoto(e) {
        const file = e.target.files[0];
        if (!file) return;
        setData('photo', file);
        setPreview(URL.createObjectURL(file));
    }

    function handleSubmit(e) {
        e.preventDefault();
        animal
            ? post(route('animals.update', animal.id), { forceFormData: true })
            : post(route('animals.store'), { forceFormData: true });
    }

    const estimatedValue =
        data.target_weight && data.price_weight
            ? (
                  parseFloat(data.target_weight) * parseFloat(data.price_weight)
              ).toLocaleString('es-CO', { maximumFractionDigits: 0 })
            : null;

    return (
        <div className="w-full">
            {/* ── Page Header ── */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-2">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                        <span className="material-symbols-outlined text-[24px] text-on-primary">
                            {animal ? 'edit' : 'add_circle'}
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                            {animal
                                ? `Editando · #${animal.ear_tag}`
                                : 'Nuevo registro'}
                        </p>
                        <h1 className="text-2xl font-bold text-on-surface">
                            {animal ? animal.name : 'Registrar animal'}
                        </h1>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* ════════════════════════════════════════
                    ROW 1 — Foto (columna izq.) + Identificación (columna der.)
                ════════════════════════════════════════ */}
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr]">
                    {/* Foto */}
                    <SectionCard
                        icon="photo_camera"
                        title="Foto"
                        hint="Opcional"
                    >
                        <PhotoZone
                            preview={preview}
                            onPhoto={handlePhoto}
                            onClear={() => {
                                setData('photo', '');
                                setPreview(null);
                            }}
                        />
                        {errors.photo && (
                            <p className="mt-2 text-center text-[11px] text-red-500">
                                {errors.photo}
                            </p>
                        )}
                    </SectionCard>

                    {/* Identificación */}
                    <SectionCard icon="badge" title="Identificación">
                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                label="Nombre"
                                icon="badge"
                                error={errors.name}
                            >
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="Ej. Lola"
                                    className={inputCls}
                                />
                            </Field>

                            <Field
                                label="Arete #"
                                icon="sell"
                                error={errors.ear_tag}
                            >
                                <input
                                    type="number"
                                    value={data.ear_tag}
                                    onChange={(e) =>
                                        setData('ear_tag', e.target.value)
                                    }
                                    placeholder="Ej. 4502"
                                    className={inputCls}
                                />
                            </Field>

                            <Field
                                label="Género"
                                icon="transgender"
                                error={errors.sex}
                            >
                                <select
                                    value={data.sex}
                                    onChange={(e) =>
                                        setData('sex', e.target.value)
                                    }
                                    className={selectCls}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="M">♂ Macho</option>
                                    <option value="H">♀ Hembra</option>
                                </select>
                            </Field>

                            {/* Estado — solo visible al editar */}
                            {animal && (
                                <Field
                                    label="Estado"
                                    icon="info"
                                    error={errors.status}
                                >
                                    <select
                                        value={data.status}
                                        onChange={(e) => {
                                            setData('status', e.target.value);
                                            setShowReason(
                                                e.target.value === 'Muerto',
                                            );
                                            // limpiar motivo si cambia a otro estado
                                            if (e.target.value !== 'Muerto') {
                                                setData(
                                                    'reason_to_death',
                                                    null,
                                                );
                                            }
                                        }}
                                        className={selectCls}
                                    >
                                        <option disabled value="">
                                            Seleccionar
                                        </option>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">
                                            Inactivo
                                        </option>
                                        <option value="Vendido">Vendido</option>
                                        <option value="Reservado">
                                            Reservado
                                        </option>
                                        <option value="Muerto">Muerto</option>
                                    </select>
                                </Field>
                            )}
                        </div>

                        {/* Motivo de fallecimiento — aparece solo si estado = Muerto */}
                        {showReason && (
                            <div className="mt-4">
                                <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px] text-red-500">
                                            warning
                                        </span>
                                        <p className="text-[11px] font-semibold uppercase tracking-widest text-red-500">
                                            Motivo de fallecimiento
                                        </p>
                                    </div>
                                    <textarea
                                        value={data.reason_to_death ?? ''}
                                        onChange={(e) =>
                                            setData(
                                                'reason_to_death',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Describe la causa de fallecimiento del animal..."
                                        rows={3}
                                        className="w-full resize-none rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                    />
                                    {errors.reason_to_death && (
                                        <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                                            <span className="material-symbols-outlined text-[12px]">
                                                error
                                            </span>
                                            {errors.reason_to_death}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </SectionCard>
                </div>

                {/* ════════════════════════════════════════
                    ROW 2 — Clasificación + Fechas
                ════════════════════════════════════════ */}
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Clasificación */}
                    <SectionCard icon="category" title="Clasificación">
                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                label="Raza"
                                icon="pets"
                                error={errors.breed_id}
                            >
                                <select
                                    value={data.breed_id}
                                    onChange={(e) =>
                                        setData('breed_id', e.target.value)
                                    }
                                    className={selectCls}
                                >
                                    <option value="">Seleccionar</option>
                                    {razas.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.name}
                                        </option>
                                    ))}
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
                                        setData(
                                            'animal_category_id',
                                            e.target.value,
                                        )
                                    }
                                    className={selectCls}
                                >
                                    <option value="">Seleccionar</option>
                                    {categoriasAnimal.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                    </SectionCard>

                    {/* Fechas */}
                    <SectionCard icon="calendar_today" title="Fechas">
                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                label="Fecha de nacimiento"
                                icon="cake"
                                error={errors.birth_date}
                            >
                                <input
                                    type="date"
                                    value={data.birth_date?.split('T')[0] ?? ''}
                                    onChange={(e) =>
                                        setData('birth_date', e.target.value)
                                    }
                                    className={inputCls}
                                />
                            </Field>

                            <Field
                                label="Fecha de publicación"
                                icon="calendar_today"
                                error={errors.publication_date}
                            >
                                <input
                                    type="date"
                                    value={data.publication_date ?? ''}
                                    onChange={(e) =>
                                        setData(
                                            'publication_date',
                                            e.target.value,
                                        )
                                    }
                                    className={inputCls}
                                />
                            </Field>
                        </div>
                    </SectionCard>
                </div>

                {/* ════════════════════════════════════════
                    ROW 3 — Precios y peso (full width)
                ════════════════════════════════════════ */}
                <div className="mb-5">
                    <SectionCard
                        icon="payments"
                        title="Precios y peso"
                        accent="border-secondary"
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Field
                                label="Valor estimado (COP)"
                                icon="payments"
                                error={errors.price}
                            >
                                <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
                                    <span className="border-r border-gray-200 bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-400">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                        placeholder="0.00"
                                        className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none"
                                    />
                                </div>
                            </Field>

                            <Field
                                label="Peso objetivo"
                                icon="flag"
                                error={errors.target_weight}
                            >
                                <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
                                    <input
                                        type="number"
                                        value={data.target_weight}
                                        onChange={(e) =>
                                            setData(
                                                'target_weight',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="0"
                                        className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none"
                                    />
                                    <span className="border-l border-gray-200 bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-400">
                                        kg
                                    </span>
                                </div>
                            </Field>

                            <Field
                                label="Precio / kg (COP)"
                                icon="price_change"
                                error={errors.price_weight}
                            >
                                <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
                                    <span className="border-r border-gray-200 bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-400">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        value={data.price_weight}
                                        onChange={(e) =>
                                            setData(
                                                'price_weight',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="0.00"
                                        className="w-full bg-transparent px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none"
                                    />
                                    <span className="border-l border-gray-200 bg-gray-100 px-3 py-2.5 text-[10px] font-bold text-gray-400">
                                        /kg
                                    </span>
                                </div>
                            </Field>
                        </div>

                        {/* Resumen calculado */}
                        {estimatedValue && (
                            <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                                <span className="material-symbols-outlined text-[16px] text-green-600">
                                    calculate
                                </span>
                                <p className="text-xs text-green-700">
                                    Valor por peso objetivo:{' '}
                                    <strong>${estimatedValue} COP</strong>
                                </p>
                            </div>
                        )}
                    </SectionCard>
                </div>

                {/* ════════════════════════════════════════
                    ROW 4 — Info adicional (full width, 2 col internas)
                ════════════════════════════════════════ */}
                <div className="mb-5">
                    <SectionCard
                        icon="description"
                        title="Información adicional"
                        hint="Opcional"
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field
                                label="Enfermedades previas"
                                icon="vaccines"
                                error={errors.previous_diseases}
                            >
                                <textarea
                                    value={data.previous_diseases}
                                    onChange={(e) =>
                                        setData(
                                            'previous_diseases',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Describe enfermedades o tratamientos anteriores..."
                                    rows={4}
                                    className={textareaCls}
                                />
                            </Field>

                            <Field
                                label="Descripción"
                                icon="notes"
                                error={errors.description}
                            >
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Información adicional sobre el animal..."
                                    rows={4}
                                    className={textareaCls}
                                />
                            </Field>
                        </div>
                    </SectionCard>
                </div>

                {/* ── Acciones ── */}
                <div className="flex items-center justify-end gap-3 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            close
                        </span>
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95 disabled:opacity-60"
                    >
                        {processing ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-[18px]">
                                    progress_activity
                                </span>
                                Guardando...
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

export default AnimalForm;
