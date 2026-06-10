const FilterBar = ({ filters = {}, onChange, onFilter }) => {
    function handleChange(key, value) {
        onChange?.({ ...filters, [key]: value });
    }

    const selectClass =
        'w-full bg-surface-container border border-outline-variant rounded-xl text-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary';

    const labelClass =
        'block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider';

    return (
        <section className="mb-8 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
            <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3 lg:grid-cols-6">
                {/* Raza */}
                <div>
                    <label className={labelClass}>Raza</label>
                    <select
                        className={selectClass}
                        value={filters.raza || ''}
                        onChange={(e) => handleChange('raza', e.target.value)}
                    >
                        <option value="">Todas las razas</option>
                        <option>Brahman</option>
                        <option>Angus</option>
                        <option>Brangus</option>
                        <option>Holstein</option>
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
                        <option>Novillo</option>
                        <option>Vaquilla</option>
                        <option>Toro</option>
                        <option>Vaca</option>
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
                        <option>Antioquia</option>
                        <option>Córdoba</option>
                        <option>Meta</option>
                        <option>Casanare</option>
                    </select>
                </div>

                {/* Rango de peso */}
                <div>
                    <label className={labelClass}>
                        Peso máx: {filters.peso || 450} kg
                    </label>
                    <input
                        type="range"
                        min="200"
                        max="800"
                        value={filters.peso || 450}
                        onChange={(e) => handleChange('peso', e.target.value)}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-outline">
                        <span>200 kg</span>
                        <span>800 kg</span>
                    </div>
                </div>

                {/* Rango de precio */}
                <div>
                    <label className={labelClass}>
                        Precio máx: $
                        {Number(filters.precio || 5000000).toLocaleString(
                            'es-CO',
                        )}
                    </label>
                    <input
                        type="range"
                        min="1000000"
                        max="10000000"
                        step="100000"
                        value={filters.precio || 5000000}
                        onChange={(e) => handleChange('precio', e.target.value)}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-outline">
                        <span>$1M</span>
                        <span>$10M</span>
                    </div>
                </div>

                {/* Botón */}
                <div>
                    <button
                        onClick={onFilter}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2 font-bold text-on-primary shadow-md shadow-primary/30 transition-all duration-150 hover:brightness-110 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            tune
                        </span>
                        Filtrar
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FilterBar;
