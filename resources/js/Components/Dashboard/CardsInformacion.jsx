import formatearDinero from "@/helpers/formatearDinero";
import SummaryCard from "./SummaryCard";
import { router } from "@inertiajs/react";

const CardsInformacion = ({kpis, totalAlertasVenta}) => {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <SummaryCard
                icon="scale"
                iconCls="text-secondary"
                accent="border-secondary"
                title="Hato total"
                value={kpis.total ?? 0}
                sub={`Peso prom. ${kpis.peso_promedio ?? 0} kg`}
            />
            <SummaryCard
                icon="vaccines"
                iconCls="text-green-600"
                accent="border-green-500"
                title="Vacunas al día"
                value={kpis.vacunas_al_dia ?? 0}
                sub={`${kpis.vacunas_pendientes ?? 0} con próxima vencida`}
            />
            <SummaryCard
                icon="payments"
                iconCls="text-primary"
                accent="border-primary"
                title="Ingresos ventas"
                value={formatearDinero(kpis.ventas_confirmadas)}
                sub={`${kpis.ventas_total ?? 0} ventas en total`}
                valueSmall
            />
            <SummaryCard
                icon="pending_actions"
                iconCls="text-amber-500"
                accent="border-amber-400"
                title="Órdenes pendientes"
                value={kpis.ordenes_pendientes ?? 0}
                sub={`${kpis.ordenes_confirmadas ?? 0} confirmadas`}
                onClick={() => router.visit(route('sales.index'))}
                badge={totalAlertasVenta > 0 ? totalAlertasVenta : null}
            />
        </div>
    );
};

export default CardsInformacion;
