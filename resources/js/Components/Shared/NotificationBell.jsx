import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function NotificationBell() {
    const { notifications } = usePage().props;
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const unread = notifications?.unread_count ?? 0;
    const items = notifications?.items ?? [];

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function markAsRead(id) {
        axios
            .post(route('notifications.read', id))
            .then(() => router.reload({ only: ['notifications'] }));
    }

    function markAllAsRead() {
        axios.post(route('notifications.readAll')).then(() => {
            router.reload({ only: ['notifications'] });
            setOpen(false);
        });
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="relative rounded-full p-2 text-on-surface-variant transition-colors duration-150 hover:bg-surface-container"
            >
                <span className="material-symbols-outlined">notifications</span>
                {unread > 0 && (
                    <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-surface bg-error text-[9px] font-bold text-white">
                        {unread > 9 ? '9+' : unread}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 mt-1 w-80 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
                        <p className="text-sm font-semibold text-on-surface">
                            Notificaciones
                            {unread > 0 && (
                                <span className="ml-2 rounded-full bg-error px-1.5 py-0.5 text-[10px] font-bold text-white">
                                    {unread}
                                </span>
                            )}
                        </p>
                        {unread > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-primary hover:underline"
                            >
                                Marcar todas
                            </button>
                        )}
                    </div>

                    {/* Items */}
                    <div className="max-h-80 overflow-y-auto">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center gap-2 py-8 text-on-surface-variant">
                                <span className="material-symbols-outlined text-4xl">
                                    notifications_off
                                </span>
                                <p className="text-xs">
                                    Sin notificaciones pendientes
                                </p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex cursor-pointer items-start gap-3 border-b border-outline-variant/50 px-4 py-3 transition-colors hover:bg-surface-container"
                                    onClick={() => markAsRead(item.id)}
                                >
                                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-orange-500">
                                        notifications_active
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm leading-snug text-on-surface">
                                            {item.mensaje}
                                        </p>
                                        <p className="mt-1 text-xs text-on-surface-variant">
                                            {item.created_at}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-outline-variant p-2">
                        <button
                            onClick={() => {
                                router.visit(route('health.index'));
                                setOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                vaccines
                            </span>
                            Ver sanidad animal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
