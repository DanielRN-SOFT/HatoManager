const InputFile = ({handlePhoto}) => {
  return (
      <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-low px-5 py-4 transition-all duration-200 hover:border-primary hover:bg-surface-container">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-container">
              <span className="material-symbols-outlined text-[24px] text-on-surface-variant/40">
                  add_photo_alternate
              </span>
          </div>
          <div>
              <p className="text-sm font-medium text-on-surface">
                  Subir foto del animal
              </p>
              <p className="text-xs text-on-surface-variant">
                  PNG, JPG o WEBP · Máx. 5MB
              </p>
          </div>
          <input
              type="file"
              accept="image/*"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={handlePhoto}
          />
      </label>
  );
}

export default InputFile
