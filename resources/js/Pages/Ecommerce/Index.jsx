import CatalogCard from '@/Components/Ecommerce/CatalogoCard';
import FilterBar from '@/Components/Ecommerce/FilterBar';
import HeroSection from '@/Components/Ecommerce/HeroSection';
import NewsLetter from '@/Components/Ecommerce/NewsLetter';
import TrustSection from '@/Components/Ecommerce/TrustSection';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// ── Static seed data (replace with Inertia props from controller) ──
const ANIMALS = [
    {
        id: 1,
        name: 'Brahman Blanco - 450kg',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLs8bu3fgxPXIzCqcjGyAtosJLszPCFtHu0WGZjAWMpbdvZdWpyYCkWJyJyJbhnNpMII2zk5X_yUahouEJYGB00HgTA2epjqiETGh_fCJ6cdtKGDHrnhH1IBSj9n6Kq8mIgLIvcqS9CUSI0Os7e_jDdoGkme4MPOMTWfOQ2cwHEoKbHDGVhWByvy5v7YUjr8m0OSOVReRDIkHFbBXDqNEYhh-mfx5l_s1Y-NTuWDucdlTNitql4E-4IH5ow',
        location: 'Hacienda La Gloria, Córdoba',
        price: 'COP $4.850.000',
        status: 'disponible',
    },
    {
        id: 2,
        name: 'Angus Negro - 520kg',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLuHJYe_K740346Wmo8JFt9MbtECFLOM1UZ-XeIyAjvsy85ZuzcmzDmuhbclE2I6DYCVidTIclFMe4YEGT95P3JsmOdGO49eGP9-UoYJ7HK3tBQmR6mpZ5PqJgrVjzQpUrGczOOBzVWtQNIE-Guy8uwzmJNzm2bQ2GNU0VdUhKATXvpPjlxdqy_8cvg4PRH30gA76lCQESw8cAZlXlOUnn3GmGPQFSRMxZXzcium6i8-BWbvicjZnVljb9Y',
        location: 'Rancho San José, Antioquia',
        price: 'COP $6.200.000',
        status: 'reservado',
    },
    {
        id: 3,
        name: 'Holstein F1 - 380kg',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLsMNwkhhLu06jYZntxCu3XtgKHe7BzgRFphEHz11_rCvbjwGFYkgKneztRTLlkvIk_b0dgUiq5SfqE-vgLs99OuESGzc4aeDKT7OO2wsGwhjUElNLIQUBmnJy-xu2o2VpDQfZgu3L9R3oFVKC1CAVGoe5JbXfQN_YvHHyEGGtiTk76h5j3fXozgKMmOLJ4G-VSvIKIXJ8cpBCji7dgvSS0_wo_FKgC_q0cPXcd6opazifm5L8m_9l0x7wY',
        location: 'Ganadería El Trebol, Boyacá',
        price: 'COP $3.950.000',
        status: 'disponible',
    },
    {
        id: 4,
        name: 'Gyr Lechero - 410kg',
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLtu33bFKigJSh9V9xzLiEb-0FJho1HFJ0S0OpjdFcnjVy36dMvSjPt6tJQk9rzEf5o3Dfx_Xb11M4QM_x-z4u70gPvstKRJK9ilnxEe1d12uiUw-fyy4uHYtuJobSPGLvGjGjpIjrFTmQ2pbGSlhTZTH6p-9dvTYASMrd8RAjuHV1k4mIydXQe2e7cnJoqMR76LwXMtzNEIqZjb0P_xXGQSPMHmlsJnHWxH0mg2tH5OepAkDxhnUULwIzs',
        location: 'Hato El Diamante, Meta',
        price: 'COP $5.100.000',
        status: 'disponible',
    },
];

/**
 * Inertia page — receives `animals` and `total` from the controller.
 * Falls back to static seed data when props are absent.
 */
export default function Index({ animals = ANIMALS, total = 458 }) {
    const [filters, setFilters] = useState({});

    const handleFilter = () => {
        // Trigger an Inertia visit with filters as query params:
        // router.get('/catalogo', filters, { preserveState: true });
        console.log('Filtros aplicados:', filters);
    };

    return (
        <EcommerceLayout>
            <Head title="Catálogo de Ventas — HatoManager" />

            {/* ── Hero ── */}
            <HeroSection />

            {/* ── Filter Bar ── */}
            <FilterBar
                filters={filters}
                onChange={setFilters}
                onFilter={handleFilter}
            />

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
