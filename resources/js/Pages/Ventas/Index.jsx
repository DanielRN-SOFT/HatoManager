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
    filters: initialFilters = {}, // ← recibir filtros activos
    total = 0,
}) {
    const [filters, setFilters] = useState(initialFilters);

    function handleFilter() {
        router.get(route('sales.index'), filters, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleCart(animal) {
        console.log('Agregar al carrito:', animal.id);
    }

    function handlePage(page) {
        router.get(
            route('sales.index'),
            { ...filters, page },
            { preserveState: true, preserveScroll: false },
        );
    }

    const items = animals?.data ?? [];

    return (
        <EcommerceLayout>
            <Head title="Animales en venta — HatoManager" />
            <main className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
                <Header total={animals?.total ?? total} />
                <FilterBar
                    categories={categories}
                    breeds={breeds}
                    departments={departments}
                    filters={filters}
                    onChange={setFilters}
                    onFilter={handleFilter}
                />
                <section>
                    {!items.length ? (
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
                            {items.map((animal) => (
                                <AnimalCard
                                    key={animal.id}
                                    animal={animal}
                                    onCart={handleCart}
                                />
                            ))}
                        </div>
                    )}

                    {animals?.last_page > 1 && (
                        <Paginacion
                            currentPage={animals.current_page}
                            lastPage={animals.last_page}
                            onPage={handlePage}
                        />
                    )}
                </section>
            </main>
        </EcommerceLayout>
    );
}
