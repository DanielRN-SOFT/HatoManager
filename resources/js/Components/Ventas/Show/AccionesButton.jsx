import { Link, router, usePage } from '@inertiajs/react';
const AccionesButton = ({ setToast, animal, cartItems }) => {
    const { auth } = usePage().props;
    const esVeterinario = auth.user && auth.roles?.includes('veterinario');
    const puedeComprar = !esVeterinario;
    const enCarrito = cartItems.includes(animal.id);
    const reservado = animal.status === 'Reservado';
    function showToast(message, type = 'success') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    }
    function handleCart() {
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
    return (
        <div className="flex flex-col gap-2.5">
            {/* Botón principal */}
            {reservado ? (
                <button
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-surface-container px-4 py-3 text-sm font-bold text-on-surface-variant"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        lock
                    </span>
                    Animal reservado
                </button>
            ) : !puedeComprar ? (
                <button
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-surface-container px-4 py-3 text-sm font-bold text-on-surface-variant"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        visibility
                    </span>
                    Solo visualización
                </button>
            ) : enCarrito ? (
                <button
                    disabled
                    className="bg-primary/8 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 py-3 text-sm font-bold text-primary"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        check_circle
                    </span>
                    En tu carrito
                </button>
            ) : (
                <button
                    onClick={handleCart}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary shadow-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        shopping_cart
                    </span>
                    Agregar al carrito
                </button>
            )}
            {/* Botón secundario */}
            <Link
                href="/ventas"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant px-4 py-2.5 text-sm font-medium text-on-surface-variant transition-all duration-200 hover:border-outline hover:bg-surface-container hover:text-on-surface"
            >
                <span className="material-symbols-outlined text-[18px]">
                    arrow_back
                </span>
                Volver al catálogo
            </Link>
        </div>
    );
};
export default AccionesButton;
