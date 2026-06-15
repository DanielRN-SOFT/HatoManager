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
        'w-full bg-surface-container border border-outline-variant rounded-xl text-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer';

    const labelClass =
        'block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider';

    const pesoActivo = filters.peso && Number(filters.peso) < Number(maxWeight);
    const precioActivo =
        filters.precio && Number(filters.precio) < Number(maxPrice);

    return (
        <section className="mb-8 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">
            {/* Fila 1: selects */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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

            {/* Fila 2: sliders + botón limpiar */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
                {/* Peso */}
                <div className="flex-1">
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
                    <div className="mt-1 flex justify-between text-[10px] text-outline">
                        <span>{minWeight} kg</span>
                        <span>{maxWeight} kg</span>
                    </div>
                </div>

                {/* Precio */}
                <div className="flex-1">
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
                    <div className="mt-1 flex justify-between text-[10px] text-outline">
                        <span>${Number(minPrice).toLocaleString('es-CO')}</span>
                        <span>${Number(maxPrice).toLocaleString('es-CO')}</span>
                    </div>
                </div>

                {/* Botón limpiar */}
                {hayFiltros && (
                    <div className="sm:w-40">
                        <button
                            onClick={onClear}
                            className="w-full rounded-xl border border-outline-variant bg-surface-container px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:border-error hover:bg-error-container hover:text-on-error-container"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FilterBar;
