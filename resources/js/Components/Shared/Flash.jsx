import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error || flash?.info) {
            setLeaving(false);
            setVisible(true);
            setProgress(100);
            const start = Date.now();
            const duration = 5000;
            const tick = setInterval(() => {
                const elapsed = Date.now() - start;
                setProgress(Math.max(0, 100 - (elapsed / duration) * 100));
            }, 50);
            const t = setTimeout(() => {
                setLeaving(true);
                setTimeout(() => {
                    setVisible(false);
                    setLeaving(false);
                }, 400);
                clearInterval(tick);
            }, duration);
            return () => {
                clearTimeout(t);
                clearInterval(tick);
            };
        }
    }, [flash]);

    const handleClose = () => {
        setLeaving(true);
        setTimeout(() => {
            setVisible(false);
            setLeaving(false);
        }, 400);
    };

    if (!visible || (!flash?.success && !flash?.error && !flash?.info))
        return null;

    const isSuccess = !!flash.success;
    const isInfo = !!flash.info;

    const config = isSuccess
        ? {
              icon: 'check_circle',
              bar: 'bg-primary',
              glow: 'shadow-primary/20',
              iconColor: 'text-primary',
              dot: 'bg-primary',
          }
        : isInfo
          ? {
                icon: 'info',
                bar: 'bg-tertiary',
                glow: 'shadow-tertiary/20',
                iconColor: 'text-tertiary',
                dot: 'bg-tertiary',
            }
          : {
                icon: 'error',
                bar: 'bg-error',
                glow: 'shadow-error/20',
                iconColor: 'text-error',
                dot: 'bg-error',
            };

    return (
        <div className="pointer-events-none fixed bottom-6 right-6 z-50">
            <div
                className={`pointer-events-auto relative w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-secondary-fixed-dim shadow-2xl backdrop-blur-xl ${config.glow} duration-400 transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    leaving
                        ? 'translate-y-3 scale-95 opacity-0'
                        : 'translate-y-0 scale-100 opacity-100'
                } `}
                style={{
                    animation: leaving
                        ? undefined
                        : 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
                }}
            >
                {/* Top progress bar */}
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-white/5">
                    <div
                        className={`h-full ${config.bar} transition-none`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-center gap-3 px-4 pb-3.5 pt-4">
                    {/* Icon with pulse dot */}
                    <div className="relative shrink-0">
                        <span
                            className={`material-symbols-outlined text-[22px] ${config.iconColor}`}
                        >
                            {config.icon}
                        </span>
                        <span
                            className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ${config.dot} ring-2 ring-surface`}
                        />
                    </div>

                    {/* Message */}
                    <p className="flex-1 text-sm font-medium leading-snug text-on-surface">
                        {flash.success ?? flash.info ?? flash.error}
                    </p>

                    {/* Close */}
                    <button
                        onClick={handleClose}
                        className="hover:bg-white/8 shrink-0 rounded-lg p-1 text-on-surface-variant/50 transition-colors hover:text-on-surface"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            close
                        </span>
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(16px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
