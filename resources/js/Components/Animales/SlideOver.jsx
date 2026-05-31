// SlideOver.jsx
import { useEffect, useState } from 'react';

const SlideOver = ({ open, onClose, title, children }) => {
    const [visible, setVisible] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        if (open) {
            setVisible(true);
            // Pequeño delay para que el DOM monte antes de aplicar la clase de entrada
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimateIn(true));
            });
            document.body.style.overflow = 'hidden';
        } else {
            setAnimateIn(false);
            // Espera que termine la animación (300ms) antes de desmontar
            const timer = setTimeout(() => {
                setVisible(false);
                document.body.style.overflow = '';
            }, 300);
            return () => clearTimeout(timer);
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Overlay con fade */}
            <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                    animateIn ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />
            {/* Panel con slide desde la derecha */}
            <div
                className={`relative z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-xl transition-transform duration-300 ease-in-out ${
                    animateIn ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
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
