import CatalogCard from '@/Components/InicioEcommerce/CatalogoCard';
import HeroSection from '@/Components/InicioEcommerce/HeroSection';
import TrustSection from '@/Components/InicioEcommerce/TrustSection';
import ToastEcommerce from '@/Components/ToastEcommerce';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import WhyChooseUs from '@/Components/InicioEcommerce/WhyChooseUs';

export default function Index({ animals, cartItems = [] }) {
    const { auth } = usePage().props;
    const [toast, setToast] = useState(null);
    function handleCart(animal, e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!auth.user) {
            router.visit('/login');
            return;
        }

        router.post(
            '/carrito/agregar',
            { animal_id: animal.id },
            {
                preserveScroll: true,
                onSuccess: () =>
                    showToast(`${animal.name} agregado al carrito`),
                onError: () =>
                    showToast('No se pudo agregar al carrito', 'error'),
            },
        );
    }

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

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
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {animals.map((animal) => (
                        <CatalogCard
                            key={animal.id}
                            animal={animal}
                            enCarrito={cartItems.includes(animal.id)}
                            onCart={handleCart}
                        />
                    ))}
                </div>
            </section>

            {/* ── Trust Section ── */}
            <TrustSection />

            {/* ── Newsletter ── */}
            <WhyChooseUs />

            {toast && (
              <ToastEcommerce toast={toast}/>
            )}
        </EcommerceLayout>
    );
}
