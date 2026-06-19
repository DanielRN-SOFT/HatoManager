const Paginacion = ({ currentPage = 1, lastPage = 1, onPage }) => {
    const getPages = () => {
        if (lastPage <= 5) {
            return Array.from({ length: lastPage }, (_, i) => i + 1);
        }
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(lastPage, start + 2);
        if (end - start < 2) start = Math.max(1, end - 2);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };
    const pages = getPages();
    const showStartEllipsis = pages[0] > 1;
    const showEndEllipsis = pages[pages.length - 1] < lastPage;

    const baseBtn =
        'flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-colors';

    return (
        <nav className="mt-10 flex items-center justify-center gap-2">
            {/* Chevron izquierdo */}
            <button
                onClick={() => onPage?.(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${baseBtn} border border-outline-variant text-outline hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40`}
            >
                <span className="material-symbols-outlined text-[20px]">
                    chevron_left
                </span>
            </button>

            {/* Primera página + ellipsis inicial */}
            {showStartEllipsis && (
                <>
                    <button
                        onClick={() => onPage?.(1)}
                        className={`${baseBtn} border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary`}
                    >
                        1
                    </button>
                    <span className="px-1 text-outline">···</span>
                </>
            )}

            {/* Ventana de páginas */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPage?.(page)}
                    className={`${baseBtn} ${
                        page === currentPage
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Ellipsis final + última página */}
            {showEndEllipsis && (
                <>
                    <span className="px-1 text-outline">···</span>
                    <button
                        onClick={() => onPage?.(lastPage)}
                        className={`${baseBtn} border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary`}
                    >
                        {lastPage}
                    </button>
                </>
            )}

            {/* Chevron derecho */}
            <button
                onClick={() => onPage?.(currentPage + 1)}
                disabled={currentPage === lastPage}
                className={`${baseBtn} border border-outline-variant text-outline hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40`}
            >
                <span className="material-symbols-outlined text-[20px]">
                    chevron_right
                </span>
            </button>
        </nav>
    );
};

export default Paginacion;
