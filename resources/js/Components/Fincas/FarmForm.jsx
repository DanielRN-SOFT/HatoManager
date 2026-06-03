import { useForm } from '@inertiajs/react';
import FarmField from './FarmField';

export default function FarmForm({ farm = null, onCancel, hideTitle = false }) {
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

    const fieldProps = { data, setData, errors };

    return (
        <form
            onSubmit={submit}
            className="rounded-xl border border-outline-variant bg-surface-container-low p-5"
        >
            {!hideTitle && (
                <p className="mb-4 text-sm font-semibold text-on-surface">
                    {isEditing ? `Editando: ${farm.name}` : 'Nueva Finca'}
                </p>
            )}
            <p className="mb-4 text-sm font-semibold text-on-surface">
                {isEditing ? `Editando: ${farm.name}` : 'Nueva Finca'}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FarmField
                    label="Nombre *"
                    name="name"
                    placeholder="El Paraíso"
                    {...fieldProps}
                />
                <FarmField
                    label="Municipio *"
                    name="city"
                    placeholder="Cartago"
                    {...fieldProps}
                />
                <FarmField
                    label="Departamento *"
                    name="department"
                    placeholder="Valle del Cauca"
                    {...fieldProps}
                />
                <FarmField
                    label="Dirección *"
                    name="address"
                    placeholder="Vereda La Unión km 3"
                    {...fieldProps}
                />
                <FarmField
                    label="Teléfono"
                    name="phone"
                    placeholder="3001234567"
                    {...fieldProps}
                />
                <FarmField
                    label="Área (ha) *"
                    name="area"
                    type="number"
                    placeholder="120.5"
                    {...fieldProps}
                />
                <FarmField
                    label="Peso objetivo (kg) *"
                    name="target_weight"
                    type="number"
                    placeholder="450"
                    {...fieldProps}
                />
                <FarmField
                    label="Precio por kg (COP) *"
                    name="price_weight"
                    type="number"
                    placeholder="8500"
                    {...fieldProps}
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
