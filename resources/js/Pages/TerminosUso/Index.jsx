import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const sections = [
    {
        id: '01',
        title: 'Aceptación de los términos',
        icon: 'handshake',
        content:
            'Al acceder y utilizar la plataforma HatoManager, usted acepta quedar vinculado por estos Términos de Uso. Si no está de acuerdo con alguna de las condiciones aquí descritas, le pedimos que se abstenga de usar nuestros servicios. El uso continuado de la plataforma constituye aceptación plena de estos términos y cualquier actualización futura.',
    },
    {
        id: '02',
        title: 'Descripción del servicio',
        icon: 'storefront',
        content:
            'HatoManager es una plataforma de comercio electrónico especializada en la compraventa de ganado bovino en Colombia. Actuamos como intermediario tecnológico entre ganaderos y compradores, facilitando la publicación de animales, la gestión de transacciones y el seguimiento de trazabilidad. HatoManager no es propietario del ganado publicado ni asume responsabilidad por el estado físico de los animales más allá de lo certificado en la plataforma.',
    },
    {
        id: '03',
        title: 'Registro y cuentas de usuario',
        icon: 'manage_accounts',
        content:
            'Para acceder a las funcionalidades de compra o venta debe crear una cuenta con información veraz, completa y actualizada. Usted es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades realizadas bajo su cuenta. HatoManager se reserva el derecho de suspender o eliminar cuentas que proporcionen información falsa, realicen actividades fraudulentas o incumplan estos términos.',
    },
    {
        id: '04',
        title: 'Publicación de animales',
        icon: 'pets',
        content:
            'Los vendedores que publiquen animales en la plataforma garantizan que son propietarios legítimos o están autorizados para vender el animal, que la información publicada incluyendo raza, peso, edad y estado sanitario es verídica y verificable, y que los certificados sanitarios adjuntos están vigentes y expedidos por entidades competentes. HatoManager podrá retirar cualquier publicación que incumpla estas condiciones sin previo aviso.',
    },
    {
        id: '05',
        title: 'Proceso de compra y pagos',
        icon: 'payments',
        content:
            'Al agregar un animal al carrito y completar el proceso de pago, el comprador formaliza una oferta de compra vinculante. El precio publicado incluye el valor del animal pero puede estar sujeto a costos adicionales de transporte, inspección o documentación según lo acordado entre las partes. Los pagos se procesan a través de pasarelas seguras certificadas. HatoManager no almacena datos de tarjetas de crédito o débito.',
    },
    {
        id: '06',
        title: 'Garantías sanitarias y trazabilidad',
        icon: 'health_and_safety',
        content:
            'Cada animal comercializado a través de HatoManager debe contar con certificado de sanidad animal vigente expedido por un médico veterinario habilitado. La plataforma lleva registro del historial de pesos y eventos sanitarios de cada animal. HatoManager no se responsabiliza por enfermedades o condiciones que se manifiesten con posterioridad a la entrega y que no hayan sido detectables al momento de la publicación.',
    },
    {
        id: '07',
        title: 'Cancelaciones y devoluciones',
        icon: 'assignment_return',
        content:
            'Las cancelaciones de compra podrán realizarse dentro de las 24 horas siguientes a la confirmación del pedido, siempre que el animal no haya iniciado proceso de traslado. Pasado este plazo, la cancelación quedará sujeta a negociación directa entre comprador y vendedor con mediación de HatoManager. No se aceptan devoluciones de animales vivos salvo en casos de incumplimiento grave debidamente demostrado.',
    },
    {
        id: '08',
        title: 'Conducta prohibida',
        icon: 'block',
        content:
            'Está estrictamente prohibido en la plataforma: publicar animales con documentación falsa o adulterada, realizar transacciones fuera de la plataforma para evadir comisiones, usar la información de otros usuarios con fines distintos a la transacción pactada, publicar contenido ofensivo o engañoso, e intentar acceder de forma no autorizada a sistemas o cuentas ajenas. El incumplimiento podrá dar lugar a suspensión inmediata y acciones legales.',
    },
    {
        id: '09',
        title: 'Propiedad intelectual',
        icon: 'copyright',
        content:
            'Todo el contenido de HatoManager incluyendo marca, logotipos, diseño, código fuente, textos e imágenes propias es propiedad exclusiva de HatoManager SAS y está protegido por la legislación colombiana e internacional de propiedad intelectual. Al publicar contenido en la plataforma, el vendedor otorga a HatoManager una licencia no exclusiva para usarlo con fines de operación y promoción del servicio.',
    },
    {
        id: '10',
        title: 'Privacidad y datos',
        icon: 'lock',
        content:
            'El tratamiento de sus datos personales se rige por nuestra Política de Privacidad disponible en la plataforma. Al registrarse, usted autoriza a HatoManager a recopilar y usar sus datos para la prestación del servicio y mejora de la plataforma. HatoManager no vende ni cede datos personales a terceros sin consentimiento expreso, salvo obligación legal. Los datos se almacenan con cifrado conforme a la Ley 1581 de 2012.',
    },
    {
        id: '11',
        title: 'Limitación de responsabilidad',
        icon: 'policy',
        content:
            'HatoManager actúa como plataforma tecnológica intermediaria. En ningún caso será responsable por pérdidas económicas derivadas de transacciones entre usuarios, daños al ganado durante el transporte, incumplimiento de acuerdos privados entre comprador y vendedor, o interrupciones del servicio por causas de fuerza mayor. La responsabilidad máxima de HatoManager no superará el valor de la comisión cobrada en la transacción objeto de la disputa.',
    },
    {
        id: '12',
        title: 'Modificaciones a los términos',
        icon: 'edit_document',
        content:
            'HatoManager se reserva el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios serán notificados a los usuarios registrados mediante correo electrónico y aviso en la plataforma con al menos 10 días de anticipación. El uso continuado de la plataforma tras la entrada en vigencia de los cambios implica la aceptación de los nuevos términos.',
    },
    {
        id: '13',
        title: 'Ley aplicable y jurisdicción',
        icon: 'gavel',
        content:
            'Estos Términos de Uso se rigen por las leyes de la República de Colombia. Cualquier controversia será sometida a los jueces y tribunales competentes de la ciudad de Medellín, Antioquia. Antes de acudir a instancias judiciales, las partes se comprometen a intentar una solución amigable a través de los mecanismos de mediación disponibles en HatoManager.',
    },
];

function AccordionItem({ section, isOpen, onToggle }) {
    return (
        <div
            id={`seccion-${section.id}`}
            className="scroll-mt-6 overflow-hidden rounded-2xl border border-outline-variant bg-white transition-shadow duration-200 hover:shadow-sm"
        >
            <button
                onClick={onToggle}
                className="flex w-full items-center gap-4 px-7 py-5 text-left transition-colors duration-150 hover:bg-surface-container"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-container">
                    <span
                        className="material-symbols-outlined text-xl text-white"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        {section.icon}
                    </span>
                </div>
                <div className="flex flex-1 items-center gap-3">
                    <span className="text-xs font-bold text-outline">
                        {section.id}
                    </span>
                    <span className="font-bold text-on-surface">
                        {section.title}
                    </span>
                </div>
                <span
                    className="material-symbols-outlined shrink-0 text-xl text-outline transition-transform duration-300"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                >
                    expand_more
                </span>
            </button>

            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? '500px' : '0px' }}
            >
                <p className="border-t border-outline-variant/50 px-7 py-6 leading-relaxed text-on-surface-variant">
                    {section.content}
                </p>
            </div>
        </div>
    );
}

export default function TerminosUso() {
    const [openId, setOpenId] = useState('01');

    function toggle(id) {
        setOpenId((prev) => (prev === id ? null : id));
    }

    return (
        <EcommerceLayout>
            <Head title="Términos de Uso — HatoManager" />

            {/* Hero */}
            <section className="relative flex h-[350px] items-end overflow-hidden pb-14">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/ganado-hero.png"
                        alt="Términos de uso HatoManager"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-4 py-1.5">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="whitespace-nowrap text-xs font-medium uppercase tracking-widest text-primary">
                            Legal
                        </span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                        Términos de Uso
                    </h1>
                    <p className="mt-3 text-sm text-white/80">
                        Detalles de a tomar en cuenta en HatoManger
                    </p>
                </div>
            </section>

            {/* Banner */}
            <div className="bg-primary-container text-on-primary-container">
                <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-8 py-5">
                    <span
                        className="material-symbols-outlined shrink-0 text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        info
                    </span>
                    <p className="text-sm leading-relaxed">
                        Última actualización:{' '}
                        <strong>25 de junio de 2026.</strong> Al usar
                        HatoManager, aceptas las condiciones descritas en este
                        documento. Te recomendamos leerlo completo antes de
                        realizar cualquier transacción.
                    </p>
                </div>
            </div>

            {/* Contenido */}
            <section className="mx-auto max-w-[1440px] px-8 py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Índice sticky */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-8 rounded-2xl border border-outline-variant bg-surface-container p-6">
                            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                                Secciones
                            </p>
                            <nav className="flex flex-col gap-0.5">
                                {sections.map(({ id, title, icon }) => (
                                    <button
                                        key={id}
                                        onClick={() => {
                                            setOpenId(id);
                                            document
                                                .getElementById(`seccion-${id}`)
                                                ?.scrollIntoView({
                                                    behavior: 'smooth',
                                                    block: 'start',
                                                });
                                        }}
                                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                                            openId === id
                                                ? 'bg-primary font-semibold text-on-primary'
                                                : 'text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container'
                                        }`}
                                    >
                                        <span
                                            className="material-symbols-outlined shrink-0 text-base"
                                            style={{
                                                fontVariationSettings:
                                                    "'FILL' 1",
                                            }}
                                        >
                                            {icon}
                                        </span>
                                        <span className="leading-snug">
                                            {title}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Acordeón */}
                    <div className="flex flex-col gap-3 lg:col-span-3">
                        {sections.map((section) => (
                            <AccordionItem
                                key={section.id}
                                section={section}
                                isOpen={openId === section.id}
                                onToggle={() => toggle(section.id)}
                            />
                        ))}

                        {/* Pie */}
                        <div className="mt-6 rounded-2xl bg-primary p-8 text-center text-on-primary">
                            <span
                                className="material-symbols-outlined mb-3 text-4xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                support_agent
                            </span>
                            <h3 className="mb-2 font-bold">
                                ¿Tienes preguntas sobre estos términos?
                            </h3>
                            <p className="mb-5 text-sm text-on-primary/80">
                                Nuestro equipo puede orientarte. Escríbenos y te
                                respondemos en menos de 24 horas hábiles.
                            </p>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-inverse-primary"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    mail
                                </span>
                                Contactar soporte
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </EcommerceLayout>
    );
}
