import { useState } from "react";
import SectionCard from "./SectionCard";
import HealthRow from "./HealthRow";

const HistorialSanitario = ({animal, fmt}) => {
      const vacunas = (animal.health_records ?? []).filter(
            (r) => r.type === 'vacuna',
        );
        const desparasitacion = (animal.health_records ?? []).filter(
            (r) => r.type === 'desparasitacion',
        );
        const otros = (animal.health_records ?? []).filter(
            (r) => !['vacuna', 'desparasitacion'].includes(r.type),
        );

        const [healthTab, setHealthTab] = useState('todos');

        const healthFiltered =
            healthTab === 'todos'
                ? (animal.health_records ?? [])
                : (animal.health_records ?? []).filter((r) => r.type === healthTab);
    return (
        <SectionCard
            icon="health_and_safety"
            title={`Historial sanitario · ${(animal.health_records ?? []).length} registros`}
            accent="border-tertiary"
            action={
                <div className="flex gap-1">
                    {[
                        { key: 'todos', label: 'Todos' },
                        {
                            key: 'vacuna',
                            label: `Vacunas (${vacunas.length})`,
                        },
                        {
                            key: 'desparasitacion',
                            label: `Despar. (${desparasitacion.length})`,
                        },
                        {
                            key: 'tratamiento',
                            label: `Otros (${otros.length})`,
                        },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setHealthTab(tab.key)}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                                healthTab === tab.key
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            }
        >
            {healthFiltered.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
                    <span className="material-symbols-outlined text-4xl">
                        health_and_safety
                    </span>
                    <p className="text-sm">Sin registros sanitarios</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {[...healthFiltered]
                        .sort(
                            (a, b) =>
                                new Date(b.applied_at) - new Date(a.applied_at),
                        )
                        .map((r) => (
                            <HealthRow fmt={fmt} key={r.id} record={r} />
                        ))}
                </div>
            )}
        </SectionCard>
    );
};

export default HistorialSanitario;
