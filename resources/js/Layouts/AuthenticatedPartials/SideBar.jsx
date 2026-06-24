import { useRole } from '@/hooks/useRole';
import { Link } from '@inertiajs/react';
import { FaScaleBalanced } from 'react-icons/fa6';
import { GiAnimalHide, GiGrass } from 'react-icons/gi';
import { GoShieldLock } from 'react-icons/go';
import { GrSteps } from 'react-icons/gr';
import { IoLockOpenOutline } from 'react-icons/io5';
import { LuUserRound, LuWeight } from 'react-icons/lu';
import {
    MdAgriculture,
    MdLocationPin,
    MdOutlineDashboardCustomize,
    MdOutlineHealthAndSafety,
    MdOutlineMedicalServices,
    MdOutlineSell,
} from 'react-icons/md';
import { PiCow, PiCowFill } from 'react-icons/pi';
import { SiSwisscows } from 'react-icons/si';

const NAV_ITEMS = [
    {
        label: 'Dashboard',
        icon: <MdOutlineDashboardCustomize />,
        route: 'dashboard',
        permission: 'gestionar dashboard',
    },
    {
        label: 'Usuarios',
        icon: <LuUserRound />,
        route: 'users.index',
        permission: 'gestionar usuarios',
    },
    {
        label: 'Roles',
        icon: <GoShieldLock />,
        route: 'roles.index',
        permission: 'gestionar roles',
    },
    {
        label: 'Permisos',
        icon: <IoLockOpenOutline />,
        route: 'permissions.index',
        permission: 'gestionar permisos',
    },

    {
        label: 'Metodos de Pesaje',
        icon: <LuWeight />,
        route: 'weight-methods.index',
        permission: 'gestionar metodos de pesajes',
    },
    {
        label: 'Razas',
        icon: <GiAnimalHide />,
        route: 'breeds.index',
        permission: 'gestionar razas',
    },
    {
        label: 'Categorias',
        icon: <PiCow />,
        route: 'animal-categories.index',
        permission: 'gestionar categorias de animales',
    },
    {
        label: 'Tipos de pasto',
        icon: <GiGrass />,
        route: 'type-grasses.index',
        permission: 'gestionar categorias de animales',
    },
    {
        label: 'Etapas productivas',
        icon: <GrSteps />,
        route: 'productive-stages.index',
        permission: 'gestionar etapas productivas',
    },
    {
        label: 'Animales',
        icon: <SiSwisscows />,
        route: 'animals.index',
        permission: 'gestionar animales',
    },
    {
        label: 'Lotes',
        icon: <MdLocationPin />,
        route: 'paddocks.index',
        permission: 'gestionar lotes',
    },
    {
        label: 'Sanidad',
        icon: <MdOutlineHealthAndSafety />,
        route: 'health.index',
        permission: 'gestionar sanidad',
    },
    {
        label: 'Pesajes',
        icon: <FaScaleBalanced />,
        route: 'weight-records.index',
        permission: 'gestionar pesos',
    },
    {
        label: 'Ventas',
        icon: <MdOutlineSell />,
        route: 'sales.index',
        permission: 'gestionar ventas',
    },
    {
        label: 'Mis Fincas',
        icon: <MdAgriculture />,
        route: 'farms.index',
        permission: 'gestionar fincas',
    },
    {
        label: 'Mis Veterinarios',
        icon: <MdOutlineMedicalServices />,
        route: 'veterinarians.index',
        permission: 'gestionar veterinarios',
    },
];

const SideBar = ({ open, onClose, collapsed, onToggleCollapse }) => {
    const { can } = useRole();

    const visibleItems = NAV_ITEMS.filter(
        (item) => !item.permission || can(item.permission),
    );

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
                    {visibleItems.map((item) => (
                        <SidebarNavItem
                            key={item.route + item.label}
                            item={item}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>

                {/* Bottom nav */}
                <div className="shrink-0 space-y-1 border-t border-outline-variant pt-3">
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
