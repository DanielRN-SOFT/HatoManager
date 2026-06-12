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

    return (
        <nav className="mt-3xl gap-sm mt-5 flex items-center justify-center gap-2">
            {/* Chevron izquierdo */}
            <button
                onClick={() => onPage?.(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-outline transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {/* Primera página + ellipsis inicial */}
            {showStartEllipsis && (
                <>
                    <button
                        onClick={() => onPage?.(1)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant font-bold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                    >
                        1
                    </button>
                    <span className="px-2 text-outline">...</span>
                </>
            )}

            {/* Ventana de páginas */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPage?.(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold transition-colors ${
                        page === currentPage
                            ? 'bg-primary text-on-primary'
                            : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Ellipsis final + última página */}
            {showEndEllipsis && (
                <>
                    <span className="px-2 text-outline">...</span>
                    <button
                        onClick={() => onPage?.(lastPage)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant font-bold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                    >
                        {lastPage}
                    </button>
                </>
            )}

            {/* Chevron derecho */}
            <button
                onClick={() => onPage?.(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-outline transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </nav>
    );
};

export default Paginacion;
