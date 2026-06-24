import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';
import { MdOutlineArrowForward } from 'react-icons/md';

const stats = [
    { value: '+5.000', label: 'Animales vendidos' },
    { value: '+300', label: 'Ganaderos activos' },
    { value: '12', label: 'Departamentos cubiertos' },
    { value: '98%', label: 'Clientes satisfechos' },
];

const values = [
    {
        icon: 'handshake',
        title: 'Confianza',
        desc: 'Cada transacción pasa por un proceso de verificación riguroso. Nunca conectamos compradores con ganaderos que no cumplan nuestros estándares.',
    },
    {
        icon: 'eco',
        title: 'Ganadería sostenible',
        desc: 'Promovemos prácticas responsables con el ambiente y el bienestar animal, apoyando a productores que cuidan la tierra y el hato.',
    },
    {
        icon: 'devices',
        title: 'Tecnología al campo',
        desc: 'Digitalizamos el comercio ganadero para que comprar y vender ganado sea tan sencillo como hacer un pedido en línea, desde cualquier lugar.',
    },
];

const team = [
    {
        name: 'Mateo Hoyos Hernandez',
        role: 'Co-fundador & CTO',
        initials: 'MH',
        bio: 'Tecnologo en Analisis y Desarrollo de Software apasionado por la construccion de aplicativos. Diseñó la plataforma de trazabilidad que da certeza a cada compra.',
    },
    {
        name: 'Daniel Ramirez Navarro',
        role: 'Co-fundador & CTO',
        initials: 'DR',
        bio: 'Tecnólogo en Analisis y Desarrollo de Software apasionado por el sector agro y el desarrollo de aplicativos. Diseño el dashboard del ganadero',
    },
];

export default function SobreNosotros() {
    return (
        <EcommerceLayout>
            <Head title="Sobre Nosotros — HatoManager" />

            {/* ── Hero ── */}
            <section className="relative flex h-[460px] items-end overflow-hidden pb-16">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/about-us.jpg"
                        alt="Ganadería colombiana"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-4 py-1.5">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="whitespace-nowrap text-xs font-medium uppercase tracking-widest text-primary">
                            ¿Quiénes somos?
                        </span>
                    </div>

                    <h1 className="max-w-2xl text-5xl font-extrabold leading-tight text-white md:text-6xl">
                        El mercado ganadero que Colombia necesitaba
                    </h1>
                </div>
            </section>

            {/* ── Mission ── */}
            <section className="mx-auto max-w-[1440px] px-8 py-20">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <div>
                        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                            Nuestra misión
                        </p>
                        <h2 className="mb-6 text-3xl font-extrabold leading-snug text-on-surface">
                            Conectamos el campo con el mercado, de forma directa
                            y confiable
                        </h2>
                        <p className="mb-4 leading-relaxed text-on-surface-variant">
                            HatoManager nació de una necesidad real: los
                            ganaderos colombianos perdían tiempo y dinero en
                            intermediarios, subastas presenciales y
                            transacciones sin garantías. Vimos la oportunidad de
                            cambiar eso.
                        </p>
                        <p className="leading-relaxed text-on-surface-variant">
                            Hoy somos la plataforma líder en compraventa de
                            ganado en línea en Colombia. Digitalizamos todo el
                            proceso —desde la publicación del animal hasta el
                            cierre del negocio— para que ganaderos y compradores
                            operen con seguridad, transparencia y eficiencia.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map(({ value, label }) => (
                            <div
                                key={label}
                                className="rounded-2xl border border-outline-variant bg-surface-container p-8 text-center"
                            >
                                <p className="mb-1 text-4xl font-extrabold text-primary">
                                    {value}
                                </p>
                                <p className="text-sm text-on-surface-variant">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="bg-primary-container py-20 text-on-primary-container">
                <div className="mx-auto max-w-[1440px] px-8">
                    <div className="mb-14 text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                            Lo que nos guía
                        </p>
                        <h2 className="text-3xl font-extrabold">
                            Nuestros valores
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                        {values.map(({ icon, title, desc }) => (
                            <div
                                key={title}
                                className="flex flex-col items-start"
                            >
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                                    <span
                                        className="material-symbols-outlined text-3xl"
                                        style={{
                                            fontVariationSettings: "'FILL' 1",
                                        }}
                                    >
                                        {icon}
                                    </span>
                                </div>
                                <h3 className="mb-2 font-bold">{title}</h3>
                                <p className="text-sm leading-relaxed text-on-primary-container/70">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team ── */}
            <section className="mx-auto max-w-[1440px] px-8 py-20">
                <div className="mb-14 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                        Las personas detrás
                    </p>
                    <h2 className="text-3xl font-extrabold text-on-surface">
                        Nuestro equipo
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    {team.map(({ name, role, initials, bio }) => (
                        <div
                            key={name}
                            className="rounded-2xl border border-outline-variant bg-white p-8"
                        >
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-on-primary">
                                {initials}
                            </div>
                            <h3 className="font-bold text-on-surface">
                                {name}
                            </h3>
                            <p className="mb-3 text-sm font-medium text-primary">
                                {role}
                            </p>
                            <p className="text-sm leading-relaxed text-on-surface-variant">
                                {bio}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="mx-auto max-w-[1440px] px-8 pb-24">
                <div className="overflow-hidden rounded-2xl bg-surface-container-highest p-12 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-primary">
                        ¿Listo para comprar o vender ganado?
                    </h2>
                    <p className="mx-auto mb-8 max-w-lg text-on-surface-variant">
                        Únete a los cientos de ganaderos y compradores que ya
                        confían en HatoManager para hacer negocios seguros y
                        transparentes.
                    </p>
                    <Link
                        href="/sales"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-on-primary transition-all hover:bg-primary-container"
                    >
                        Explorar Catálogo
                        <MdOutlineArrowForward className="text-2xl" />
                    </Link>
                </div>
            </section>
        </EcommerceLayout>
    );
}
