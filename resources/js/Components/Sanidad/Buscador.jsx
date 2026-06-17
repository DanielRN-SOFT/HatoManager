const Buscador = ({ search, setSearch, searchRef }) => {
    return (
        <div className="border-b border-gray-100 p-2">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 focus-within:border-green-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20">
                <span className="material-symbols-outlined text-[16px] text-gray-400">
                    search
                </span>
                <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por arete, nombre o raza..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            close
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Buscador;
