import { useState } from 'react';

const AnimalesGaleria = ({ photos, animal }) => {
    const STATUS_STYLES = {
        Publicado: 'bg-primary text-on-primary',
        Reservado: 'bg-amber-500 text-white',
    };
    const [activePhoto, setActivePhoto] = useState(0);
    return (
        <>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-container">
                {photos.length > 0 ? (
                    <img
                        src={photos[activePhoto]}
                        alt={animal.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-6xl">
                            image_not_supported
                        </span>
                    </div>
                )}

                <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                        STATUS_STYLES[animal.status] ||
                        'bg-surface text-on-surface'
                    }`}
                >
                    {animal.status}
                </span>

                {photos.length > 1 && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-semibold text-on-surface backdrop-blur">
                        {activePhoto + 1} / {photos.length}
                    </span>
                )}
            </div>

            {photos.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                    {photos.map((photo, i) => (
                        <button
                            key={i}
                            onClick={() => setActivePhoto(i)}
                            className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                                i === activePhoto
                                    ? 'border-primary'
                                    : 'border-transparent'
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
        </>
    );
};

export default AnimalesGaleria;
