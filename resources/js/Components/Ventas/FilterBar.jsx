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
    // Estado local para los sliders — evita requests en cada píxel
    const [localPeso, setLocalPeso] = useState(filters.peso ?? maxWeight);
    const [localPrecio, setLocalPrecio] = useState(filters.precio ?? maxPrice);

    // Sincronizar si los filtros cambian desde afuera (ej. al limpiar)
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

    // Solo dispara el filtro al soltar el slider (mouseUp / touchEnd)
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
        'w-full bg-surface-container border border-outline-variant rounded-xl text-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary';

    const labelClass =
        'block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider';

    const pesoActivo = filters.peso && Number(filters.peso) < Number(maxWeight);
    const precioActivo =
        filters.precio && Number(filters.precio) < Number(maxPrice);

    return (
        <section className="mb-8 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
            <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3 lg:grid-cols-6">
                {/* Raza */}
                <div>
                    <label className={labelClass}>Raza</label>
                    <select
                        className={`${selectClass} cursor-pointer`}
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

                {/* Categoría */}
                <div>
                    <label className={labelClass}>Categoría</label>
                    <select
                        className={`${selectClass} cursor-pointer`}
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

                {/* Departamento */}
                <div>
                    <label className={labelClass}>Departamento</label>
                    <select
                        className={`${selectClass} cursor-pointer`}
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

                {/* Peso */}
                <div>
                    <label className={labelClass}>
                        Peso máx:{' '}
                        {pesoActivo ? `${localPeso} kg` : 'Sin límite'}
                    </label>
                    <input
                        type="range"
                        min={minWeight}
                        max={maxWeight}
                        value={localPeso}
                        onChange={(e) => setLocalPeso(e.target.value)} // solo mueve UI
                        onMouseUp={commitPeso} // dispara filtro
                        onTouchEnd={commitPeso} // soporte móvil
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-outline">
                        <span>{minWeight} kg</span>
                        <span>{maxWeight} kg</span>
                    </div>
                </div>

                {/* Precio */}
                <div>
                    <label className={labelClass}>
                        Precio máx:{' '}
                        {precioActivo
                            ? `$${Number(localPrecio).toLocaleString('es-CO')}`
                            : 'Sin límite'}
                    </label>
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={localPrecio}
                        onChange={(e) => setLocalPrecio(e.target.value)} // solo mueve UI
                        onMouseUp={commitPrecio} // ← antes decía 'peso' — BUG CORREGIDO
                        onTouchEnd={commitPrecio} // soporte móvil
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-outline">
                        <span>{minPrice}</span>
                        <span>{maxPrice}</span>
                    </div>
                </div>

                {/* Botón Limpiar — al final del grid */}
                {hayFiltros && (
                    <div className="flex items-end">
                        <button
                            onClick={onClear}
                            className="w-full rounded-xl border border-outline-variant bg-surface-container px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
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
