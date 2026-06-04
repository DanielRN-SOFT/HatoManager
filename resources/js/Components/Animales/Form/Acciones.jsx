const Acciones = ({ handleCancel, processing, animal }) => {
    return (
        <div className="flex items-center justify-end gap-3 rounded-xl px-5 py-4">
            <button
                type="submit"
                disabled={processing}
                className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95 disabled:opacity-60"
            >
                {processing ? (
                    <>
                        <span className="material-symbols-outlined animate-spin text-[18px]">
                            progress_activity
                        </span>
                        Guardando...
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined text-[18px]">
                            {animal ? 'save' : 'add_circle'}
                        </span>
                        {animal ? 'Guardar cambios' : 'Registrar animal'}
                    </>
                )}
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 active:scale-95"
            >
                <span className="material-symbols-outlined text-[16px]">
                    close
                </span>
                Cancelar
            </button>
        </div>
    );
};

export default Acciones;
