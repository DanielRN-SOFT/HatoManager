const Header = ({animal}) => {
    return (
        <div className="mb-8">
            <div className="mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">
                    {animal ? 'edit' : 'add_circle'}
                </span>
                <h2 className="text-xl font-bold text-on-surface">
                    {animal ? 'Editar animal' : 'Registrar animal'}
                </h2>
            </div>
            <p className="text-sm text-on-surface-variant">
                {animal
                    ? 'Actualiza la información del animal en el sistema.'
                    : 'Completa los datos para añadir un nuevo animal al hato.'}
            </p>
        </div>
    );
};

export default Header;
