import { Link, router, usePage } from '@inertiajs/react';

const AccionesButton = ({setToast, animal, cartItems}) => {
    const { auth } = usePage().props;
    const esVeterinario = auth.user && auth.roles?.includes('veterinario');
    const puedeComprar = !esVeterinario;
    const enCarrito = cartItems.includes(animal.id);
    const reservado = animal.status === 'Reservado';

    function handleCart() {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        function showToast(message, type = 'success') {
            setToast({ message, type });
            setTimeout(() => setToast(null), 3000);
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
        <div className="flex flex-col gap-3 sm:flex-row">
            {reservado ? (
                <button
                    disabled
                    className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-surface-container px-6 py-3 text-sm font-bold text-on-surface-variant"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        lock
                    </span>
                    Reservado
                </button>
            ) : !puedeComprar ? (
                <button
                    disabled
                    className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-surface-container px-6 py-3 text-sm font-bold text-on-surface-variant"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        visibility
                    </span>
                    Solo visualización
                </button>
            ) : enCarrito ? (
                <button
                    disabled
                    className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-bold text-primary"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        check_circle
                    </span>
                    En tu carrito
                </button>
            ) : (
                <button
                    onClick={handleCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-on-primary transition-all hover:bg-primary-container active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        shopping_cart
                    </span>
                    Agregar al carrito
                </button>
            )}
            <Link
                href={'/sales'}
                className="flex items-center justify-center gap-2 rounded-lg border border-outline-variant px-6 py-3 text-sm font-medium text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
            >
                <span className="material-symbols-outlined text-[20px]">
                    arrow_back
                </span>
                Volver
            </Link>
        </div>
    );
};

export default AccionesButton;
