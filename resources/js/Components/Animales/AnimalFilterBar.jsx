import { router } from '@inertiajs/react';
import { useState } from 'react';

const AnimalFilterBar = ({ filters }) => {
    const [form, setForm] = useState({
        status: filters.status ?? '',
        breed: filters.breed ?? '',
        category: filters.category ?? '',
        birth_from: filters.birth_from ?? '',
        birth_to: filters.birth_to ?? '',
    });

    const hasActiveFilters = Object.values(form).some(Boolean);

    function handleChange(key, value) {
        const next = { ...form, [key]: value };
        setForm(next);
        router.get(route('animales.index'), next, {
            preserveState: true,
            replace: true,
        });
    }

    function handleClear() {
        const empty = {
            status: '',
            breed: '',
            category: '',
            birth_from: '',
            birth_to: '',
        };
        setForm(empty);
        router.get(route('animales.index'), empty, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm shadow-black/5">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                        filter_list
                    </span>
                    Filtros
                    {hasActiveFilters && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-on-primary">
                            activos
                        </span>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-semibold text-error transition-colors hover:bg-error-container/40"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            close
                        </span>
                        Limpiar
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <FilterChip
                    icon="circle"
                    value={form.status}
                    onChange={(v) => handleChange('status', v)}
                    placeholder="Estado"
                >
                    <option value="al_dia">Al día</option>
                    <option value="proxima_a_vencer">Próxima a vencer</option>
                    <option value="vencida">Vencida</option>
                </FilterChip>

                <FilterChip
                    icon="pets"
                    value={form.breed}
                    onChange={(v) => handleChange('breed', v)}
                    placeholder="Raza"
                >
                    <option value="brahman">Brahman</option>
                    <option value="gyr">Gyr</option>
                    <option value="angus">Angus</option>
                </FilterChip>

                <FilterChip
                    icon="category"
                    value={form.category}
                    onChange={(v) => handleChange('category', v)}
                    placeholder="Categoría"
                >
                    <option value="novilla">Novilla</option>
                    <option value="toro">Toro</option>
                    <option value="vaca_parida">Vaca Parida</option>
                    <option value="ternero">Ternero</option>
                </FilterChip>

                {/* Rango nacimiento */}
                <div className="flex items-center gap-2 rounded-2xl bg-surface-container-low px-3 py-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                        cake
                    </span>
                    <input
                        type="date"
                        value={form.birth_from}
                        onChange={(e) =>
                            handleChange('birth_from', e.target.value)
                        }
                        className="bg-transparent text-xs text-on-surface focus:outline-none"
                        title="Desde"
                    />
                    <span className="text-xs font-medium text-on-surface-variant">
                        —
                    </span>
                    <input
                        type="date"
                        value={form.birth_to}
                        onChange={(e) =>
                            handleChange('birth_to', e.target.value)
                        }
                        className="bg-transparent text-xs text-on-surface focus:outline-none"
                        title="Hasta"
                    />
                </div>
            </div>
        </div>
    );
};

const FilterChip = ({ icon, value, onChange, placeholder, children }) => (
    <div
        className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-xs transition-all duration-150 ${
            value
                ? 'bg-primary/10 text-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
        }`}
    >
        <span
            className={`material-symbols-outlined text-[15px] ${value ? 'text-primary' : ''}`}
        >
            {icon}
        </span>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border border-gray-400 rounded-lg font-medium focus:outline-none"
        >
            <option value="">{placeholder}</option>
            {children}
        </select>
    </div>
);

export default AnimalFilterBar;
