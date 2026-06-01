import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (flash?.success || flash?.error || flash?.info) {
            setVisible(true);
            setProgress(100);
            const start = Date.now();
            const duration = 5000;
            const tick = setInterval(() => {
                const elapsed = Date.now() - start;
                setProgress(Math.max(0, 100 - (elapsed / duration) * 100));
            }, 50);
            const t = setTimeout(() => {
                setVisible(false);
                clearInterval(tick);
            }, duration);
            return () => {
                clearTimeout(t);
                clearInterval(tick);
            };
        }
    }, [flash]);

    if (!visible || (!flash?.success && !flash?.error && !flash?.info))
        return null;

    const isSuccess = !!flash.success;
    const isInfo = !!flash.info;

    const config = isSuccess
        ? {
              icon: 'check_circle',
              bar: 'bg-primary',
              bg: 'bg-primary-container/10',
              border: 'border-primary/20',
              text: 'text-on-surface',
              accent: 'text-primary',
          }
        : isInfo
          ? {
                icon: 'info',
                bar: 'bg-tertiary',
                bg: 'bg-tertiary-container/30',
                border: 'border-tertiary/20',
                text: 'text-on-surface',
                accent: 'text-tertiary',
            }
          : {
                icon: 'error',
                bar: 'bg-error',
                bg: 'bg-error-container/40',
                border: 'border-error/20',
                text: 'text-on-surface',
                accent: 'text-error',
            };

    return (
        <div
            className={`mb-6 overflow-hidden rounded-2xl border shadow-sm ${config.bg} ${config.border}`}
        >
            <div className="flex items-start gap-3 px-4 py-3.5">
                <span
                    className={`material-symbols-outlined mt-0.5 shrink-0 text-[20px] ${config.accent}`}
                >
                    {config.icon}
                </span>
                <p className={`flex-1 text-sm font-medium ${config.text}`}>
                    {flash.success ?? flash.info ?? flash.error}
                </p>
                <button
                    onClick={() => setVisible(false)}
                    className={`shrink-0 rounded-lg p-0.5 transition-colors hover:bg-black/5 ${config.accent}`}
                >
                    <span className="material-symbols-outlined text-[18px]">
                        close
                    </span>
                </button>
            </div>
            <div className="h-0.5 w-full bg-black/5">
                <div
                    className={`h-full transition-none ${config.bar}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
