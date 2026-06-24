import MobilePerfil from '@/Components/LayoutEcommerce/MobilePerfil';
import NavLinks from '@/Components/LayoutEcommerce/NavLinks';
import Perfil from '@/Components/LayoutEcommerce/Perfil';
import { useRole } from '@/hooks/useRole';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navLinks = [
    { href: '/about-us', label: 'Sobre nosotros' },
    { href: '/contact', label: 'Contacto' },
    { href: '/sales', label: 'Ventas' },
];

function getInitials(name) {
    if (!name) return '?';
    return name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join('');
}

export default function TopNavBar() {
    const { url, props } = usePage();
    const { isGanadero, isVeterinario } = useRole();
    console.log(isGanadero);
    const user = props.auth?.user ?? null;
    const cartCount = props.cart_count ?? 0;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header
                className="fixed top-0 z-50 w-full border-b border-outline-variant"
                style={{
                    background: 'rgba(250,250,245,0.90)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    boxShadow: '0 1px 8px 0 rgba(0,0,0,0.05)',
                }}
            >
                <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
                    {/* Left: Brand + Nav links */}
                    <NavLinks navLinks={navLinks} url={url} />

                    {/* Right */}
                    <div className="flex shrink-0 items-center gap-2">
                        {/* Carrito */}
                        {!isVeterinario && (
                            <button
                                onClick={() => {
                                    window.location.href = '/carrito';
                                }}
                                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
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
                        )}

                        {/* Separador */}
                        {!isVeterinario && user && (
                            <div className="mx-1 h-5 w-px bg-outline-variant max-md:hidden" />
                        )}

                        {/* Desktop auth */}
                        <div className="flex items-center max-md:hidden">
                            {!user ? (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/login"
                                        className="cursor-pointer border-none bg-transparent px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-on-primary no-underline transition-all hover:bg-primary-container"
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            ) : (
                                <Perfil
                                    isGanadero={isGanadero}
                                    user={user}
                                    getInitials={getInitials}
                                />
                            )}
                        </div>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container md:hidden"
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

                        {/* Carrito — mobile */}
                        {!isVeterinario && (
                            <button
                                onClick={() => {
                                    router.visit('/carrito');
                                    setMenuOpen(false);
                                }}
                                className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary"
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
                        )}

                        {/* Auth — mobile */}
                        {!user ? (
                            <div className="mt-4 flex flex-col gap-2 border-t border-outline-variant pt-4">
                                <Link
                                    href={route('login')}
                                    className="w-full cursor-pointer rounded-lg border border-outline-variant bg-transparent px-4 py-2.5 text-center text-sm font-medium text-on-surface-variant no-underline transition-colors hover:text-primary"
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
                        ) : (
                            <MobilePerfil
                                user={user}
                                getInitials={getInitials}
                                isGanadero={isGanadero}
                            />
                        )}
                    </div>
                )}
            </header>
        </>
    );
}
