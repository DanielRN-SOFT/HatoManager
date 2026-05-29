// resources/js/Pages/Fincas/MisFincas.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/* ══════════════════════════════════════════════════════════════
 |  Flash
 ╚═════════════════════════════════════════════════════════════ */
function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setVisible(true);
            const t = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(t);
        }
    }, [flash]);

    if (!visible || (!flash?.success && !flash?.error)) return null;

    const isSuccess = !!flash.success;

    return (
        <div
            className={[
                'mb-6 flex items-start gap-3 rounded-xl border px-4 py-3',
                isSuccess
                    ? 'bg-primary/8 border-primary/30 text-primary'
                    : 'bg-error/8 border-error/30 text-error',
            ].join(' ')}
        >
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px]">
                {isSuccess ? 'check_circle' : 'error'}
            </span>
            <p className="text-sm font-medium">
                {flash.success ?? flash.error}
            </p>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
 |  FarmForm — usado para crear y editar
 ╚═════════════════════════════════════════════════════════════ */
const Field = ({
    label,
    name,
    type = 'text',
    placeholder,
    data,
    setData,
    errors,
}) => (
    <div>
        <label className="mb-1 block text-xs font-medium text-on-surface-variant">
            {label}
        </label>
        <input
            type={type}
            value={data[name]}
            onChange={(e) => setData(name, e.target.value)}
            placeholder={placeholder}
            step={type === 'number' ? 'any' : undefined}
            className={[
                'w-full rounded-lg border bg-surface px-3 py-2 text-sm text-on-surface',
                'placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30',
                errors[name]
                    ? 'border-error focus:ring-error/20'
                    : 'border-outline-variant',
            ].join(' ')}
        />
        {errors[name] && (
            <p className="mt-1 text-xs text-error">{errors[name]}</p>
        )}
    </div>
);
function FarmForm({ farm = null, onCancel }) {
    const isEditing = !!farm;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: farm?.name ?? '',
        address: farm?.address ?? '',
        phone: farm?.phone ?? '',
        city: farm?.city ?? '',
        department: farm?.department ?? '',
        area: farm?.area ?? '',
        target_weight: farm?.target_weight ?? '',
        price_weight: farm?.price_weight ?? '',
    });

    function submit(e) {
        e.preventDefault();
        if (isEditing) {
            put(route('farms.update', farm.id), {
                preserveScroll: true,
                onSuccess: () => onCancel(),
            });
        } else {
            post(route('farms.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onCancel();
                },
            });
        }
    }

    return (
        <form
            onSubmit={submit}
            className="rounded-xl border border-outline-variant bg-surface-container-low p-5"
        >
            <p className="mb-4 text-sm font-semibold text-on-surface">
                {isEditing ? `Editando: ${farm.name}` : 'Nueva Finca'}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                    label="Nombre *"
                    name="name"
                    placeholder="El Paraíso"
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <Field
                    label="Municipio *"
                    name="city"
                    placeholder="Cartago"
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <Field
                    label="Departamento *"
                    name="department"
                    placeholder="Valle del Cauca"
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <Field
                    label="Dirección *"
                    name="address"
                    placeholder="Vereda La Unión km 3"
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <Field
                    label="Teléfono"
                    name="phone"
                    placeholder="3001234567"
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <Field
                    label="Área (ha) *"
                    name="area"
                    type="number"
                    placeholder="120.5"
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <Field
                    label="Peso objetivo (kg) *"
                    name="target_weight"
                    type="number"
                    placeholder="450"
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <Field
                    label="Precio por kg (COP) *"
                    name="price_weight"
                    type="number"
                    placeholder="8500"
                    data={data}
                    setData={setData}
                    errors={errors}
                />
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-outline-variant px-4 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity disabled:opacity-60"
                >
                    <span className="material-symbols-outlined text-[16px]">
                        save
                    </span>
                    {processing
                        ? 'Guardando…'
                        : isEditing
                          ? 'Guardar cambios'
                          : 'Crear finca'}
                </button>
            </div>
        </form>
    );
}

/* ══════════════════════════════════════════════════════════════
 |  ConfirmDialog — confirmación de desactivación
 ╚═════════════════════════════════════════════════════════════ */
function ConfirmDialog({ farm, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-sm rounded-2xl border border-outline-variant bg-surface p-6 shadow-xl">
                <div className="mb-3 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[28px] text-error">
                        warning
                    </span>
                    <h2 className="text-base font-semibold text-on-surface">
                        ¿Desactivar finca?
                    </h2>
                </div>
                <p className="mb-5 text-sm text-on-surface-variant">
                    La finca{' '}
                    <span className="font-medium text-on-surface">
                        "{farm.name}"
                    </span>{' '}
                    pasará a modo solo lectura. No podrás agregar nuevos
                    animales, eventos sanitarios ni subastas, pero conservarás
                    todo el historial.
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-outline-variant px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-error px-4 py-2 text-sm font-medium text-on-error transition-opacity hover:opacity-90"
                    >
                        Sí, desactivar
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
 |  FarmCard
 ╚═════════════════════════════════════════════════════════════ */
function FarmCard({ farm, onEdit, onDeactivate }) {
    const isActive = !farm.deleted_at;

    return (
        <div
            className={[
                'rounded-xl border p-4 transition-all',
                isActive
                    ? 'border-outline-variant bg-surface-container-low'
                    : 'border-outline-variant/40 bg-surface-container-lowest opacity-60',
            ].join(' ')}
        >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-on-surface">
                        {farm.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                        {farm.city}, {farm.department}
                    </p>
                </div>
                <span
                    className={[
                        'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                        isActive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-outline-variant/30 text-on-surface-variant',
                    ].join(' ')}
                >
                    {isActive ? 'Activa' : 'Inactiva'}
                </span>
            </div>

            {/* Datos */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        straighten
                    </span>
                    {farm.area} ha
                </span>
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        monitor_weight
                    </span>
                    {farm.target_weight} kg objetivo
                </span>
                <span className="col-span-2 flex items-center gap-1 truncate">
                    <span className="material-symbols-outlined text-[14px]">
                        location_on
                    </span>
                    {farm.address}
                </span>
            </div>

            {/* Acciones — solo si está activa */}
            {isActive && (
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(farm)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-outline-variant px-3 py-1.5 text-xs text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            edit
                        </span>
                        Editar
                    </button>
                    <button
                        onClick={() => onDeactivate(farm)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-error/30 px-3 py-1.5 text-xs text-error transition-colors hover:bg-error/5"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            hide_source
                        </span>
                        Desactivar
                    </button>
                </div>
            )}

            {isActive === false && (
                <p className="text-center text-[11px] italic text-on-surface-variant/60">
                    Solo lectura
                </p>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
 |  MisFincas — página principal
 ╚═════════════════════════════════════════════════════════════ */
export default function MisFincas({ farms }) {
    const [showForm, setShowForm] = useState(false);
    const [editingFarm, setEditingFarm] = useState(null);
    const [confirmFarm, setConfirmFarm] = useState(null);

    const { delete: destroy, processing: deleting } = useForm();

    function handleEdit(farm) {
        setEditingFarm(farm);
        setShowForm(false);
    }

    function handleDeactivate(farm) {
        setConfirmFarm(farm);
    }

    function confirmDeactivate() {
        destroy(route('farms.destroy', confirmFarm.id), {
            preserveScroll: true,
            onSuccess: () => setConfirmFarm(null),
            onError: () => setConfirmFarm(null),
        });
    }

    const activeFarms = farms.filter((f) => !f.deleted_at);
    const inactiveFarms = farms.filter((f) => f.deleted_at);

    return (
        <AuthenticatedLayout>
            <Head title="Mis Fincas" />

            <div className="mx-auto max-w-4xl px-4 py-8">
                {/* Título */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-on-surface">
                            Mis Fincas
                        </h1>
                        <p className="text-sm text-on-surface-variant">
                            {activeFarms.length} activa
                            {activeFarms.length !== 1 ? 's' : ''}
                            {inactiveFarms.length > 0 &&
                                ` · ${inactiveFarms.length} inactiva${inactiveFarms.length !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                    {!showForm && !editingFarm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add
                            </span>
                            Nueva Finca
                        </button>
                    )}
                </div>

                <Flash />

                {/* Formulario de creación */}
                {showForm && (
                    <div className="mb-6">
                        <FarmForm onCancel={() => setShowForm(false)} />
                    </div>
                )}

                {/* Formulario de edición */}
                {editingFarm && (
                    <div className="mb-6">
                        <FarmForm
                            farm={editingFarm}
                            onCancel={() => setEditingFarm(null)}
                        />
                    </div>
                )}

                {/* Sin fincas */}
                {farms.length === 0 && !showForm && (
                    <div className="rounded-xl border border-dashed border-outline-variant py-16 text-center">
                        <span className="material-symbols-outlined mb-2 text-[40px] text-on-surface-variant/40">
                            forest
                        </span>
                        <p className="text-sm text-on-surface-variant">
                            Aún no tienes fincas registradas.
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-3 text-sm text-primary underline-offset-2 hover:underline"
                        >
                            Crear mi primera finca
                        </button>
                    </div>
                )}

                {/* Grid de fincas activas */}
                {activeFarms.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {activeFarms.map((farm) => (
                            <FarmCard
                                key={farm.id}
                                farm={farm}
                                onEdit={handleEdit}
                                onDeactivate={handleDeactivate}
                            />
                        ))}
                    </div>
                )}

                {/* Fincas inactivas */}
                {inactiveFarms.length > 0 && (
                    <div className="mt-8">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-on-surface-variant/60">
                            Inactivas
                        </p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {inactiveFarms.map((farm) => (
                                <FarmCard
                                    key={farm.id}
                                    farm={farm}
                                    onEdit={handleEdit}
                                    onDeactivate={handleDeactivate}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Diálogo de confirmación */}
            {confirmFarm && (
                <ConfirmDialog
                    farm={confirmFarm}
                    onConfirm={confirmDeactivate}
                    onCancel={() => setConfirmFarm(null)}
                />
            )}
        </AuthenticatedLayout>
    );
}
