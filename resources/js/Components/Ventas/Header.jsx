const Header = ({ total = 0 }) => {
    return (
        <header className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
                <h1 className="text-3xl font-bold text-on-surface">
                    Animales en venta
                </h1>
                <p className="mt-1 text-sm text-on-surface-variant">
                    Mostrando {total} resultados encontrados en toda Colombia
                </p>
            </div>
            <div className="w-full md:w-auto">
                <select className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary md:w-[200px]">
                    <option>Más recientes</option>
                    <option>Menor precio</option>
                    <option>Mayor peso</option>
                </select>
            </div>
        </header>
    );
};

export default Header;
