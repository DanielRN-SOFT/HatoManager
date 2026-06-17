import { useState } from 'react';
import InviteForm from './InviteForm';
import PendingBadge from './PendingBadge';
import VetRow from './VetRow';

const PAGE_SIZE = 5;

function Paginacion({ current, total, onChange }) {
    const last = Math.ceil(total / PAGE_SIZE);
    if (last <= 1) return null;

    const pages = Array.from({ length: last }, (_, i) => i + 1)
        .filter((p) => p === 1 || p === last || Math.abs(p - current) <= 1)
        .reduce((acc, p, i, arr) => {
            if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
            acc.push(p);
            return acc;
        }, []);

    return (
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <span className="text-xs text-gray-500">
                Página {current} de {last}
            </span>
            <div className="flex gap-1">
                <button
                    onClick={() => onChange(current - 1)}
                    disabled={current === 1}
                    className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                >
                    &laquo;
                </button>
                {pages.map((p, i) =>
                    p === '...' ? (
                        <span
                            key={`d-${i}`}
                            className="px-1 text-xs text-gray-400"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onChange(p)}
                            className={`rounded px-3 py-1 text-xs transition ${
                                p === current
                                    ? 'bg-primary text-white'
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            {p}
                        </button>
                    ),
                )}
                <button
                    onClick={() => onChange(current + 1)}
                    disabled={current === Math.ceil(total / PAGE_SIZE)}
                    className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
}

export default function VetFarmCard({ farm }) {
    const vets = farm.veterinarios ?? [];
    const hasPending = (farm.veterinarian_invitations?.length ?? 0) > 0;
    const [page, setPage] = useState(1);

    const pageVets = vets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="flex flex-col gap-4">
            {/* Card header */}
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

            {/* Tabla */}
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
                            {pageVets.length === 0 ? (
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
                            ) : (
                                pageVets.map((vet) => (
                                    <VetRow
                                        key={vet.id}
                                        vet={vet}
                                        farm={farm}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Paginacion
                    current={page}
                    total={vets.length}
                    onChange={setPage}
                />
            </div>
        </div>
    );
}
