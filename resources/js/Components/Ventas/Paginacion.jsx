const Paginacion = ({ currentPage = 1, lastPage = 1, onPage }) => {
    return (
        <nav className="mt-3xl gap-sm flex items-center justify-center gap-2 mt-5">
            <button
                onClick={() => onPage?.(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant text-outline transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 gap-3"
            >
                <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {Array.from({ length: Math.min(lastPage, 3) }, (_, i) => i + 1).map(
                (page) => (
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
                ),
            )}

            {lastPage > 3 && (
                <>
                    <span className="px-2 text-outline">...</span>
                    <button
                        onClick={() => onPage?.(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className="px-md flex h-10 items-center justify-center rounded-lg border border-outline-variant font-medium text-on-surface-variant transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Siguiente
                    </button>
                </>
            )}

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
