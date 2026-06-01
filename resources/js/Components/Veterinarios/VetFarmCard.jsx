import InviteForm from './InviteForm';
import PendingBadge from './PendingBadge';
import VetRow from './VetRow';

export default function VetFarmCard({ farm }) {
    const hasVets = (farm.veterinarios?.length ?? 0) > 0;
    const hasPending = (farm.veterinarian_invitations?.length ?? 0) > 0;

    return (
        <div className="rounded-2xl border border-outline-variant bg-surface p-5 shadow-sm">
            {/* Header */}
            <div className="mb-1 flex items-start justify-between">
                <div>
                    <h3 className="font-semibold text-on-surface">
                        {farm.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-on-surface-variant">
                        {farm.city}, {farm.department}
                    </p>
                </div>
                <span className="material-symbols-outlined text-[22px] text-on-surface-variant">
                    agriculture
                </span>
            </div>

            <hr className="my-3 border-outline-variant" />

            {/* Veterinarios vinculados */}
            {hasVets ? (
                <div className="divide-y divide-outline-variant">
                    {farm.veterinarios.map((vet) => (
                        <VetRow key={vet.id} vet={vet} farm={farm} />
                    ))}
                </div>
            ) : (
                <p className="py-2 text-sm text-on-surface-variant">
                    Sin veterinarios vinculados aún.
                </p>
            )}

            {/* Invitaciones pendientes */}
            {hasPending && (
                <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                        Invitaciones pendientes
                    </p>
                    {farm.veterinarian_invitations.map((inv) => (
                        <PendingBadge key={inv.id} invitation={inv} />
                    ))}
                </div>
            )}

            <InviteForm farm={farm} />
        </div>
    );
}
