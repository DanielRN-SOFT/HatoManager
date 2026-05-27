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
                <div className="h-1 w-full bg-primary" />

                {/* Logo section */}
                <div className="flex flex-col items-center gap-1 pt-3">
                    <img
                        src="images/HatoManager-logo.png"
                        alt="HatoManager"
                        className="w-48 object-contain"
                    />{' '}
                </div>

                {children}
            </main>
        </div>
    );
}
