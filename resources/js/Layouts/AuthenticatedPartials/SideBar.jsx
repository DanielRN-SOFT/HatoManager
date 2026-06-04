// resources/js/Layouts/AuthenticatedPartials/SideBar.jsx
import { Link, usePage } from '@inertiajs/react';
import { GiFarmTractor } from 'react-icons/gi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { PiCowFill } from 'react-icons/pi';
import { SiSwisscows } from 'react-icons/si';

const SideBar = ({ open, onClose, collapsed, onToggleCollapse }) => {
    const { auth } = usePage().props;
    const role = auth.user?.roles?.[0]?.name ?? null;

    // Ítems base (disponibles para todos los roles autenticados)
    const NAV_ITEMS = [
        {
            label: 'Dashboard',
            icon: <MdOutlineDashboardCustomize />,
            route: 'dashboard',
        },
        {
            label: 'Animales',
            icon: <SiSwisscows />,
            route: 'animals.index',
        },
        { label: 'Sanidad', icon: 'health_and_safety', route: 'health.index' },
        { label: 'Pesajes', icon: 'balance', route: 'weight-records.index' },
        { label: 'Ventas', icon: 'sell', route: 'login' },
        { label: 'Subastas', icon: 'gavel', route: 'login' },
        // Solo visible para ganaderos
        ...(role === 'ganadero'
            ? [
                  {
                      label: 'Mis Fincas',
                      icon: <GiFarmTractor />,
                      route: 'farms.index',
                  },
                  {
                      label: 'Mis Veterinarios',
                      icon: 'medical_services',
                      route: 'veterinarians.index',
                  },
              ]
            : []),
    ];

    const NAV_BOTTOM = [
        { label: 'Configuración', icon: 'settings', route: 'login' },
    ];

    return (
        <>
            {/* Overlay móvil */}
            <div
                onClick={onClose}
                className={[
                    'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden',
                    'transition-opacity duration-300',
                    open
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0',
                ].join(' ')}
            />

            {/* Panel lateral */}
            <aside
                className={[
                    'fixed left-0 top-0 z-50 flex h-screen flex-col',
                    'border-r border-outline-variant bg-primary dark:bg-primary-container',
                    'gap-2 p-4 shadow-sm',
                    'transition-all duration-300 ease-in-out',
                    collapsed ? 'w-[72px]' : 'w-[220px]',
                    'lg:translate-x-0',
                    open
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0',
                ].join(' ')}
            >
                {/* Header / Logo */}
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-on-primary/10">
                        <PiCowFill className="text-[22px] text-on-primary" />
                    </div>
                    <div
                        className={[
                            'overflow-hidden transition-all duration-300',
                            collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
                        ].join(' ')}
                    >
                        <h1 className="whitespace-nowrap font-bold leading-none text-on-primary">
                            HatoManager
                        </h1>
                        <p className="whitespace-nowrap text-[10px] tracking-wider text-on-primary/60">
                            AGRO-PROFESSIONAL
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto overflow-x-hidden">
                    {NAV_ITEMS.map((item) => (
                        <SidebarNavItem
                            key={item.route + item.label}
                            item={item}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>

                {/* Bottom nav */}
                <div className="shrink-0 space-y-1 border-t border-outline-variant pt-3">
                    {NAV_BOTTOM.map((item) => (
                        <SidebarNavItem
                            key={item.route + item.label}
                            item={item}
                            collapsed={collapsed}
                        />
                    ))}

                    {/* Botón colapsar — solo desktop */}
                    <button
                        onClick={onToggleCollapse}
                        className="group hidden w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-on-primary/80 transition-colors duration-200 hover:bg-primary-fixed-dim/20 hover:text-on-primary lg:flex"
                    >
                        <span
                            className={[
                                'material-symbols-outlined shrink-0 text-[22px] transition-transform duration-300',
                                collapsed ? 'rotate-180' : '',
                            ].join(' ')}
                        >
                            chevron_left
                        </span>
                        <span
                            className={[
                                'overflow-hidden whitespace-nowrap transition-all duration-300',
                                collapsed
                                    ? 'w-0 opacity-0'
                                    : 'w-auto opacity-100',
                            ].join(' ')}
                        >
                            Colapsar menú
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

const SidebarNavItem = ({ item, collapsed }) => {
    const isActive = route().current(item.route);

    return (
        <Link
            href={route(item.route)}
            className={[
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                'group relative transition-colors duration-200',
                'active:scale-95',
                isActive
                    ? 'bg-secondary-container font-semibold text-on-secondary-container'
                    : 'text-on-primary/80 hover:bg-primary-fixed-dim/20 hover:text-on-primary',
                collapsed ? 'justify-center pl-6' : '',
            ].join(' ')}
        >
            <span className="material-symbols-outlined shrink-0 text-[22px]">
                {item.icon}
            </span>

            <span
                className={[
                    'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
                    collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
                ].join(' ')}
            >
                {item.label}
            </span>

            {/* Tooltip cuando está colapsado */}
            {collapsed && (
                <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg bg-on-surface px-2.5 py-1 text-xs text-surface opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    {item.label}
                </span>
            )}
        </Link>
    );
};

export default SideBar;
