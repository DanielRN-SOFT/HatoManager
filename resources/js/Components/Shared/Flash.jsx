import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error || flash?.info) {
            setVisible(true);
            const t = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(t);
        }
    }, [flash]);

    if (!visible || (!flash?.success && !flash?.error && !flash?.info))
        return null;

    const isSuccess = !!flash.success;
    const isInfo = !!flash.info;

    return (
        <div
            className={[
                'mb-6 flex items-start gap-3 rounded-xl border px-4 py-3',
                isSuccess
                    ? 'bg-primary/8 border-primary/30 text-primary'
                    : isInfo
                      ? 'bg-tertiary/8 border-tertiary/30 text-tertiary'
                      : 'bg-error/8 border-error/30 text-error',
            ].join(' ')}
        >
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px]">
                {isSuccess ? 'check_circle' : isInfo ? 'info' : 'error'}
            </span>
            <p className="text-sm font-medium">
                {flash.success ?? flash.info ?? flash.error}
            </p>
        </div>
    );
}
