import { Link } from '@inertiajs/react';

const SideBar = ({ open, onClose, collapsed, onToggleCollapse }) => {
    // ─────────────────────────────────────────────
    // NAV ITEMS —  arreglo para agregar/quitar rutas
    // ─────────────────────────────────────────────
    const NAV_ITEMS = [
        { label: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
        { label: 'Inventario', icon: 'inventory_2', route: 'login' },
        { label: 'Sanidad', icon: 'health_and_safety', route: 'login' },
        { label: 'Pesajes', icon: 'monitor_weight', route: 'login' },
        { label: 'Ventas', icon: 'sell', route: 'login' },
        { label: 'Subastas', icon: 'gavel', route: 'login' },
        {
            label: 'Mis Veterinarios',
            icon: 'medical_services',
            route: 'login',
        },
    ];

    const NAV_BOTTOM = [
        { label: 'Configuración', icon: 'settings', route: 'login' },
    ];

    return (
        <>
            {/* Overlay móvil — fade in/out */}
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
                    // Base
                    'fixed left-0 top-0 z-50 flex h-full flex-col',
                    'bg-primary shadow-2xl',
                    'transition-all duration-300 ease-in-out',
                    // Ancho — colapsado en desktop, normal en móvil
                    collapsed ? 'w-[72px]' : 'w-64',
                    // En móvil: translate para entrar/salir
                    'lg:translate-x-0',
                    open
                        ? 'translate-x-0'
                        : '-translate-x-full lg:translate-x-0',
                ].join(' ')}
            >
                {/* Header / Logo */}
                <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 py-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-fixed">
                        <span className="material-symbols-outlined fill-icon text-[20px] text-primary">
                            agriculture
                        </span>
                    </div>
                    <div
                        className={[
                            'overflow-hidden transition-all duration-300',
                            collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
                        ].join(' ')}
                    >
                        <h1 className="whitespace-nowrap text-sm font-bold leading-none text-on-primary">
                            HatoManager
                        </h1>
                        <p className="mt-0.5 whitespace-nowrap text-[9px] uppercase tracking-widest text-primary-fixed opacity-70">
                            Cattle Management
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="custom-scrollbar flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden px-2 py-4">
                    {NAV_ITEMS.map((item) => (
                        <SidebarNavItem
                            key={item.route}
                            item={item}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>

                {/* Bottom nav */}
                <div className="shrink-0 space-y-0.5 border-t border-white/10 px-2 py-3">
                    {NAV_BOTTOM.map((item) => (
                        <SidebarNavItem
                            key={item.route}
                            item={item}
                            collapsed={collapsed}
                        />
                    ))}

                    {/* Botón colapsar — solo desktop */}
                    <button
                        onClick={onToggleCollapse}
                        className="group hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-primary-fixed transition-all duration-200 hover:bg-white/10 lg:flex"
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
                                'overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300',
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

// ─────────────────────────────────────────────
// SidebarNavItem
// ─────────────────────────────────────────────
const SidebarNavItem = ({ item, collapsed }) => {
    const isActive = route().current(item.route);

    return (
        <Link
            href={route(item.route)}
            className={[
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
                'group relative transition-all duration-200 ease-out',
                'active:scale-95',
                isActive
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'text-primary-fixed hover:bg-white/10',
                collapsed ? 'justify-center' : '',
            ].join(' ')}
        >
            <span
                className={[
                    'material-symbols-outlined shrink-0 text-[22px] transition-transform duration-200',
                    'group-hover:scale-110',
                    isActive ? 'fill-icon' : '',
                ].join(' ')}
            >
                {item.icon}
            </span>

            {/* Label — se oculta con overflow+opacity cuando está colapsado */}
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
