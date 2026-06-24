import ToastEcommerce from '@/Components/ToastEcommerce';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const contactInfo = [
    {
        icon: 'location_on',
        title: 'Dirección',
        lines: [
            'Calle 10 # 43E-31, El Poblado',
            'Cartago, Valle del Cauca, Colombia',
        ],
    },
    {
        icon: 'mail',
        title: 'Correo',
        lines: ['contacto@hatomanager.co', 'soporte@hatomanager.co'],
    },
    {
        icon: 'phone',
        title: 'Teléfono',
        lines: ['+57 (604) 123 4567', 'Lun – Vie, 8 am – 6 pm'],
    },
];

const topics = [
    'Compra de ganado',
    'Venta / publicar un animal',
    'Problema con mi cuenta',
    'Certificados y documentos',
    'Facturación',
    'Otro',
];

export default function Contacto() {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        topic: '',
        message: '',
    });
    const [toast, setToast] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        setData(e.target.name, e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                setToast({
                    type: 'success',
                    message: 'Mensaje enviado correctamente',
                });
            },
        });
    }

    return (
        <EcommerceLayout>
            <Head title="Contacto — HatoManager" />

            {toast && (
                <ToastEcommerce
                    toast={toast}
                    onDismiss={() => setToast(null)}
                />
            )}

            {/* ── Hero ── */}
            <section className="relative flex h-[400px] items-end overflow-hidden pb-14">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/contact.jpg"
                        alt="Contacto HatoManager"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-4 py-1.5">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="whitespace-nowrap text-xs font-medium uppercase tracking-widest text-primary">
                            Estamos para ayudarte
                        </span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                        Contáctanos
                    </h1>
                </div>
            </section>

            {/* ── Main ── */}
            <section className="mx-auto max-w-[1440px] px-8 py-20">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                    {/* Info lateral */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="mb-2 text-xl font-extrabold text-on-surface">
                                ¿En qué podemos ayudarte?
                            </h2>
                            <p className="text-sm leading-relaxed text-on-surface-variant">
                                Escríbenos por el formulario o usa cualquiera de
                                nuestros canales. Nuestro equipo responde en el
                                menor tiempo posible.
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            {contactInfo.map(({ icon, title, lines }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-4"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                                        <span
                                            className="material-symbols-outlined text-xl"
                                            style={{
                                                fontVariationSettings:
                                                    "'FILL' 1",
                                            }}
                                        >
                                            {icon}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                                            {title}
                                        </p>
                                        {lines.map((line) => (
                                            <p
                                                key={line}
                                                className="text-sm text-on-surface-variant"
                                            >
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Horario */}
                        <div className="rounded-2xl border border-outline-variant bg-surface-container p-6">
                            <p className="mb-4 flex items-center gap-2 text-sm font-bold text-on-surface">
                                <span
                                    className="material-symbols-outlined text-base text-primary"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    schedule
                                </span>
                                Horario de atención
                            </p>
                            <div className="flex flex-col gap-1.5 text-sm text-on-surface-variant">
                                <div className="flex justify-between">
                                    <span>Lunes – Viernes</span>
                                    <span className="font-medium text-on-surface">
                                        8:00 am – 6:00 pm
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sábados</span>
                                    <span className="font-medium text-on-surface">
                                        9:00 am – 1:00 pm
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Domingos</span>
                                    <span className="font-medium text-on-surface">
                                        Cerrado
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        {submitted ? (
                            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-outline-variant bg-white px-12 py-20 text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-container">
                                    <span
                                        className="material-symbols-outlined text-5xl text-white"
                                        style={{
                                            fontVariationSettings: "'FILL' 1",
                                        }}
                                    >
                                        mark_email_read
                                    </span>
                                </div>
                                <h3 className="mb-3 text-2xl font-extrabold text-on-surface">
                                    Mensaje enviado
                                </h3>
                                <p className="max-w-sm text-on-surface-variant">
                                    Gracias por escribirnos,{' '}
                                    <span className="font-semibold text-on-surface">
                                        {data.name}
                                    </span>
                                    . Te responderemos a{' '}
                                    <span className="font-semibold text-on-surface">
                                        {data.email}
                                    </span>{' '}
                                    en menos de 24 horas hábiles.
                                </p>
                                <button
                                    onClick={() => {
                                        reset();
                                        setData({});
                                        setSubmitted(false);
                                    }}
                                    className="mt-8 rounded-xl border border-outline-variant px-6 py-3 text-sm font-semibold text-on-surface transition-all hover:bg-surface-container"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-outline-variant bg-white p-10">
                                <h2 className="mb-8 text-xl font-extrabold text-on-surface">
                                    Envíanos un mensaje
                                </h2>
                                <div className="flex flex-col gap-5">
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                                Nombre completo *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                onChange={handleChange}
                                                placeholder="Tu nombre"
                                                required
                                                className="rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                                Correo electrónico *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                placeholder="correo@ejemplo.com"
                                                required
                                                className="rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={data.phone}
                                                onChange={handleChange}
                                                placeholder="+57 300 000 0000"
                                                className="rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                                Asunto *
                                            </label>
                                            <select
                                                name="topic"
                                                value={data.topic}
                                                onChange={handleChange}
                                                required
                                                className="rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            >
                                                <option value="" disabled>
                                                    Selecciona un tema
                                                </option>
                                                {topics.map((t) => (
                                                    <option key={t} value={t}>
                                                        {t}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                                            Mensaje *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={data.message}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Cuéntanos en qué podemos ayudarte..."
                                            required
                                            className="resize-none rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        />
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={
                                            !data.name ||
                                            !data.email ||
                                            !data.topic ||
                                            !data.message ||
                                            processing
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-on-primary shadow-sm shadow-primary/20 transition-all duration-150 hover:bg-primary-container hover:text-on-primary active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            send
                                        </span>
                                        {processing
                                            ? 'Enviando...'
                                            : 'Enviar mensaje'}
                                    </button>

                                    <p className="text-center text-xs text-on-surface-variant">
                                        Respondemos en menos de 24 horas
                                        hábiles. Tu información es confidencial.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </EcommerceLayout>
    );
}
