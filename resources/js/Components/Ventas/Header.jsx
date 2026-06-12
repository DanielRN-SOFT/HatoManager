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
        </header>
    );
};

export default Header;
