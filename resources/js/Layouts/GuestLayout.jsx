export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background px-4 py-12">
            <div
                className="pointer-events-none fixed inset-0 opacity-20"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, #e2e2d8 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
            <main className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-2 w-full bg-primary" />
                {children}
            </main>

            <footer className="relative z-10 mt-8 flex gap-6 text-sm text-on-surface-variant">
                <a href="#" className="transition-colors hover:text-primary">
                    Privacidad
                </a>
                <a href="#" className="transition-colors hover:text-primary">
                    Términos
                </a>
                <a href="#" className="transition-colors hover:text-primary">
                    Soporte
                </a>
            </footer>
        </div>
    );
}
