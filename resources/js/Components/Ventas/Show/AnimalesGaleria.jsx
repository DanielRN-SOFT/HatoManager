import { useState } from 'react';
const STATUS_STYLES = {
    Publicado: 'bg-emerald-600 text-white',
    Reservado: 'bg-amber-500 text-white',
};
const AnimalesGaleria = ({ photos, animal }) => {
    const [activePhoto, setActivePhoto] = useState(0);
    return (
        <div className="space-y-3">
            {/* Imagen principal */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface-container shadow-sm">
                {photos.length > 0 ? (
                    <img
                        src={photos[activePhoto]}
                        alt={animal.name}
                        className="h-full w-full object-cover transition-opacity duration-300"
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-7xl opacity-30">
                            photo_camera
                        </span>
                        <p className="text-sm opacity-50">Sin fotografías</p>
                    </div>
                )}
                {/* Badge estado */}
                <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold tracking-wide shadow-md backdrop-blur-sm ${
                        STATUS_STYLES[animal.status] ??
                        'bg-surface/80 text-on-surface'
                    }`}
                >
                    {animal.status}
                </span>
                {/* Contador fotos */}
                {photos.length > 1 && (
                    <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        <span className="material-symbols-outlined text-sm">
                            photo_library
                        </span>
                        {activePhoto + 1} / {photos.length}
                    </span>
                )}
            </div>
            {/* Miniaturas */}
            {photos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {photos.map((photo, i) => (
                        <button
                            key={i}
                            onClick={() => setActivePhoto(i)}
                            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                                i === activePhoto
                                    ? 'border-primary shadow-md ring-2 ring-primary/20'
                                    : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                        >
                            <img
                                src={photo}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
export default AnimalesGaleria;
