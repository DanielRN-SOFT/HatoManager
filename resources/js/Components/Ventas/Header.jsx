const Header = ({ total = 0 }) => {
    return (
        <section className="relative -mx-8 -mt-16 mb-12 flex h-[400px] items-end overflow-hidden pb-12">
            <div className="absolute inset-0 z-0">
                <img
                    src="/sales.webp"
                    alt="Animales en venta"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>
            <div className="relative z-10 w-full px-8">
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-4 py-1.5">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="whitespace-nowrap text-xs font-medium uppercase tracking-widest text-primary">
                        Catálogo en línea
                    </span>
                </div>
                <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                    Animales en venta
                </h1>
                <p className="mt-3 text-sm text-white/80">
                    Mostrando {total} resultados encontrados en toda Colombia
                </p>
            </div>
        </section>
    );
};

export default Header;
