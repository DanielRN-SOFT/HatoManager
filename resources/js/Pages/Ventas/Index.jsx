import AnimalCard from '@/Components/Ventas/AnimalCard';
import FilterBar from '@/Components/Ventas/FilterBar';
import Header from '@/Components/Ventas/Header';
import Paginacion from '@/Components/Ventas/Paginacion';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({
    animals,
    breeds,
    categories,
    departments,
    total = 0,
    meta = {},
}) {
    const [filters, setFilters] = useState({});

    function handleFilter() {
        router.get(route('animales-venta.index'), filters, {
            preserveState: true,
        });
    }

    function handleCart(animal) {
        console.log('Agregar al carrito:', animal.id);
        // router.post(route('cart.add'), { animal_id: animal.id });
    }

    function handlePage(page) {
        router.get(
            route('animales-venta.index'),
            { ...filters, page },
            { preserveState: true },
        );
    }

    return (
        <EcommerceLayout>
            <Head title="Animales en venta — HatoManager" />

            <main className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
                <Header total={total} />
                <FilterBar
                    categories={categories}
                    breeds={breeds}
                    departments={departments}
                    filters={filters}
                    onChange={setFilters}
                    onFilter={handleFilter}
                />

                <section>
                    {!animals?.length ? (
                        <div className="flex flex-col items-center gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest py-24 text-on-surface-variant">
                            <span className="material-symbols-outlined text-6xl text-outline">
                                search_off
                            </span>
                            <p className="text-base font-medium">
                                No se encontraron animales con esos filtros.
                            </p>
                            <p className="text-sm text-outline">
                                Intenta ajustar los criterios de búsqueda.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {animals.map((animal) => (
                                <AnimalCard
                                    key={animal.id}
                                    animal={animal}
                                    onCart={handleCart}
                                />
                            ))}
                        </div>
                    )}
                    <Paginacion
                        currentPage={meta.current_page ?? 1}
                        lastPage={meta.last_page ?? 1}
                        onPage={handlePage}
                    />
                </section>
            </main>
        </EcommerceLayout>
    );
}
