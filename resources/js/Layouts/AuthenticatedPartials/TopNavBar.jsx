import AnimalSearch from '@/Components/Shared/AnimalSearch';
import NotificationBell from '@/Components/Shared/NotificationBell';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { GiFarmTractor } from 'react-icons/gi';
import UserDropdown from './UserDropDown';

/* ══════════════════════════════════════════════════════════════
 |  FarmSelector — dropdown para cambiar finca activa
 ╚═════════════════════════════════════════════════════════════ */
function FarmSelector() {
    const { auth, activeFarm } = usePage().props;
    const [open, setOpen] = useState(false);
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);

    const role = auth.user?.roles?.[0]?.name ?? null;
    const canSelect = role === 'ganadero' || role === 'veterinario';

    // Cerrar al hacer clic fuera
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

    // Cargar fincas del usuario al abrir
    async function handleOpen() {
        if (open) {
            setOpen(false);
            return;
        }
        setOpen(true);
        setLoading(true);
        try {
            const res = await fetch(route('farms.list'), {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });
            const data = await res.json();
            setFarms(data);
        } catch {
            setFarms([]);
        } finally {
            setLoading(false);
        }
    }

    function selectFarm(farm) {
        setOpen(false);
        router.post(
            route('farms.setActive', farm.id),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    }

    if (!canSelect) return null;

    return (
        <div ref={ref} className="relative hidden lg:block">
            <button
                onClick={handleOpen}
                className="group flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:bg-surface-container"
            >
                <span className="text-[30px] text-primary">
                    <GiFarmTractor />
                </span>
                <h2 className="max-w-[180px] truncate text-base font-semibold text-on-surface">
                    {activeFarm ? activeFarm.name : 'Seleccionar finca'}
                </h2>
                <span
                    className={[
                        'material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200',
                        open ? 'rotate-180' : '',
                    ].join(' ')}
                >
                    expand_more
                </span>
            </button>

            {open && (
                <div className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-lg">
                    <p className="px-3 pt-3 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant/60">
                        Mis Fincas
                    </p>

                    {loading && (
                        <div className="flex items-center justify-center py-6">
                            <span className="material-symbols-outlined animate-spin text-[20px] text-on-surface-variant">
                                progress_activity
                            </span>
                        </div>
                    )}

                    {!loading && farms.length === 0 && (
                        <p className="px-3 py-4 text-xs text-on-surface-variant">
                            No tienes fincas activas.
                        </p>
                    )}
                    <div className="max-h-60 overflow-y-auto">
                        {!loading &&
                            farms.map((farm) => (
                                <button
                                    key={farm.id}
                                    onClick={() => selectFarm(farm)}
                                    className={[
                                        'flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-container',
                                        activeFarm?.id === farm.id
                                            ? 'text-primary'
                                            : 'text-on-surface',
                                    ].join(' ')}
                                >
                                    <span className="material-symbols-outlined shrink-0 text-[18px]">
                                        {activeFarm?.id === farm.id
                                            ? 'radio_button_checked'
                                            : 'radio_button_unchecked'}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">
                                            {farm.name}
                                        </p>
                                        <p className="truncate text-xs text-on-surface-variant">
                                            {farm.city}, {farm.department}
                                        </p>
                                    </div>
                                </button>
                            ))}{' '}
                    </div>

                    <div className="border-t border-outline-variant p-2">
                        <button
                            onClick={() => router.visit(route('farms.index'))}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                settings
                            </span>
                            Administrar fincas
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
 |  TopNavBar
 ╚═════════════════════════════════════════════════════════════ */
const TopNavBar = ({ user, onMenuOpen, sidebarWidth }) => {
    return (
        <header
            className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-outline-variant bg-surface px-4 sm:px-6"
            style={{ paddingLeft: sidebarWidth }}
        >
            {/* Mobile hamburger */}
            <button
                onClick={onMenuOpen}
                className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container lg:hidden"
            >
                <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Farm selector */}
            <FarmSelector />

            {/* Search */}
            <AnimalSearch />

            {/* Right actions */}
            <div className="flex items-center gap-2">
                <NotificationBell />
                <UserDropdown user={user} />
            </div>
        </header>
    );
};

export default TopNavBar;
