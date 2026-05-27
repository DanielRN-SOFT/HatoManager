// resources/js/Layouts/AppLayout.jsx
import { Link, usePage } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const { url } = usePage();

    const navLinks = [
        { href: '/catalogo', label: 'Catálogo' },
        { href: '/subastas', label: 'Subastas' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    --primary:                  #275300;
                    --primary-container:        #3b6d11;
                    --on-primary:               #ffffff;
                    --on-primary-container:     #b2ed83;
                    --primary-fixed-dim:        #9dd770;
                    --secondary:                #3e6a00;
                    --secondary-container:      #b7f473;
                    --on-secondary:             #ffffff;
                    --on-secondary-container:   #427000;
                    --tertiary:                 #3e5000;
                    --tertiary-container:       #536900;
                    --on-tertiary:              #ffffff;
                    --on-tertiary-container:    #c7eb5a;
                    --background:               #fafaf5;
                    --on-background:            #1a1c19;
                    --surface:                  #fafaf5;
                    --on-surface:               #1a1c19;
                    --surface-variant:          #e3e3de;
                    --on-surface-variant:       #42493b;
                    --surface-container-low:    #f4f4ef;
                    --surface-container:        #eeeee9;
                    --surface-container-high:   #e8e8e3;
                    --surface-container-highest:#e3e3de;
                    --surface-dim:              #dadad5;
                    --surface-bright:           #fafaf5;
                    --outline:                  #727969;
                    --outline-variant:          #c2c9b7;
                    --error:                    #ba1a1a;
                    --error-container:          #ffdad6;
                    --on-error:                 #ffffff;
                    --on-error-container:       #93000a;
                    --inverse-surface:          #2f312e;
                    --inverse-on-surface:       #f1f1ec;
                    --inverse-primary:          #9dd770;
                }

                body {
                    font-family: 'Hanken Grotesk', sans-serif;
                    background-color: var(--background);
                    color: var(--on-background);
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    vertical-align: middle;
                }

                /* ── NAV ── */
                .top-nav {
                    background: var(--surface);
                    border-bottom: 1px solid var(--outline-variant);
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                .top-nav__inner {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 64px;
                    width: 100%;
                    max-width: 1440px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    gap: 2rem;
                }
                .top-nav__brand {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--primary);
                    text-decoration: none;
                }
                .top-nav__links {
                    display: flex;
                    gap: 1.5rem;
                    list-style: none;
                }
                .top-nav__link {
                    text-decoration: none;
                    font-weight: 500;
                    color: var(--on-surface-variant);
                    transition: color .2s;
                    padding-bottom: 2px;
                }
                .top-nav__link:hover { color: var(--secondary); }
                .top-nav__link--active {
                    color: var(--primary);
                    font-weight: 700;
                    border-bottom: 2px solid var(--primary);
                }
                .top-nav__actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .btn-ghost {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: inherit;
                    font-weight: 500;
                    color: var(--on-surface-variant);
                    transition: color .2s;
                    font-size: 14px;
                }
                .btn-ghost:hover { color: var(--secondary); }
                .btn-primary {
                    background: var(--primary);
                    color: var(--on-primary);
                    border: none;
                    padding: .5rem 1rem;
                    border-radius: .5rem;
                    font-family: inherit;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background .2s, transform .1s;
                }
                .btn-primary:hover { background: var(--primary-container); }
                .btn-primary:active { transform: scale(.97); }

                /* ── MAIN ── */
                .layout-main {
                    flex: 1;
                }

                /* ── FOOTER ── */
                .footer {
                    background: var(--surface-container-highest);
                    border-top: 1px solid var(--outline-variant);
                }
                .footer__inner {
                    max-width: 1440px;
                    margin: 0 auto;
                    padding: 3rem 2rem;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    gap: 2rem;
                }
                .footer__brand { font-weight: 700; color: var(--primary); font-size: 14px; }
                .footer__copy { color: var(--on-surface-variant); font-size: 14px; margin-top: 4px; }
                .footer__links { display: flex; flex-wrap: wrap; gap: 1.5rem; }
                .footer__links a {
                    font-size: 14px;
                    color: var(--on-surface-variant);
                    text-decoration: none;
                    transition: color .2s;
                }
                .footer__links a:hover { color: var(--secondary); }

                @media (max-width: 640px) {
                    .top-nav__links { display: none; }
                }
            `}</style>

            <nav className="top-nav">
                <div className="top-nav__inner">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem',
                        }}
                    >
                        <Link href="/" className="top-nav__brand">
                            Agro-Pro
                        </Link>
                        <ul className="top-nav__links">
                            {navLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`top-nav__link${url.startsWith(href) ? 'top-nav__link--active' : ''}`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="top-nav__actions">
                        <button className="btn-ghost">Iniciar Sesión</button>
                        <button className="btn-primary">Registrarse</button>
                    </div>
                </div>
            </nav>

            <main className="layout-main">{children}</main>

            <footer className="footer">
                <div className="footer__inner">
                    <div>
                        <div className="footer__brand">Agro-Pro</div>
                        <p className="footer__copy">
                            © 2024 Agro-Pro Cattle Management. Todos los
                            derechos reservados.
                        </p>
                    </div>
                    <nav className="footer__links">
                        <a href="#">Políticas de Privacidad</a>
                        <a href="#">Términos de Servicio</a>
                        <a href="#">Soporte Técnico</a>
                        <a href="#">Contacto</a>
                    </nav>
                </div>
            </footer>
        </>
    );
}
