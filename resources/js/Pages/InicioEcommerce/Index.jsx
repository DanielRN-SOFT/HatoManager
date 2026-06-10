import CatalogCard from '@/Components/InicioEcommerce/CatalogoCard';
import HeroSection from '@/Components/InicioEcommerce/HeroSection';
import NewsLetter from '@/Components/InicioEcommerce/NewsLetter';
import TrustSection from '@/Components/InicioEcommerce/TrustSection';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

export default function Index({ animals, total = 458 }) {
    return (
        <EcommerceLayout>
            <Head title="Inicio — HatoManager" />

            {/* ── Hero ── */}
            <HeroSection />

            {/* ── Sales Grid ── */}
            <section className="mx-auto max-w-[1440px] px-8 py-16">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-primary">
                            Ventas Destacadas
                        </h2>
                        <p className="mt-1 text-on-surface-variant">
                            Los mejores ejemplares disponibles para compra
                            inmediata.
                        </p>
                    </div>
                    <div className="text-sm text-on-surface-variant">
                        Mostrando {animals.length} de {total} resultados
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {animals.map((animal) => (
                        <CatalogCard
                            key={animal.id}
                            animal={animal}
                            onDetail={(a) => console.log('Ver detalle:', a.id)}
                            onCart={(a) =>
                                console.log('Añadir al carrito:', a.id)
                            }
                        />
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <button className="rounded-xl border-2 border-primary px-10 py-4 font-bold text-primary transition-all hover:bg-primary/5">
                        Cargar más ejemplares
                    </button>
                </div>
            </section>

            {/* ── Trust Section ── */}
            <TrustSection />

            {/* ── Newsletter ── */}
            <NewsLetter />
        </EcommerceLayout>
    );
}
