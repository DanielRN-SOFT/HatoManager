import { router } from '@inertiajs/react';
import { useState } from 'react';

const UserFilterBar = ({ filters, roles }) => {
    const [form, setForm] = useState({
        search: filters.search ?? '',
        role: filters.role ?? '',
        status: filters.status ?? '',
    });

    const hasActiveFilters = Object.values(form).some(Boolean);

    function handleChange(key, value) {
        const next = { ...form, [key]: value };
        setForm(next);
        router.get(route('users.index'), next, {
            preserveState: true,
            replace: true,
        });
    }

    function handleClear() {
        const empty = { search: '', role: '', status: '' };
        setForm(empty);
        router.get(
            route('users.index'),
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Búsqueda */}
                <FilterField label="Nombre o Email" icon="search">
                    <span className="material-symbols-outlined text-[16px] text-gray-400">
                        search
                    </span>
                    <input
                        type="text"
                        value={form.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                        placeholder="Ej. Juan o juan@..."
                        className="field-input"
                    />
                    {form.search && (
                        <button
                            onClick={() => handleChange('search', '')}
                            className="shrink-0 text-gray-300 hover:text-red-400"
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                close
                            </span>
                        </button>
                    )}
                </FilterField>

                {/* Rol */}
                <FilterField label="Rol" icon="shield_person">
                    <select
                        value={form.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        className="field-input"
                    >
                        <option value="">Todos los roles</option>
                        {roles.map((r) => (
                            <option key={r.id} value={r.name}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                </FilterField>

                {/* Estado verificación */}
                <FilterField label="Verificación" icon="mark_email_read">
                    <select
                        value={form.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="field-input"
                    >
                        <option value="">Todos</option>
                        <option value="verified">Verificado</option>
                        <option value="unverified">Sin verificar</option>
                    </select>
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

export default UserFilterBar;
