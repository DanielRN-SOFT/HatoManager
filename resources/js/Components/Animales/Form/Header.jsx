const Header = ({ animal, handleCancel }) => {
    
    return (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                    <span className="material-symbols-outlined text-[24px] text-on-primary">
                        {animal ? 'edit' : 'add_circle'}
                    </span>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                        {animal
                            ? `Editando · #${animal.ear_tag}`
                            : 'Nuevo registro'}
                    </p>
                    <h1 className="text-2xl font-bold text-on-surface">
                        {animal ? animal.name : 'Registrar animal'}
                    </h1>
                </div>
            </div>
            <button
                onClick={handleCancel}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
                <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                </span>
                Volver
            </button>
        </div>
    );
};

export default Header;
