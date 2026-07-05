import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import {
    MdOutlineLocalGroceryStore,
    MdOutlineManageAccounts,
    MdOutlineSettings,
} from 'react-icons/md';

const getInitials = (name = '') => {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');
};

const UserDropdown = ({ user }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="group flex items-center gap-2.5 rounded-lg border-l border-outline-variant px-2 py-1.5 pl-4 transition-colors duration-150 hover:bg-surface-container"
            >
                <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold leading-none text-on-surface">
                        {user.name}
                    </p>
                    <p className="mt-0.5 text-xs text-on-surface-variant">
                        {user.email}
                    </p>
                </div>

                <div
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary ring-2 ring-transparent transition-all group-hover:opacity-90"
                    aria-hidden="true"
                >
                    {getInitials(user.name)}
                </div>

                <span
                    className={[
                        'material-symbols-outlined text-[18px] text-on-surface-variant',
                        'transition-transform duration-300',
                        open ? 'rotate-180' : '',
                    ].join(' ')}
                >
                    expand_more
                </span>
            </button>

            {/* Dropdown panel — scale + fade */}
            <div
                className={[
                    'absolute right-0 top-full z-50 mt-2 w-52',
                    'overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-xl',
                    'origin-top-right transition-all duration-200 ease-out',
                    open
                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                        : 'pointer-events-none -translate-y-2 scale-95 opacity-0',
                ].join(' ')}
            >
                {/* User info header */}
                <div className="border-b border-outline-variant bg-surface-container-low px-4 py-3">
                    <p className="text-sm font-bold text-on-surface">
                        {user.name}
                    </p>
                    <p className="truncate text-xs text-on-surface-variant">
                        {user.email}
                    </p>
                </div>

                {/* Menu items */}
                <div className="space-y-0.5 p-1.5">
                    {[
                        {
                            label: 'Mi perfil',
                            icon: <MdOutlineManageAccounts />,
                            href: route('profile.edit'),
                        },
                        {
                            label: 'Configuración',
                            icon: <MdOutlineSettings />,
                            href: route('dashboard'),
                        },
                        {
                            label: 'Tienda en linea',
                            icon: <MdOutlineLocalGroceryStore />,
                            href: route('ecommerce.index'),
                        },
                    ].map(({ label, icon, href }) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface transition-colors duration-150 hover:bg-surface-container"
                        >
                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                                {icon}
                            </span>
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Logout */}
                <div className="border-t border-outline-variant p-1.5">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        onClick={() => setOpen(false)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-error transition-colors duration-150 hover:bg-error-container/40"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            logout
                        </span>
                        Cerrar sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDropdown;
