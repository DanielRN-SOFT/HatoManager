export default function FilterBar({ filters = {}, onChange, onFilter }) {
    const handle = (key) => (e) =>
        onChange?.({ ...filters, [key]: e.target.value });

    return (
        <section className="sticky top-16 z-40 border-b border-outline-variant bg-surface-container-low">
            <div className="mx-auto max-w-[1440px] px-8 py-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-xs text-on-surface-variant">
                            Tipo de Ganado
                        </label>
                        <select
                            value={filters.tipo ?? ''}
                            onChange={handle('tipo')}
                            className="h-12 rounded-lg border-outline-variant bg-white text-on-surface focus:border-primary focus:ring-primary"
                        >
                            <option value="">Todos los tipos</option>
                            <option value="novillas">Novillas</option>
                            <option value="toros">Toros</option>
                            <option value="terneros">Terneros</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-xs text-on-surface-variant">
                            Raza
                        </label>
                        <select
                            value={filters.raza ?? ''}
                            onChange={handle('raza')}
                            className="h-12 rounded-lg border-outline-variant bg-white text-on-surface focus:border-primary focus:ring-primary"
                        >
                            <option value="">Todas las razas</option>
                            <option value="brahman">Brahman</option>
                            <option value="angus">Angus</option>
                            <option value="holstein">Holstein</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-xs text-on-surface-variant">
                            Departamento
                        </label>
                        <select
                            value={filters.departamento ?? ''}
                            onChange={handle('departamento')}
                            className="h-12 rounded-lg border-outline-variant bg-white text-on-surface focus:border-primary focus:ring-primary"
                        >
                            <option value="">Todo el país</option>
                            <option value="antioquia">Antioquia</option>
                            <option value="cordoba">Córdoba</option>
                            <option value="meta">Meta</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="px-1 text-xs text-on-surface-variant">
                            Rango de Precio
                        </label>
                        <select
                            value={filters.precio ?? ''}
                            onChange={handle('precio')}
                            className="h-12 rounded-lg border-outline-variant bg-white text-on-surface focus:border-primary focus:ring-primary"
                        >
                            <option value="">Cualquier precio</option>
                            <option value="2-5">COP $2M – $5M</option>
                            <option value="5-10">COP $5M – $10M</option>
                            <option value="10+">Más de $10M</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={onFilter}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary font-bold text-on-primary transition-all hover:bg-primary-container"
                        >
                            <span className="material-symbols-outlined">
                                filter_alt
                            </span>
                            Filtrar Resultados
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
