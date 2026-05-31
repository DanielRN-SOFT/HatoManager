import { router } from '@inertiajs/react';

const Header = ({ animal }) => {
    function handleCancel() {
        router.visit(route('animales.index'));
    }
    return (
        <div className="mb-5 flex items-center gap-3 border-b border-outline-variant pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
                <span className="material-symbols-outlined text-[20px] text-on-primary">
                    {animal ? 'edit' : 'add_circle'}
                </span>
            </div>
            <div className="flex-1">
                <h2 className="text-base font-semibold text-on-surface">
                    {animal ? 'Editar animal' : 'Registrar animal'}
                </h2>
                <p className="text-xs text-on-surface-variant">
                    {animal
                        ? 'Actualiza la información del animal en el sistema.'
                        : 'Completa los datos para añadir un nuevo animal al hato.'}
                </p>
            </div>
            <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container active:scale-95"
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
