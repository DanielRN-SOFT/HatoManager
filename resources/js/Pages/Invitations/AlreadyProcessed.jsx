import { Link } from '@inertiajs/react';

export default function AlreadyProcessed({ email, status }) {
    const statusLabels = {
        accepted: 'aceptada',
        expired: 'expirada',
        rejected: 'rechazada',
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                    <svg
                        className="h-7 w-7 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                    </svg>
                </div>

                <h1 className="text-lg font-semibold text-gray-900">
                    Esta invitación ya fue procesada
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    La invitación enviada a{' '}
                    <span className="font-medium text-gray-700">{email}</span>{' '}
                    ya se encuentra{' '}
                    <span className="font-medium">
                        {statusLabels[status] ?? status}
                    </span>{' '}
                    y no puede cancelarse.
                </p>

                <Link
                    href={route('veterinarians.index')}
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Volver a veterinarios
                </Link>
            </div>
        </div>
    );
}
