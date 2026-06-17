import InviteForm from './InviteForm';
import PendingBadge from './PendingBadge';
import VetRow from './VetRow';

export default function VetFarmCard({ farm }) {
    const hasVets = (farm.veterinarios?.length ?? 0) > 0;
    const hasPending = (farm.veterinarian_invitations?.length ?? 0) > 0;

    return (
        <div className="overflow-hidden rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div>
                    <h3 className="font-semibold text-gray-800">{farm.name}</h3>
                    <p className="mt-0.5 text-xs text-gray-500">
                        {farm.city}, {farm.department}
                    </p>
                </div>
                <span
                    className="material-symbols-outlined text-gray-300"
                    style={{ fontSize: 24 }}
                >
                    agriculture
                </span>
            </div>

            {/* Tabla de veterinarios */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-secondary text-xs font-semibold uppercase tracking-wide text-white">
                            <th className="px-6 py-3">Veterinario</th>
                            <th className="px-6 py-3">Correo</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasVets ? (
                            farm.veterinarios.map((vet) => (
                                <VetRow key={vet.id} vet={vet} farm={farm} />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="py-8 text-center text-sm text-gray-400"
                                >
                                    Sin veterinarios vinculados aún.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Invitaciones pendientes */}
            {hasPending && (
                <div className="border-t border-gray-100 px-6 py-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Invitaciones pendientes
                    </p>
                    <div className="flex flex-col gap-2">
                        {farm.veterinarian_invitations.map((inv) => (
                            <PendingBadge key={inv.id} invitation={inv} />
                        ))}
                    </div>
                </div>
            )}

            {/* Invitar */}
            <div className="border-t border-gray-100 px-6 py-4">
                <InviteForm farm={farm} />
            </div>
        </div>
    );
}
