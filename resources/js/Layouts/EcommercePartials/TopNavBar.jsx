import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navLinks = [
    { href: '/sales', label: 'Ventas' },
    { href: '/subastas', label: 'Subastas' },
];

export default function TopNavBar() {
    const { url, props } = usePage();
    const cartCount = props.cart_count ?? 0;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header
                className="fixed top-0 z-50 w-full border-b border-outline-variant"
                style={{
                    background: 'rgba(250,250,245,0.85)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
                    {/* Left: Brand + Nav links */}
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="shrink-0 text-xl font-bold text-primary no-underline"
                        >
                            HatoManager
                        </Link>

                        {/* Desktop nav links */}
                        <ul className="m-0 flex list-none items-center gap-1 p-0 max-md:hidden">
                            {navLinks.map(({ href, label }) => {
                                const isActive = url.startsWith(href);
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={
                                                'flex h-16 items-center px-3 text-sm font-medium no-underline transition-colors ' +
                                                (isActive
                                                    ? 'border-b-2 border-primary text-primary'
                                                    : 'text-on-surface-variant hover:text-primary')
                                            }
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Right: Auth actions (desktop) + Hamburger (mobile) */}
                    <div className="flex shrink-0 items-center gap-3">
                        {/* Icono carrito — desktop */}
                        <button
                            onClick={() => router.visit(route('cart.index'))}
                            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
                            aria-label="Ver carrito"
                        >
                            <span className="material-symbols-outlined text-[22px]">
                                shopping_cart
                            </span>
                            {cartCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <div className="flex items-center gap-3 max-md:hidden">
                            <Link
                                href="/login"
                                className="cursor-pointer border-none bg-transparent px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-on-primary no-underline transition-all hover:bg-primary-container"
                            >
                                Registrarse
                            </Link>
                        </div>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container md:hidden"
                            aria-label="Abrir menú"
                        >
                            <span className="material-symbols-outlined">
                                {menuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </nav>

                {/* Mobile dropdown */}
                {menuOpen && (
                    <div className="border-t border-outline-variant bg-surface px-6 py-4 md:hidden">
                        <ul className="m-0 flex list-none flex-col gap-1 p-0">
                            {navLinks.map(({ href, label }) => {
                                const isActive = url.startsWith(href);
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() => setMenuOpen(false)}
                                            className={
                                                'flex items-center rounded-lg px-3 py-3 text-sm font-medium no-underline transition-colors ' +
                                                (isActive
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary')
                                            }
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        {/* Icono carrito — mobile */}
                        <button
                            onClick={() => {
                                router.visit(route('cart.index'));
                                setMenuOpen(false);
                            }}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                shopping_cart
                            </span>
                            Carrito
                            {cartCount > 0 && (
                                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        {/* Auth actions en mobile */}
                        <div className="mt-4 flex flex-col gap-2 border-t border-outline-variant pt-4">
                            <Link
                                href={route('login')}
                                className="w-full cursor-pointer rounded-lg border border-outline-variant bg-transparent px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href={route('register')}
                                onClick={() => setMenuOpen(false)}
                                className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-on-primary no-underline transition-all hover:bg-primary-container"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
