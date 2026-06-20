import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const DURATION = 5000;

export default function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [progress, setProgress] = useState(100);

    const startRef = useRef(Date.now());
    const remainingRef = useRef(DURATION);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const clearTimers = () => {
        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);
    };

    const runTimers = (time) => {
        startRef.current = Date.now();
        remainingRef.current = time;

        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startRef.current;
            const remaining = Math.max(0, remainingRef.current - elapsed);
            setProgress((remaining / DURATION) * 100);
        }, 50);

        timeoutRef.current = setTimeout(handleClose, time);
    };

    const pauseTimers = () => {
        clearTimers();
        const elapsed = Date.now() - startRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    };

    const resumeTimers = () => {
        if (remainingRef.current <= 0) return;
        runTimers(remainingRef.current);
    };

    const handleClose = () => {
        clearTimers();
        setLeaving(true);
        setTimeout(() => {
            setVisible(false);
            setLeaving(false);
        }, 350);
    };

    useEffect(() => {
        if (flash?.success || flash?.error || flash?.info) {
            setLeaving(false);
            setVisible(true);
            setProgress(100);
            runTimers(DURATION);
            return clearTimers;
        }
    }, [flash]);

    if (!visible || (!flash?.success && !flash?.error && !flash?.info))
        return null;

    const isSuccess = !!flash.success;
    const isInfo = !!flash.info;

    const config = isSuccess
        ? {
              icon: 'check_circle',
              accent: 'text-primary',
              bar: 'bg-primary',
              chip: 'bg-primary/10',
              ring: 'ring-primary/20',
              glow: 'shadow-primary/15',
          }
        : isInfo
          ? {
                icon: 'info',
                accent: 'text-tertiary',
                bar: 'bg-tertiary',
                chip: 'bg-tertiary/10',
                ring: 'ring-tertiary/20',
                glow: 'shadow-tertiary/15',
            }
          : {
                icon: 'error',
                accent: 'text-error',
                bar: 'bg-error',
                chip: 'bg-error/10',
                ring: 'ring-error/20',
                glow: 'shadow-error/15',
            };

    return (
        <div className="pointer-events-none fixed bottom-6 right-6 z-50">
            <div
                role="status"
                onMouseEnter={pauseTimers}
                onMouseLeave={resumeTimers}
                className={`group pointer-events-auto relative w-[360px] overflow-hidden rounded-[20px] border border-black/[0.06] bg-white/95 shadow-lg backdrop-blur-2xl ${config.glow} duration-350 transition-all ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    leaving
                        ? 'translate-y-2 scale-[0.97] opacity-0 blur-[2px]'
                        : 'translate-y-0 scale-100 opacity-100 blur-0'
                }`}
                style={{
                    animation: leaving
                        ? undefined
                        : 'toast-in 0.45s cubic-bezier(0.22,1,0.36,1) forwards',
                }}
            >
                {/* Progress rail */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-black/[0.05]">
                    <div
                        className={`h-full rounded-r-full ${config.bar} transition-[width] duration-75 ease-linear`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-start gap-3 px-4 py-4">
                    {/* Icon chip */}
                    <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${config.chip} ${config.ring}`}
                    >
                        <span
                            className={`material-symbols-outlined text-[19px] ${config.accent}`}
                        >
                            {config.icon}
                        </span>
                    </div>

                    {/* Message */}
                    <p className="flex-1 pt-1.5 text-[13.5px] font-medium leading-snug tracking-[-0.01em] text-gray-800">
                        {flash.success ?? flash.info ?? flash.error}
                    </p>

                    {/* Close */}
                    <button
                        onClick={handleClose}
                        aria-label="Cerrar"
                        className="shrink-0 rounded-lg p-1.5 text-gray-400 opacity-0 transition-all duration-200 hover:bg-black/[0.05] hover:text-gray-700 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 group-hover:opacity-100"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            close
                        </span>
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes toast-in {
                    from {
                        opacity: 0;
                        transform: translateY(18px) scale(0.96);
                        filter: blur(3px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    @keyframes toast-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                }
            `}</style>
        </div>
    );
}
