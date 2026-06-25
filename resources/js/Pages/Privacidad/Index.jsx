import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const sections = [
    {
        id: '01',
        title: 'Responsable del tratamiento',
        icon: 'business',
        content:
            'HatoManager SAS, identificada con NIT 901.234.567-8, con domicilio en Calle 10 # 43E-31, El Poblado, Medellín, Antioquia, Colombia, es la empresa responsable del tratamiento de sus datos personales. Para cualquier consulta relacionada con esta política puede contactarnos a través de privacidad@hatomanager.co o llamando al +57 (604) 123 4567 en horario hábil.',
    },
    {
        id: '02',
        title: 'Datos que recopilamos',
        icon: 'database',
        content:
            'Recopilamos datos que usted nos suministra directamente al registrarse o usar la plataforma: nombre completo, número de identificación, correo electrónico, número de teléfono, dirección de entrega y datos de ubicación de la finca o predio. Adicionalmente, recopilamos datos de uso de la plataforma como páginas visitadas, animales consultados, historial de compras y preferencias de búsqueda, así como datos técnicos como dirección IP, tipo de dispositivo y navegador.',
    },
    {
        id: '03',
        title: 'Finalidad del tratamiento',
        icon: 'target',
        content:
            'Sus datos personales son utilizados exclusivamente para: gestionar su cuenta y autenticar su identidad, procesar y hacer seguimiento a sus transacciones de compra o venta de ganado, enviarle notificaciones sobre el estado de sus pedidos, informarle sobre nuevos animales disponibles según sus preferencias, cumplir con obligaciones legales y tributarias, mejorar la experiencia de uso de la plataforma y prevenir fraudes o actividades ilícitas.',
    },
    {
        id: '04',
        title: 'Base legal del tratamiento',
        icon: 'balance',
        content:
            'El tratamiento de sus datos se fundamenta en las siguientes bases legales conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013: el consentimiento expreso que usted otorga al momento de registrarse en la plataforma, la ejecución del contrato de compraventa o prestación del servicio que usted solicita, el cumplimiento de obligaciones legales aplicables a HatoManager como plataforma comercial, y el interés legítimo de HatoManager en mejorar sus servicios y prevenir el fraude.',
    },
    {
        id: '05',
        title: 'Compartición de datos con terceros',
        icon: 'share',
        content:
            'HatoManager no vende ni arrienda sus datos personales a terceros. Compartimos información únicamente en los siguientes casos: con compradores o vendedores involucrados en una transacción, en la medida estrictamente necesaria para completarla; con pasarelas de pago certificadas para procesar transacciones de forma segura; con proveedores de tecnología que nos ayudan a operar la plataforma bajo estrictos acuerdos de confidencialidad; y con autoridades competentes cuando exista obligación legal de hacerlo.',
    },
    {
        id: '06',
        title: 'Transferencias internacionales',
        icon: 'public',
        content:
            'Algunos de nuestros proveedores tecnológicos pueden estar ubicados fuera de Colombia. En estos casos, HatoManager garantiza que dichas transferencias se realizan únicamente hacia países con niveles adecuados de protección de datos o bajo acuerdos contractuales que garanticen estándares equivalentes a los exigidos por la legislación colombiana. Puede solicitar información sobre estas transferencias escribiendo a privacidad@hatomanager.co.',
    },
    {
        id: '07',
        title: 'Conservación de los datos',
        icon: 'history',
        content:
            'Sus datos personales se conservan durante el tiempo que su cuenta permanezca activa en HatoManager y por el período adicional que exijan las obligaciones legales y tributarias aplicables, que en Colombia puede ser de hasta 10 años para documentos contables. Una vez cumplido ese plazo, sus datos serán eliminados de forma segura o anonimizados para fines estadísticos. Los datos de transacciones específicas se conservan por el tiempo requerido para resolver posibles disputas.',
    },
    {
        id: '08',
        title: 'Seguridad de la información',
        icon: 'security',
        content:
            'HatoManager implementa medidas técnicas, administrativas y físicas para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o divulgación indebida. Estas medidas incluyen cifrado en tránsito y en reposo mediante protocolos estándar de la industria, control de acceso basado en roles para el personal interno, monitoreo continuo de actividad sospechosa y revisiones periódicas de seguridad. Sin embargo, ningún sistema es completamente infalible y le recomendamos mantener sus credenciales seguras.',
    },
    {
        id: '09',
        title: 'Cookies y tecnologías de seguimiento',
        icon: 'cookie',
        content:
            'Utilizamos cookies propias y de terceros para garantizar el funcionamiento correcto de la plataforma, recordar sus preferencias, analizar el uso del sitio y personalizar su experiencia. Las cookies estrictamente necesarias no pueden desactivarse. Las cookies analíticas y de personalización pueden gestionarse desde la configuración de su navegador. Al continuar usando la plataforma sin modificar la configuración de cookies, usted acepta su uso conforme a esta política.',
    },
    {
        id: '10',
        title: 'Sus derechos como titular',
        icon: 'verified_user',
        content:
            'De acuerdo con la Ley 1581 de 2012, usted tiene derecho a: conocer, actualizar y rectificar sus datos personales; solicitar prueba de la autorización otorgada para el tratamiento; ser informado sobre el uso que se ha dado a sus datos; presentar quejas ante la Superintendencia de Industria y Comercio; revocar la autorización y solicitar la supresión de sus datos cuando proceda; y acceder gratuitamente a sus datos personales. Para ejercer estos derechos escríbanos a privacidad@hatomanager.co.',
    },
    {
        id: '11',
        title: 'Datos de menores de edad',
        icon: 'child_care',
        content:
            'HatoManager no recopila deliberadamente datos personales de personas menores de 18 años. Nuestros servicios están dirigidos exclusivamente a personas mayores de edad con capacidad legal para celebrar contratos comerciales. Si tenemos conocimiento de que hemos recopilado datos de un menor sin el consentimiento verificable de sus padres o tutores, procederemos a eliminar dicha información de inmediato. Si usted es padre o tutor y cree que su hijo nos ha proporcionado datos, contáctenos.',
    },
    {
        id: '12',
        title: 'Cambios a esta política',
        icon: 'edit_document',
        content:
            'HatoManager puede actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas, en la legislación aplicable o en los servicios ofrecidos. Le notificaremos cualquier cambio material mediante un aviso visible en la plataforma y un correo electrónico a la dirección registrada, con al menos 10 días de anticipación a su entrada en vigencia. La fecha de la última actualización siempre estará visible al inicio de este documento.',
    },
    {
        id: '13',
        title: 'Contacto y reclamaciones',
        icon: 'contact_support',
        content:
            'Para ejercer sus derechos, presentar consultas o reclamaciones relacionadas con el tratamiento de sus datos personales, puede contactarnos por correo electrónico a privacidad@hatomanager.co, por teléfono al +57 (604) 123 4567 en horario de lunes a viernes de 8 am a 6 pm, o de forma presencial en nuestra oficina en Calle 10 # 43E-31, El Poblado, Medellín. Atenderemos su solicitud en un plazo máximo de 15 días hábiles conforme a la ley.',
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

export default function Privacidad() {
    const [openId, setOpenId] = useState('01');

    function toggle(id) {
        setOpenId((prev) => (prev === id ? null : id));
    }

    return (
        <EcommerceLayout>
            <Head title="Política de Privacidad — HatoManager" />

            {/* Hero */}
            <section className="relative flex h-[300px] items-end overflow-hidden pb-14">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/ganado-hero.png"
                        alt="Política de privacidad HatoManager"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                        Legal
                    </p>
                    <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                        Política de Privacidad
                    </h1>
                </div>
            </section>

            {/* Banner */}
            <div className="bg-primary-container text-on-primary-container">
                <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-8 py-5">
                    <span
                        className="material-symbols-outlined shrink-0 text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        shield
                    </span>
                    <p className="text-sm leading-relaxed">
                        Última actualización:{' '}
                        <strong>25 de junio de 2026.</strong> En HatoManager
                        protegemos tus datos conforme a la{' '}
                        <strong>Ley 1581 de 2012</strong> y el{' '}
                        <strong>Decreto 1377 de 2013</strong> de Colombia.
                    </p>
                </div>
            </div>

            {/* Resumen visual */}
            <div className="border-b border-outline-variant bg-surface-container">
                <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-0 px-8 py-8 sm:grid-cols-4">
                    {[
                        { icon: 'lock', label: 'Datos cifrados' },
                        { icon: 'block', label: 'No vendemos tu información' },
                        {
                            icon: 'verified_user',
                            label: 'Tus derechos primero',
                        },
                        { icon: 'support_agent', label: 'Soporte dedicado' },
                    ].map(({ icon, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-2 border-r border-outline-variant px-6 py-2 text-center last:border-r-0"
                        >
                            <span
                                className="material-symbols-outlined text-3xl text-primary"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                {icon}
                            </span>
                            <span className="text-xs font-semibold text-on-surface-variant">
                                {label}
                            </span>
                        </div>
                    ))}
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
                                shield
                            </span>
                            <h3 className="mb-2 font-bold">
                                ¿Quieres ejercer tus derechos sobre tus datos?
                            </h3>
                            <p className="mb-5 text-sm text-on-primary/80">
                                Escríbenos a privacidad@hatomanager.co y te
                                atendemos en máximo 15 días hábiles.
                            </p>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary-container"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    mail
                                </span>
                                Contactar privacidad
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </EcommerceLayout>
    );
}
