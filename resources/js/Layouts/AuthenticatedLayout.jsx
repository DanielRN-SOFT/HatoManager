import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import SideBar from './AuthenticatedPartials/SideBar';
import TopNavBar from './AuthenticatedPartials/TopNavBar';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    // Ancho dinámico para compensar la sidebar en el contenido
    const sidebarWidth = collapsed ? '72px' : '220px';

    return (
        <>
            {/* Google Material Symbols */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />

            <div className="min-h-screen bg-background text-on-background">
                <SideBar
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    collapsed={collapsed}
                    onToggleCollapse={() => setCollapsed((v) => !v)}
                />

                {/* Wrapper que se desplaza según el ancho de la sidebar */}
                <div
                    className="ml-0 flex min-h-screen flex-col transition-all duration-300 lg:ml-[var(--sidebar-w)]"
                    style={{ '--sidebar-w': sidebarWidth }}
                >
                    <TopNavBar
                        user={user}
                        onMenuOpen={() => setMobileOpen(true)}
                        sidebarWidth="0px" // ya maneja el margin arriba
                    />

                    <main className="flex-1 bg-background p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
