import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const categories = [
    {
        id: 'compras',
        icon: 'shopping_cart',
        label: 'Compras',
    },
    {
        id: 'ventas',
        icon: 'storefront',
        label: 'Ventas',
    },
    {
        id: 'cuenta',
        icon: 'manage_accounts',
        label: 'Mi cuenta',
    },
    {
        id: 'pagos',
        icon: 'payments',
        label: 'Pagos',
    },
    {
        id: 'sanidad',
        icon: 'health_and_safety',
        label: 'Sanidad',
    },
    {
        id: 'envios',
        icon: 'local_shipping',
        label: 'Envíos',
    },
];

const faqs = [
    {
        category: 'compras',
        question: '¿Cómo agrego un animal al carrito?',
        answer: 'Ingresa al catálogo, busca el animal que deseas y haz clic en el botón "Agregar al carrito". Si el animal aparece como Reservado, no estará disponible para compra en ese momento. Una vez en el carrito puedes revisar el resumen antes de confirmar.',
    },
    {
        category: 'compras',
        question: '¿Puedo comprar más de un animal a la vez?',
        answer: 'Sí. Puedes agregar varios animales al carrito desde distintos vendedores y completar todo en una sola transacción. El resumen de compra te mostrará el desglose por vendedor antes de pagar.',
    },
    {
        category: 'compras',
        question: '¿Cómo sé si un animal es de confianza?',
        answer: 'Cada animal publicado en HatoManager cuenta con certificados sanitarios vigentes, historial de pesos registrado en el sistema y un vendedor verificado. Puedes ver toda esta información en el detalle del animal antes de comprar.',
    },
    {
        category: 'compras',
        question: '¿Puedo ver el animal antes de comprarlo?',
        answer: 'Sí. Puedes coordinar una visita al predio con el vendedor a través del chat de la plataforma. Te recomendamos siempre hacer una inspección presencial antes de confirmar la compra de animales de alto valor.',
    },
    {
        category: 'ventas',
        question: '¿Cómo publico un animal para vender?',
        answer: 'Desde tu panel de vendedor, ve a "Mis animales" y haz clic en "Publicar animal". Completa la información requerida: nombre, raza, peso, edad, fotos y certificados sanitarios. Una vez enviado, nuestro equipo revisará la publicación en máximo 24 horas hábiles.',
    },
    {
        category: 'ventas',
        question: '¿Qué documentos necesito para publicar?',
        answer: 'Para publicar un animal necesitas: certificado de sanidad animal vigente expedido por un veterinario habilitado, documento de identificación del propietario y, en caso de bovinos, el certificado de vacunación contra aftosa y brucelosis al día.',
    },
    {
        category: 'ventas',
        question: '¿Cuánto cobra HatoManager por vender?',
        answer: 'HatoManager cobra una comisión del 3% sobre el valor de cada transacción exitosa. No hay costos de publicación ni mensualidades. Solo pagas cuando vendes.',
    },
    {
        category: 'ventas',
        question: '¿Cuándo recibo el dinero de mi venta?',
        answer: 'El pago se libera dentro de los 3 días hábiles siguientes a la confirmación de entrega del animal por parte del comprador. El dinero se transfiere directamente a la cuenta bancaria registrada en tu perfil.',
    },
    {
        category: 'cuenta',
        question: '¿Cómo cambio mi contraseña?',
        answer: 'Ingresa a Configuración desde tu perfil, selecciona "Seguridad" y haz clic en "Cambiar contraseña". Necesitarás confirmar tu contraseña actual antes de establecer una nueva. Si olvidaste tu contraseña, usa la opción "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión.',
    },
    {
        category: 'cuenta',
        question: '¿Puedo tener una cuenta como comprador y vendedor a la vez?',
        answer: 'Sí. Una misma cuenta puede operar como comprador y vendedor. Desde tu perfil puedes activar el modo vendedor completando la información de tu finca y documentos requeridos, sin necesidad de crear una cuenta nueva.',
    },
    {
        category: 'cuenta',
        question: '¿Cómo elimino mi cuenta?',
        answer: 'Para solicitar la eliminación de tu cuenta escríbenos a privacidad@hatomanager.co desde el correo registrado. Ten en cuenta que si tienes transacciones activas o pendientes, deberás resolverlas antes de que podamos procesar la solicitud.',
    },
    {
        category: 'pagos',
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos tarjetas de crédito y débito Visa, Mastercard y American Express, transferencias bancarias PSE y pagos por Nequi o Daviplata. Todos los pagos se procesan a través de pasarelas certificadas con cifrado SSL.',
    },
    {
        category: 'pagos',
        question: '¿Es seguro pagar en HatoManager?',
        answer: 'Sí. Utilizamos pasarelas de pago certificadas bajo estándar PCI-DSS. HatoManager no almacena datos de tarjetas. Todas las transacciones viajan cifradas y contamos con sistemas de detección de fraude en tiempo real.',
    },
    {
        category: 'pagos',
        question: '¿Puedo solicitar una factura?',
        answer: 'Sí. Desde el historial de compras en tu perfil puedes descargar el comprobante de cada transacción. Si necesitas factura electrónica con tus datos fiscales, actualiza tu información tributaria en Configuración antes de realizar la compra.',
    },
    {
        category: 'sanidad',
        question: '¿Qué certifica el certificado sanitario?',
        answer: 'El certificado sanitario, expedido por un médico veterinario habilitado, acredita que el animal fue examinado clínicamente y se encontró aparentemente sano al momento de la inspección. Incluye estado vacunal, pruebas diagnósticas realizadas y aptitud para movilización.',
    },
    {
        category: 'sanidad',
        question: '¿Qué pasa si el animal llega enfermo?',
        answer: 'Si el animal presenta una condición de salud que no fue declarada en la publicación y puede demostrarse que existía antes de la entrega, tienes 48 horas para reportarlo a través de soporte. HatoManager mediará entre comprador y vendedor para resolver la situación conforme a los términos de uso.',
    },
    {
        category: 'envios',
        question: '¿HatoManager se encarga del transporte?',
        answer: 'El transporte puede coordinarse directamente entre comprador y vendedor, o puedes solicitarlo a través de nuestra red de transportadores aliados disponible en la plataforma. Los costos de flete no están incluidos en el precio del animal salvo que el vendedor lo especifique.',
    },
    {
        category: 'envios',
        question: '¿Cuánto tarda en llegar el animal?',
        answer: 'El tiempo de entrega depende de la distancia entre el predio de origen y el destino, y de la disponibilidad de transporte. En promedio, las entregas dentro del mismo departamento toman 1 a 2 días y entre departamentos de 2 a 5 días hábiles.',
    },
];

const quickLinks = [
    { icon: 'menu_book', label: 'Términos de uso', href: '/terminos-de-uso' },
    { icon: 'shield', label: 'Política de privacidad', href: '/privacidad' },
    { icon: 'mail', label: 'Contacto', href: '/contacto' },
    { icon: 'info', label: 'Sobre nosotros', href: '/sobre-nosotros' },
];

export default function Ayuda() {
    const [activeCategory, setActiveCategory] = useState('compras');
    const [openQuestion, setOpenQuestion] = useState(null);
    const [search, setSearch] = useState('');

    const filtered = faqs.filter((faq) => {
        const matchesCategory = activeCategory
            ? faq.category === activeCategory
            : true;
        const matchesSearch =
            search.trim() === '' ||
            faq.question.toLowerCase().includes(search.toLowerCase()) ||
            faq.answer.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    function handleSearch(e) {
        setSearch(e.target.value);
        if (e.target.value.trim() !== '') {
            setActiveCategory(null);
        } else {
            setActiveCategory('compras');
        }
    }

    return (
        <EcommerceLayout>
            <Head title="Centro de Ayuda — HatoManager" />

            {/* Hero */}
            <section className="relative flex h-[400px] items-end overflow-hidden pb-14">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/ayuda.jpg"
                        alt="Política de privacidad HatoManager"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-4 py-1.5">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="whitespace-nowrap text-xs font-medium uppercase tracking-widest text-primary">
                            Centro de ayuda
                        </span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                        ¿En que te ayudamos?
                    </h1>
                    <p className="mt-3 text-sm text-white/80">
                        Preguntas frecuentes en HatoManager
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-[1440px] px-8 py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Sidebar */}
                    <aside className="flex flex-col gap-6">
                        {/* Categorías */}
                        <div className="rounded-2xl border border-outline-variant bg-surface-container p-5">
                            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                                Categorías
                            </p>
                            <nav className="flex flex-col gap-1">
                                {categories.map(({ id, icon, label }) => (
                                    <button
                                        key={id}
                                        onClick={() => {
                                            setActiveCategory(id);
                                            setSearch('');
                                            setOpenQuestion(null);
                                        }}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                                            activeCategory === id
                                                ? 'bg-primary font-semibold text-on-primary'
                                                : 'text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container'
                                        }`}
                                    >
                                        <span
                                            className="material-symbols-outlined text-base"
                                            style={{
                                                fontVariationSettings:
                                                    "'FILL' 1",
                                            }}
                                        >
                                            {icon}
                                        </span>
                                        {label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Links rápidos */}
                        <div className="rounded-2xl border border-outline-variant bg-surface-container p-5">
                            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                                Enlaces útiles
                            </p>
                            <nav className="flex flex-col gap-1">
                                {quickLinks.map(({ icon, label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-on-surface-variant transition-all hover:bg-primary-container hover:text-on-primary-container"
                                    >
                                        <span
                                            className="material-symbols-outlined text-base"
                                            style={{
                                                fontVariationSettings:
                                                    "'FILL' 1",
                                            }}
                                        >
                                            {icon}
                                        </span>
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* ¿No encontraste? */}
                        <div className="rounded-2xl bg-primary p-6 text-center text-on-primary">
                            <span
                                className="material-symbols-outlined mb-2 text-4xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                support_agent
                            </span>
                            <p className="mb-1 font-bold">
                                ¿No encontraste tu respuesta?
                            </p>
                            <p className="mb-4 text-xs text-on-primary/80">
                                Nuestro equipo responde en menos de 2 horas
                                hábiles.
                            </p>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-inverse-primary"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    mail
                                </span>
                                Escribirnos
                            </Link>
                        </div>
                    </aside>

                    {/* FAQs */}
                    <div className="lg:col-span-3">
                        {search.trim() !== '' && (
                            <p className="mb-6 text-sm text-on-surface-variant">
                                {filtered.length > 0
                                    ? `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} para "${search}"`
                                    : `Sin resultados para "${search}"`}
                            </p>
                        )}

                        {search.trim() === '' && (
                            <div className="mb-8">
                                <h2 className="text-xl font-extrabold text-on-surface">
                                    {
                                        categories.find(
                                            (c) => c.id === activeCategory,
                                        )?.label
                                    }
                                </h2>
                                <p className="mt-1 text-sm text-on-surface-variant">
                                    Preguntas frecuentes sobre{' '}
                                    {categories
                                        .find((c) => c.id === activeCategory)
                                        ?.label.toLowerCase()}
                                </p>
                            </div>
                        )}

                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-outline-variant bg-white py-20 text-center">
                                <span
                                    className="material-symbols-outlined mb-4 text-5xl text-outline"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    search_off
                                </span>
                                <h3 className="mb-2 font-bold text-on-surface">
                                    No encontramos resultados
                                </h3>
                                <p className="max-w-xs text-sm text-on-surface-variant">
                                    Intenta con otras palabras o escríbenos
                                    directamente y te ayudamos.
                                </p>
                                <Link
                                    href="/contacto"
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-on-primary transition-all hover:bg-primary-container hover:text-on-primary"
                                >
                                    Contactar soporte
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {filtered.map((faq, index) => {
                                    const key = `${faq.category}-${index}`;
                                    const isOpen = openQuestion === key;
                                    return (
                                        <div
                                            key={key}
                                            className="overflow-hidden rounded-2xl border border-outline-variant bg-white transition-shadow duration-200 hover:shadow-sm"
                                        >
                                            <button
                                                onClick={() =>
                                                    setOpenQuestion(
                                                        isOpen ? null : key,
                                                    )
                                                }
                                                className="flex w-full items-center gap-4 px-7 py-5 text-left transition-colors duration-150 hover:bg-surface-container"
                                            >
                                                <span
                                                    className="material-symbols-outlined shrink-0 text-xl text-primary"
                                                    style={{
                                                        fontVariationSettings:
                                                            "'FILL' 1",
                                                    }}
                                                >
                                                    help
                                                </span>
                                                <span className="flex-1 font-bold text-on-surface">
                                                    {faq.question}
                                                </span>
                                                <span
                                                    className="material-symbols-outlined shrink-0 text-xl text-outline transition-transform duration-300"
                                                    style={{
                                                        transform: isOpen
                                                            ? 'rotate(180deg)'
                                                            : 'rotate(0deg)',
                                                    }}
                                                >
                                                    expand_more
                                                </span>
                                            </button>
                                            <div
                                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                                style={{
                                                    maxHeight: isOpen
                                                        ? '400px'
                                                        : '0px',
                                                }}
                                            >
                                                <p className="border-t border-outline-variant/50 px-7 py-6 leading-relaxed text-on-surface-variant">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </EcommerceLayout>
    );
}
