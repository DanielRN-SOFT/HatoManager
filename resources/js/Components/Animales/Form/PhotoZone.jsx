const PhotoZone = ({ preview, onPhoto, onClear }) => {
    
    return(
    <div className="flex flex-col items-center gap-4">
        {/* Preview / Placeholder */}
        <div className="relative">
            {preview ? (
                <>
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-44 w-44 rounded-2xl object-cover shadow-md ring-2 ring-primary/20"
                    />
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600 active:scale-90"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            close
                        </span>
                    </button>
                </>
            ) : (
                <div className="flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-300">
                    <span className="material-symbols-outlined text-5xl">
                        photo_camera
                    </span>
                    <span className="text-[10px] tracking-wide">Sin foto</span>
                </div>
            )}
        </div>

        {/* Upload button */}
        <div className="text-center">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-primary hover:text-primary active:scale-95">
                <span className="material-symbols-outlined text-[15px]">
                    upload
                </span>
                {preview ? 'Cambiar foto' : 'Seleccionar foto'}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onPhoto}
                />
            </label>
            <p className="mt-1.5 text-[10px] text-gray-400">
                JPG, PNG o WebP · Máx 2 MB
            </p>
        </div>
    </div>
)
}

export default PhotoZone;
