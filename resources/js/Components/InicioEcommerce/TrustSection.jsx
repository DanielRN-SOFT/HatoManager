const TrustSection = () => {
    return (
        <section className="bg-primary-container py-20 text-on-primary-container">
            <div className="mx-auto max-w-[1440px] px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-extrabold">
                        Seguridad en cada transacción
                    </h2>
                    <p className="mx-auto max-w-2xl text-on-primary-container/80">
                        Nuestro compromiso es garantizar que tu inversión esté
                        respaldada por procesos de verificación rigurosos.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {[
                        {
                            icon: 'verified_user',
                            title: 'Vendedores Verificados',
                            desc: 'Solo trabajamos con ganaderos certificados con trayectoria comprobable en el sector.',
                        },
                        {
                            icon: 'health_and_safety',
                            title: 'Garantía de Sanidad',
                            desc: 'Cada animal cuenta con certificados sanitarios al día y trazabilidad completa de salud.',
                        },
                        {
                            icon: 'weight',
                            title: 'Trazabilidad e historial de pesos',
                            desc: 'Llevamos el historial de peso de cada animal en el sistema, con esto podras tomar decisiones a partir de los resultados',
                        },
                    ].map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                                <span
                                    className="material-symbols-outlined text-4xl"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    {icon}
                                </span>
                            </div>
                            <h3 className="mb-3 text-lg font-bold">{title}</h3>
                            <p className="text-sm leading-relaxed text-on-primary-container/70">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
