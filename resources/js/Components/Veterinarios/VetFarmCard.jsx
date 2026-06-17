import InviteForm from './InviteForm';
import PendingBadge from './PendingBadge';
import VetRow from './VetRow';

export default function VetFarmCard({ farm }) {
    const hasVets = (farm.veterinarios?.length ?? 0) > 0;
    const hasPending = (farm.veterinarian_invitations?.length ?? 0) > 0;

    return (
        <div className="flex flex-col gap-4">
            {/* Card header — nombre de finca */}
            <div className="rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {farm.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-500">
                            {farm.city}, {farm.department}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {hasPending && (
                            <div className="flex flex-col gap-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Invitaciones pendientes
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {farm.veterinarian_invitations.map(
                                        (inv) => (
                                            <PendingBadge
                                                key={inv.id}
                                                invitation={inv}
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                        <InviteForm farm={farm} />
                    </div>
                </div>
            </div>

            {/* Tabla de veterinarios */}
            <div className="overflow-hidden rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white">
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
                                    <VetRow
                                        key={vet.id}
                                        vet={vet}
                                        farm={farm}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="py-10 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <span className="material-symbols-outlined text-4xl">
                                                person_off
                                            </span>
                                            <p className="text-sm">
                                                Sin veterinarios vinculados aún.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
