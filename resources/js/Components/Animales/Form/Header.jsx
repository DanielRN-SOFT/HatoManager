const Header = ({ animal }) => {
    return (
        <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
                <span className="material-symbols-outlined text-[20px] text-on-primary">
                    {animal ? 'edit' : 'add_circle'}
                </span>
            </div>
            <div className="flex-1">
                <h2 className="text-base font-semibold text-gray-800">
                    {animal ? 'Editar animal' : 'Nuevo animal'}
                </h2>
                <p className="text-xs text-gray-500">
                    {animal
                        ? 'Actualiza la información del animal en el sistema.'
                        : 'Completa los datos para añadir un nuevo animal al hato.'}
                </p>
            </div>
        </div>
    );
};

export default Header;
