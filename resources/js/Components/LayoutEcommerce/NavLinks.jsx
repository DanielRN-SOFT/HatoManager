import { Link } from "@inertiajs/react";

const NavLinks = ({navLinks, url}) => {
    return (
        <div className="flex items-center gap-8">
            <Link
                href="/"
                className="shrink-0 text-xl font-bold text-primary no-underline transition-colors hover:text-primary/80"
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
                                    'relative flex h-16 items-center px-3 text-sm font-medium no-underline transition-colors ' +
                                    (isActive
                                        ? 'text-primary'
                                        : 'text-on-surface-variant hover:text-primary')
                                }
                            >
                                {label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary" />
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NavLinks;
