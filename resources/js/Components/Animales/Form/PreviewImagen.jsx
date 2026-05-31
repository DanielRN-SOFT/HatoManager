const PreviewImagen = ({ preview, data, setPreview, handlePhoto }) => {

    function handleRemovePhoto() {
        setData('photo', '');
        setPreview(null);
    }

    return (
        <div className="flex items-center gap-4 rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-3">
            <img
                src={preview}
                alt="Preview"
                className="h-16 w-16 rounded-xl object-cover shadow-sm"
            />
            <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-medium text-on-surface">
                    {data.photo?.name ?? 'Foto actual'}
                </span>
                <span className="text-xs text-on-surface-variant">
                    {data.photo?.size
                        ? `${(data.photo.size / 1024).toFixed(1)} KB`
                        : 'Imagen guardada'}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <label className="flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/10">
                    <span className="material-symbols-outlined text-[16px]">
                        swap_horiz
                    </span>
                    Cambiar
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhoto}
                    />
                </label>
                <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-error transition-all hover:bg-error-container/40"
                >
                    <span className="material-symbols-outlined text-[16px]">
                        delete
                    </span>
                    Quitar
                </button>
            </div>
        </div>
    );
};

export default PreviewImagen;
