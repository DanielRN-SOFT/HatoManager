const WhyChooseUs = () => {
    const features = [
        {
            title: 'Lotes verificados',
            description:
                'Cada lote es revisado e inspeccionado antes de publicarse en la plataforma.',
            icon: (
                <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75l2.25 2.25 6-6m-9-3.75h.008v.008H9V5.25zm-3 0A2.25 2.25 0 003.75 7.5v9A2.25 2.25 0 006 18.75h12a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0018 5.25H6z"
                    />
                </svg>
            ),
        },
        {
            title: 'Mejor precio garantizado',
            description:
                'Ofertas competitivas en cada lote, directamente de los proveedores.',
            icon: (
                <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h.008v.008H6V6z"
                    />
                </svg>
            ),
        },

        {
            title: 'Soporte 24/7',
            description:
                'Nuestro equipo te acompaña antes, durante y después de tu compra.',
            icon: (
                <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9.75h7.5M8.25 12h7.5m-7.5 2.25h4.5m4.5-9.75H6a2.25 2.25 0 00-2.25 2.25v9A2.25 2.25 0 006 18h2.25v3l4.5-3H18a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0018 4.5z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <section className="mx-auto max-w-[1440px] px-8 py-24">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-highest p-12">
                <div className="relative z-10">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-3 text-2xl font-bold text-primary">
                            ¿Por qué comprar con nosotros?
                        </h2>
                        <p className="text-on-surface-variant">
                            Miles de compradores confían en nuestra plataforma
                            para encontrar las mejores ofertas en lotes, con
                            total seguridad y respaldo.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 font-bold text-on-surface">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-on-surface-variant">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            </div>
        </section>
    );
};

export default WhyChooseUs;
