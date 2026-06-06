import SectionCard from './SectionCard';

const ProyeccionVenta = ({ proyeccion, fmt }) => {
    if (!proyeccion) {
        return (
            <SectionCard
                icon="trending_up"
                title="Proyección de venta"
                accent="border-secondary"
            >
                <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
                    <span className="material-symbols-outlined text-4xl">
                        scale
                    </span>
                    <p className="text-sm">
                        Se requieren mínimo 2 pesajes para calcular la
                        proyección
                    </p>
                </div>
            </SectionCard>
        );
    }

    const {
        gdp,
        peso_actual,
        peso_objetivo,
        dias_restantes,
        fecha_estimada,
        utilidad_esperada,
        precio_por_kg,
    } = proyeccion;
    const progreso = Math.min(100, (peso_actual / peso_objetivo) * 100).toFixed(
        0,
    );

    return (
        <SectionCard
            icon="trending_up"
            title="Proyección de venta"
            accent="border-secondary"
        >
            {/* Barra de progreso */}
            <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs text-gray-500">
                    <span>{peso_actual} kg actuales</span>
                    <span>
                        {progreso}% del objetivo ({peso_objetivo} kg)
                    </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${progreso}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        GDP
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                        {gdp} kg/día
                    </p>
                    <p className="text-[11px] text-gray-400">Ganancia diaria</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        Días restantes
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                        {dias_restantes} días
                    </p>
                    <p className="text-[11px] text-gray-400">
                        Para alcanzar objetivo
                    </p>
                </div>
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-blue-400">
                        Fecha estimada
                    </p>
                    <p className="text-sm font-bold text-blue-800">
                        {fmt(fecha_estimada)}
                    </p>
                    <p className="text-[11px] text-blue-400">
                        Fecha proyectada de venta
                    </p>
                </div>
                <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-green-400">
                        Utilidad esperada
                    </p>
                    <p className="text-sm font-bold text-green-800">
                        $
                        {parseFloat(utilidad_esperada).toLocaleString('es-CO', {
                            maximumFractionDigits: 0,
                        })}
                    </p>
                    <p className="text-[11px] text-green-400">
                        {peso_objetivo} kg × $
                        {parseFloat(precio_por_kg).toLocaleString('es-CO')}/kg
                    </p>
                </div>
            </div>
        </SectionCard>
    );
};

export default ProyeccionVenta;
