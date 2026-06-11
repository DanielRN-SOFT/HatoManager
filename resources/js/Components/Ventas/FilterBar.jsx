const FilterBar = ({
    filters = {},
    breeds,
    categories,
    departments,
    onChange,
    onFilter,
}) => {
    function handleChange(key, value) {
        const updated = { ...filters, [key]: value };
        onChange?.(updated);
        onFilter?.(updated);
    }

    const selectClass =
        'w-full bg-surface-container border border-outline-variant rounded-xl text-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary';

    const labelClass =
        'block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider';

    return (
        <section className="mb-8 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
            <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3 lg:grid-cols-5">
                {/* Raza */}
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

                {/* Categoría */}
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

                {/* Departamento */}
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

                {/* Rango de peso */}
                <div>
                    <label className={labelClass}>
                        Peso máx:{' '}
                        {filters.peso ? `${filters.peso} kg` : 'Sin límite'}
                    </label>
                    <input
                        type="range"
                        min="200"
                        max="800"
                        value={filters.peso || 800} // ← máximo = sin límite
                        onChange={(e) => handleChange('peso', e.target.value)}
                        onMouseUp={(e) => handleChange('peso', e.target.value)}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-outline">
                        <span>200 kg</span>
                        <span>Sin límite</span>
                    </div>
                </div>

                {/* Rango de precio */}
                <div>
                    <label className={labelClass}>
                        Precio máx:{' '}
                        {filters.precio
                            ? `$${Number(filters.precio).toLocaleString('es-CO')}`
                            : 'Sin límite'}
                    </label>
                    <input
                        type="range"
                        min="1000000"
                        max="10000000"
                        step="100000"
                        value={filters.precio || 10000000} // ← máximo = sin límite
                        onChange={(e) => handleChange('precio', e.target.value)}
                        onMouseUp={(e) => handleChange('peso', e.target.value)}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-outline">
                        <span>$1M</span>
                        <span>Sin límite</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterBar;
