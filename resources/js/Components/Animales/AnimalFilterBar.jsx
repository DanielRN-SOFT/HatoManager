import { router } from '@inertiajs/react';
import { useState } from 'react';
import TextInput from '../Auth/TextInput';

const AnimalFilterBar = ({ filters, razas, categorias }) => {
    const [form, setForm] = useState({
        ear_tag: filters.ear_tag ?? '',
        status: filters.status ?? '',
        breed_id: filters.breed_id ?? '',
        animal_category_id: filters.animal_category_id ?? '',
        birth_from: filters.birth_from ?? '',
        birth_to: filters.birth_to ?? '',
    });

    const hasActiveFilters = Object.values(form).some(Boolean);

    function handleChange(key, value) {
        const next = { ...form, [key]: value };
        setForm(next);
        router.get(route('animals.index'), next, {
            preserveState: true,
            replace: true,
        });
    }

    function handleClear() {
        const empty = {
            ear_tag: '',
            status: '',
            breed_id: '',
            animal_category_id: '',
            birth_from: '',
            birth_to: '',
        };
        setForm(empty);
        router.get(
            route('animals.index'),
            {},
            {
                // ← objeto vacío {}
                preserveState: true,
                replace: true,
            },
        );
    }

    return (
        <div className="rounded-2xl border bg-white p-5 shadow">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                        tune
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
                        Filtros
                    </span>
                    {hasActiveFilters && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-on-primary">
                            Activos
                        </span>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-error transition-colors hover:bg-error-container/40"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            close
                        </span>
                        Limpiar
                    </button>
                )}
            </div>

            {/* Fila superior: 3 columnas */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <FilterField label="ear_tag" icon="sell">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50">
                        search
                    </span>
                    <TextInput
                        type="text"
                        value={form.ear_tag}
                        onChange={(e) =>
                            handleChange('ear_tag', e.target.value)
                        }
                        placeholder="Ej. 4502"
                    />
                    {form.ear_tag && (
                        <button
                            onClick={() => handleChange('ear_tag', '')}
                            className="shrink-0 text-on-surface-variant/40 hover:text-error"
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                close
                            </span>
                        </button>
                    )}
                </FilterField>

                <FilterField label="Estado" icon="circle">
                    <select
                        value={form.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/40 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="">Todos</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Vendido">Vendido</option>
                        <option value="Reservado">Reservado</option>
                        <option value="Muerto">Muerto</option>
                    </select>
                </FilterField>

                <FilterField label="Raza" icon="pets">
                    <select
                        value={form.breed_id}
                        onChange={(e) => {
                            handleChange('breed_id', e.target.value);
                        }}
                        className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/40 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="">Todas</option>
                        {razas.map((raza) => {
                            return (
                                <option key={raza.id} value={raza.id}>
                                    {' '}
                                    {raza.name}{' '}
                                </option>
                            );
                        })}
                    </select>
                </FilterField>
            </div>

            {/* Fila inferior: 2 columnas */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FilterField label="Categoría" icon="category">
                    <select
                        value={form.animal_category_id}
                        onChange={(e) =>
                            handleChange('animal_category_id', e.target.value)
                        }
                        className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/40 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="">Todas</option>
                        {categorias.map((cat) => {
                            return (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            );
                        })}
                    </select>
                </FilterField>

                <FilterField label="Nacimiento" icon="cake">
                    <TextInput
                        type="date"
                        value={form.birth_from}
                        onChange={(e) =>
                            handleChange('birth_from', e.target.value)
                        }
                        title="Desde"
                    />
                    <span className="shrink-0 text-xs text-on-surface-variant">
                        —
                    </span>
                    <TextInput
                        type="date"
                        value={form.birth_to}
                        onChange={(e) =>
                            handleChange('birth_to', e.target.value)
                        }
                        className="p-"
                        title="Hasta"
                    />
                </FilterField>
            </div>
        </div>
    );
};

const FilterField = ({ label, icon, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
            <span className="material-symbols-outlined text-[13px] text-primary">
                {icon}
            </span>
            {label}
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2">
            {children}
        </div>
    </div>
);

export default AnimalFilterBar;
