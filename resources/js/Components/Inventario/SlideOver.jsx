import { useEffect } from 'react';
const SlideOver = ({ open, onClose, title, children }) => {
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [!open]);
    return (
        <div className="fixed inset-0 z-40 flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-outline-variant px-5 py-4">
                    <h2 className="text-sm font-semibold text-on-surface">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-on-surface-variant hover:bg-surface-container"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            close
                        </span>
                    </button>
                </div>

                {/* Contenido scrolleable */}
                <div className="flex-1 overflow-y-auto px-5 py-5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SlideOver;
