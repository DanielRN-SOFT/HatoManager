import { useEffect, useState } from 'react';

const DURATION = 4000;

const ToastEcommerce = ({ toast, onDismiss }) => {
    const [progress, setProgress] = useState(100);
    const isError = toast.type === 'error';

    useEffect(() => {
        const start = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            setProgress(Math.max(0, 100 - (elapsed / DURATION) * 100));
        }, 16);
        const timeout = setTimeout(() => onDismiss(), DURATION);
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [toast]);

    return (
        <div
            className={`z-60 fixed bottom-6 right-6 flex min-w-[280px] max-w-sm flex-col overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 ${
                isError
                    ? 'border-error/20 bg-error text-white'
                    : 'border-primary/20 bg-primary text-white'
            }`}
        >
            <div className="flex items-center gap-3 px-4 py-3">
                <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${
                        isError ? 'bg-white/15' : 'bg-white/15'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">
                        {isError ? 'error' : 'check_circle'}
                    </span>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest opacity-70">
                        {isError ? 'Error' : 'Éxito'}
                    </p>
                    <p className="truncate text-sm font-medium leading-snug">
                        {toast.message}
                    </p>
                </div>
                <button
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg opacity-60 transition-opacity hover:opacity-90"
                    onClick={onDismiss}
                >
                    <span className="material-symbols-outlined text-[16px]">
                        close
                    </span>
                </button>
            </div>
            <div className="h-0.5 w-full bg-white/20">
                <div
                    className="h-full bg-white transition-none"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ToastEcommerce;
