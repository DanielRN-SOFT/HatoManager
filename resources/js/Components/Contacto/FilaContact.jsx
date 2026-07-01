const FilaContact = ({ contact, index, setModalDetalle, setModalEliminar }) => {
    return (
        <tr className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50">
            {/* # */}
            <td className="px-4 py-3 text-xs tabular-nums text-gray-400">
                {index}
            </td>

            {/* Nombre */}
            <td
                className="px-4 py-3 text-sm font-medium text-gray-800"
                onClick={() => setModalDetalle(contact)}
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                        {contact.name?.[0]?.toUpperCase()}
                    </div>
                    {contact.name}
                </div>
            </td>

            {/* Email */}
            <td
                className="px-4 py-3 text-sm text-gray-500"
                onClick={() => setModalDetalle(contact)}
            >
                {contact.email}
            </td>

            {/* Teléfono */}
            <td
                className="px-4 py-3 text-sm tabular-nums text-gray-500"
                onClick={() => setModalDetalle(contact)}
            >
                {contact.phone ?? <span className="text-gray-300">—</span>}
            </td>

            {/* Tema */}
            <td className="px-4 py-3" onClick={() => setModalDetalle(contact)}>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                    {contact.topic}
                </span>
            </td>

            {/* Fecha */}
            <td
                className="px-4 py-3 text-sm tabular-nums text-gray-400"
                onClick={() => setModalDetalle(contact)}
            >
                {contact.created_at}
            </td>

            {/* Acciones */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    <ActionBtn
                        icon="visibility"
                        label="Ver mensaje"
                        onClick={() => setModalDetalle(contact)}
                        cls="hover:text-blue-500"
                    />
                    <ActionBtn
                        icon="delete"
                        label="Eliminar"
                        onClick={() => setModalEliminar(contact)}
                        cls="hover:text-red-500"
                    />
                </div>
            </td>
        </tr>
    );
};

const ActionBtn = ({ icon, label, onClick, cls }) => (
    <button
        onClick={onClick}
        title={label}
        className="rounded p-1.5 text-gray-400 transition-all active:scale-90"
    >
        <span className={`material-symbols-outlined text-[18px] ${cls}`}>
            {icon}
        </span>
    </button>
);

export default FilaContact;
