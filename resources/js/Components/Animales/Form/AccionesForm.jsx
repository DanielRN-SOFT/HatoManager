const AccionesForm = ({onCancel, processing, animal}) => {
    return (
        <div className="flex justify-end gap-3 border-t border-outline-variant pt-6">
            <button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-2 rounded-xl border border-outline-variant px-6 py-2.5 text-sm font-medium text-on-surface transition-all duration-200 hover:bg-surface-container active:scale-95"
            >
                <span className="material-symbols-outlined text-[18px]">
                    close
                </span>
                Cancelar
            </button>
            <button
                type="submit"
                disabled={processing}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50"
            >
                {processing ? (
                    <>
                        <span className="material-symbols-outlined animate-spin text-[18px]">
                            progress_activity
                        </span>
                        Guardando…
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
        </div>
    );
};

export default AccionesForm;
