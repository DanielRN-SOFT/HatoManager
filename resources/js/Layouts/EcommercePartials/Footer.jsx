import { Link } from '@inertiajs/react';

const footerSections = [
    {
        title: 'Explorar',
        links: [
            { href: '/vendedores', label: 'Vendedores Destacados' },
            { href: '/ayuda', label: 'Ayuda' },
        ],
    },
    {
        title: 'Compañía',
        links: [
            { href: '/nosotros', label: 'Sobre Nosotros' },
            { href: '/contacto', label: 'Contacto' },
            { href: '/terminos', label: 'Términos de Uso' },
            { href: '/privacidad', label: 'Privacidad' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-outline-variant bg-surface-container-highest pb-12 pt-16">
            <div className="mx-auto max-w-[1440px] px-8">
                <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="mb-4 text-lg font-bold text-primary">
                            HatoManager
                        </div>
                        <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                            Líderes en tecnología para la gestión ganadera y
                            comercialización de ejemplares de alta genética.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-primary transition-all hover:bg-primary hover:text-white"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    share
                                </span>
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-primary transition-all hover:bg-primary hover:text-white"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    public
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Nav sections */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-on-surface">
                                {section.title}
                            </h4>
                            <ul className="m-0 flex list-none flex-col gap-3 p-0">
                                {section.links.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="text-sm text-on-surface-variant no-underline transition-colors hover:text-primary"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-on-surface">
                            Soporte
                        </h4>
                        <ul className="m-0 flex list-none flex-col gap-3 p-0 text-sm text-on-surface-variant">
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">
                                    mail
                                </span>
                                soporte@hatomanager.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">
                                    call
                                </span>
                                +57 601 234 5678
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">
                                    home_pin
                                </span>
                                Cartago, Valle del Cauca, Colombia
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-outline-variant pt-8 text-center">
                    <p className="text-sm text-on-surface-variant">
                        © {new Date().getFullYear()} HatoManager. Excelencia en
                        Gestión Ganadera. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
