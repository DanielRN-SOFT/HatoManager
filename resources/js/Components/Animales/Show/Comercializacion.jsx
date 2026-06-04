import SectionCard from "./SectionCard";

const Comercializacion = ({animal, fmt, statusInfo}) => {
    return (
        <SectionCard
            icon="storefront"
            title="Comercialización"
            accent="border-primary"
        >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        Valor estimado
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                        {animal.price
                            ? `$${parseFloat(animal.price).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
                            : '—'}
                    </p>
                    <p className="text-[11px] text-gray-400">COP</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        Precio / kg
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                        {animal.price_weight
                            ? `$${parseFloat(animal.price_weight).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`
                            : '—'}
                    </p>
                    <p className="text-[11px] text-gray-400">COP/kg</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        Publicación
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                        {fmt(animal.publication_date)}
                    </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        Estado
                    </p>
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusInfo.cls}`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`}
                        />
                        {animal.status}
                    </span>
                </div>
            </div>
            {(animal.status === 'Vendido' || animal.status === 'Reservado') && (
                <div className="mt-4 rounded-xl border border-purple-100 bg-purple-50 p-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-purple-500">
                            info
                        </span>
                        <p className="text-sm text-purple-700">
                            Este animal figura como{' '}
                            <strong>{animal.status}</strong>. Revisa el módulo
                            de ventas para más detalles de la transacción.
                        </p>
                    </div>
                </div>
            )}
        </SectionCard>
    );
};

export default Comercializacion;
