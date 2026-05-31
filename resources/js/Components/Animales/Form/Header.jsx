import { router } from '@inertiajs/react';

const Header = ({ animal }) => {
    function handleCancel() {
        router.visit(route('animales.index'));
    }

    return (
        <div className="mb-8 flex justify-between">
            <div className="mb-1 flex flex-col gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">
                    {animal ? 'edit' : 'add_circle'}
                </span>
                <h2 className="text-xl font-bold text-on-surface">
                    {animal ? 'Editar animal' : 'Registrar animal'}
                </h2>
                <p className="text-sm text-on-surface-variant">
                    {animal
                        ? 'Actualiza la información del animal en el sistema.'
                        : 'Completa los datos para añadir un nuevo animal al hato.'}
                </p>
            </div>

            <div className="mb-6 flex items-center">
                <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                    </span>
                    Volver
                </button>
            </div>
        </div>
    );
};

export default Header;
