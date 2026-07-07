import OrderCard from '@/Components/Ventas/OrderHistory/OrderCard';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';

export default function OrderHistory({ orders }) {
    return (
        <EcommerceLayout>
            <Head title="Mis Pedidos" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                {/* Page header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-on-surface">
                            Mis pedidos
                        </h1>
                        <p className="mt-0.5 text-sm text-on-surface-variant">
                            Historial completo de tus compras y su estado
                            actual.
                        </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-[22px]">
                            receipt_long
                        </span>
                    </div>
                </div>

                {/* Empty state */}
                {orders.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-outline-variant bg-white py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container text-on-surface-variant">
                            <span className="material-symbols-outlined text-4xl">
                                receipt_long
                            </span>
                        </div>
                        <p className="text-base font-semibold text-on-surface">
                            No tienes pedidos aún
                        </p>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            Cuando realices una compra aparecerá aquí.
                        </p>
                        <Link
                            href="/ventas"
                            className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary no-underline transition-all hover:bg-primary-container"
                        >
                            Ver catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {orders.data.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}

                {/* Paginación */}
                {orders.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-1.5">
                        {orders.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                preserveScroll
                                className={[
                                    'flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm font-medium no-underline transition-colors',
                                    link.active
                                        ? 'bg-primary text-on-primary'
                                        : link.url
                                          ? 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                                          : 'pointer-events-none text-on-surface-variant/30',
                                ].join(' ')}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </EcommerceLayout>
    );
}
