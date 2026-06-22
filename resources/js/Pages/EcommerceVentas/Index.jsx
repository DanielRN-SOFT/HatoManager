import ToastEcommerce from '@/Components/ToastEcommerce';
import AnimalCard from '@/Components/Ventas/AnimalCard';
import FilterBar from '@/Components/Ventas/FilterBar';
import Header from '@/Components/Ventas/Header';
import Paginacion from '@/Components/Ventas/Paginacion';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({
    animals,
    breeds,
    categories,
    departments,
    filters: initialFilters = {},
    total = 0,
    cartItems = [],
    minWeight,
    maxWeight,
    minPrice,
    maxPrice,
}) {
    const [filters, setFilters] = useState(initialFilters);
    const { auth } = usePage().props;
    const [toast, setToast] = useState(null);
    const esVeterinario = auth.user && auth.roles?.includes('veterinario');
    const hayFiltros = Object.values(filters).some(
        (v) => v !== '' && v != null,
    );

    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    function handleFilter(updatedFilters) {
        router.get(route('ecommerce.sales.index'), updatedFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleClear() {
        const empty = {};
        setFilters(empty);
        router.get(route('ecommerce.sales.index'), empty, {
            preserveState: true,
            preserveScroll: true,
        });
    }

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

    function handlePage(page) {
        router.get(
            route('ecommerce.sales.index'),
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
                    minWeight={minWeight}
                    maxWeight={maxWeight}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onClear={handleClear}
                    hayFiltros={hayFiltros}
                />
                <section>
                    {!items.length ? (
                        <div className="flex flex-col items-center gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest py-24 text-on-surface-variant">
                            <span className="material-symbols-outlined text-6xl text-outline">
                                search_off
                            </span>
                            <p className="text-base font-medium">
                                No se encontraron animales con esos filtros.
                            </p>
                            <p className="text-sm text-outline">
                                Intenta ajustar los criterios de búsqueda.
                            </p>
                            {hayFiltros && (
                                <button
                                    onClick={handleClear}
                                    className="mt-2 flex items-center gap-1.5 rounded-xl border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition-colors hover:border-primary hover:text-primary"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        filter_alt_off
                                    </span>
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {items.map((animal) => (
                                <AnimalCard
                                    key={animal.id}
                                    animal={animal}
                                    onCart={handleCart}
                                    enCarrito={cartItems.includes(animal.id)}
                                    puedeComprar={!esVeterinario}
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
            {toast && <ToastEcommerce toast={toast} />}
        </EcommerceLayout>
    );
}
