const ModalDetalleContact = ({ contact, onClose, onEliminar }) => {
    if (!contact) return null;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary">
                        {contact.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-gray-800">
                            {contact.name}
                        </h2>
                        <p className="text-xs text-gray-400">
                            {contact.created_at}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>

            {/* Datos de contacto */}
            <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <InfoRow icon="email" label="Email">
                    <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-primary hover:underline"
                    >
                        {contact.email}
                    </a>
                </InfoRow>

                <InfoRow icon="phone" label="Teléfono">
                    {contact.phone ? (
                        <a
                            href={`tel:${contact.phone}`}
                            className="text-sm text-primary hover:underline"
                        >
                            {contact.phone}
                        </a>
                    ) : (
                        <span className="text-sm text-gray-400">
                            No proporcionado
                        </span>
                    )}
                </InfoRow>

                <InfoRow icon="topic" label="Tema" className="sm:col-span-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {contact.topic}
                    </span>
                </InfoRow>
            </div>

            {/* Mensaje */}
            <div className="mb-6">
                <label className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    <span className="material-symbols-outlined text-[13px] text-primary">
                        message
                    </span>
                    Mensaje
                </label>
                <div className="whitespace-pre-wrap rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-700">
                    {contact.message}
                </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-between">
                <button
                    onClick={onEliminar}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                    <span className="material-symbols-outlined text-[16px]">
                        delete
                    </span>
                    Eliminar mensaje
                </button>

                <div className="flex gap-2">
                    <a
                        href={`mailto:${contact.email}?subject=Re: ${contact.topic}`}
                        className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            reply
                        </span>
                        Responder
                    </a>
                    <button
                        onClick={onClose}
                        className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, children, className = '' }) => (
    <div className={`flex items-start gap-2 ${className}`}>
        <span className="material-symbols-outlined mt-0.5 text-[15px] text-primary">
            {icon}
        </span>
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </p>
            {children}
        </div>
    </div>
);

export default ModalDetalleContact;
