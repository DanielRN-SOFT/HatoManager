const NewsLetter = () => {
    return (
        <section className="mx-auto max-w-[1440px] px-8 py-24">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-highest p-12">
                <div className="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
                    <div className="max-w-lg">
                        <h2 className="mb-3 text-2xl font-bold text-primary">
                            Recibe las mejores ofertas
                        </h2>
                        <p className="text-on-surface-variant">
                            Únete a nuestra comunidad y recibe notificaciones
                            semanales sobre nuevos lotes y ventas destacadas
                            directamente en tu correo.
                        </p>
                    </div>
                    <div className="w-full max-w-md">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="flex-grow rounded-lg border-outline-variant bg-white px-4 py-4 focus:border-primary focus:ring-primary"
                            />
                            <button className="whitespace-nowrap rounded-lg bg-primary px-8 py-4 font-bold text-on-primary transition-all hover:bg-primary-container">
                                Suscribirme
                            </button>
                        </div>
                        <p className="mt-3 px-1 text-xs text-on-surface-variant">
                            Respetamos tu privacidad. Puedes cancelar en
                            cualquier momento.
                        </p>
                    </div>
                </div>
                <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            </div>
        </section>
    );
};

export default NewsLetter;
