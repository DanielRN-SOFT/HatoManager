import { useEffect, useState } from 'react';

const FilterBar = ({
    filters = {},
    breeds,
    categories,
    departments,
    onChange,
    onFilter,
    minWeight,
    maxWeight,
    minPrice = 1000000,
    maxPrice = 10000000,
    onClear,
    hayFiltros,
}) => {
    const [localPeso, setLocalPeso] = useState(filters.peso ?? maxWeight);
    const [localPrecio, setLocalPrecio] = useState(filters.precio ?? maxPrice);

    useEffect(() => {
        setLocalPeso(filters.peso ?? maxWeight);
    }, [filters.peso, maxWeight]);

    useEffect(() => {
        setLocalPrecio(filters.precio ?? maxPrice);
    }, [filters.precio, maxPrice]);

    function handleChange(key, value) {
        const updated = { ...filters, [key]: value };
        onChange?.(updated);
        onFilter?.(updated);
    }

    function commitPeso() {
        const value = Number(localPeso) >= Number(maxWeight) ? '' : localPeso;
        handleChange('peso', value);
    }

    function commitPrecio() {
        const value =
            Number(localPrecio) >= Number(maxPrice) ? '' : localPrecio;
        handleChange('precio', value);
    }

    const selectClass =
        'w-full rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer';

    const labelClass =
        'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-on-surface-variant';

    const pesoActivo = filters.peso && Number(filters.peso) < Number(maxWeight);
    const precioActivo =
        filters.precio && Number(filters.precio) < Number(maxPrice);

    return (
        <section className="mb-5 rounded-2xl border border-outline-variant bg-white p-8">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                        <span
                            className="material-symbols-outlined text-xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            tune
                        </span>
                    </div>
                    <h2 className="text-lg font-bold text-on-surface">
                        Filtrar resultados
                    </h2>
                </div>

                {hayFiltros && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-1.5 rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition-colors hover:border-error hover:bg-error-container hover:text-on-error-container"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            filter_alt_off
                        </span>
                        Limpiar filtros
                    </button>
                )}
            </div>

            {/* Fila 1: selects */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <label className={labelClass}>Raza</label>
                    <select
                        className={selectClass}
                        value={filters.raza || ''}
                        onChange={(e) => handleChange('raza', e.target.value)}
                    >
                        <option value="">Todas las razas</option>
                        {breeds.map((breed) => (
                            <option key={breed.id} value={breed.id}>
                                {breed.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Categoría</label>
                    <select
                        className={selectClass}
                        value={filters.categoria || ''}
                        onChange={(e) =>
                            handleChange('categoria', e.target.value)
                        }
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Departamento</label>
                    <select
                        className={selectClass}
                        value={filters.departamento || ''}
                        onChange={(e) =>
                            handleChange('departamento', e.target.value)
                        }
                    >
                        <option value="">Todos</option>
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Estado</label>
                    <select
                        className={selectClass}
                        value={filters.estado || ''}
                        onChange={(e) => handleChange('estado', e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="Publicado">Disponible</option>
                        <option value="Reservado">Reservado</option>
                    </select>
                </div>
            </div>

            {/* Separador */}
            <div className="my-6 h-px bg-outline-variant" />

            {/* Fila 2: sliders */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Peso */}
                <div>
                    <label className={labelClass}>
                        Peso máx:{' '}
                        <span className="text-primary">
                            {pesoActivo ? `${localPeso} kg` : 'Sin límite'}
                        </span>
                    </label>
                    <input
                        type="range"
                        min={minWeight}
                        max={maxWeight}
                        step={1}
                        value={localPeso}
                        onChange={(e) => setLocalPeso(e.target.value)}
                        onMouseUp={commitPeso}
                        onTouchEnd={commitPeso}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary"
                    />
                    <div className="mt-1.5 flex justify-between text-[10px] text-outline">
                        <span>{minWeight} kg</span>
                        <span>{maxWeight} kg</span>
                    </div>
                </div>

                {/* Precio */}
                <div>
                    <label className={labelClass}>
                        Precio máx:{' '}
                        <span className="text-primary">
                            {precioActivo
                                ? `$${Number(localPrecio).toLocaleString('es-CO')}`
                                : 'Sin límite'}
                        </span>
                    </label>
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step={1000}
                        value={localPrecio}
                        onChange={(e) => setLocalPrecio(e.target.value)}
                        onMouseUp={commitPrecio}
                        onTouchEnd={commitPrecio}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary"
                    />
                    <div className="mt-1.5 flex justify-between text-[10px] text-outline">
                        <span>${Number(minPrice).toLocaleString('es-CO')}</span>
                        <span>${Number(maxPrice).toLocaleString('es-CO')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterBar;
