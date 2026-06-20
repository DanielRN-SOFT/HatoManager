import { router } from '@inertiajs/react';
import { useState } from 'react';

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
            { preserveState: true, replace: true },
        );
    }

    return (
        <div className="rounded-xl border-t-4 border-primary bg-white px-4 py-4 shadow-sm">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                        tune
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                        Filtros
                    </span>
                    {hasActiveFilters && (
                        <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                            Activos
                        </span>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            close
                        </span>
                        Limpiar
                    </button>
                )}
            </div>

            {/* Fila superior: 4 columnas */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <FilterField label="Nombre o Arete" icon="sell">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                        search
                    </span>
                    <input
                        type="text"
                        value={form.ear_tag}
                        onChange={(e) =>
                            handleChange('ear_tag', e.target.value)
                        }
                        placeholder="Ej. 4502"
                        className="field-input"
                    />
                    {form.ear_tag && (
                        <button
                            onClick={() => handleChange('ear_tag', '')}
                            className="shrink-0 text-gray-300 hover:text-red-400"
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
                        className="field-input"
                    >
                        <option value="">Todos</option>
                        <option value="Activo">Activo</option>
                        <option value="Reservado">Reservado</option>
                        <option value="Publicado"> Publicado</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Vendido">Vendido</option>

                        <option value="Muerto">Muerto</option>
                    </select>
                </FilterField>

                <FilterField label="Raza" icon="pets">
                    <select
                        value={form.breed_id}
                        onChange={(e) =>
                            handleChange('breed_id', e.target.value)
                        }
                        className="field-input"
                    >
                        <option value="">Todas</option>
                        {razas.map((raza) => (
                            <option key={raza.id} value={raza.id}>
                                {raza.name}
                            </option>
                        ))}
                    </select>
                </FilterField>
            </div>

            {/* Fila inferior */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <FilterField label="Categoría" icon="category">
                    <select
                        value={form.animal_category_id}
                        onChange={(e) =>
                            handleChange('animal_category_id', e.target.value)
                        }
                        className="field-input"
                    >
                        <option value="">Todas</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </FilterField>
                <FilterField label="Nacimiento" icon="cake">
                    <input
                        type="date"
                        value={form.birth_from}
                        onChange={(e) =>
                            handleChange('birth_from', e.target.value)
                        }
                        title="Desde"
                        className="field-input"
                    />
                    <span className="shrink-0 text-xs text-gray-400">—</span>
                    <input
                        type="date"
                        value={form.birth_to}
                        onChange={(e) =>
                            handleChange('birth_to', e.target.value)
                        }
                        title="Hasta"
                        className="field-input"
                    />
                </FilterField>
            </div>
        </div>
    );
};

const FilterField = ({ label, icon, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-[13px] text-primary">
                {icon}
            </span>
            {label}
        </label>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2">
            {children}
        </div>
    </div>
);

export default AnimalFilterBar;
