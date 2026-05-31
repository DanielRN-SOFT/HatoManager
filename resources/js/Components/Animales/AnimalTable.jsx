import { router } from '@inertiajs/react';
import FilaTable from './FilaTable';

const AnimalTable = ({ animales, onEdit }) => {
    function handlePageChange(page) {
        router.get(
            route('animales.index'),
            { page },
            { preserveState: true, replace: true },
        );
    }

    const { data, current_page, last_page, total, per_page } = animales; // ← animales, no animals
    const from = (current_page - 1) * per_page + 1;
    const to = Math.min(current_page * per_page, total);
    return (
        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="border-b border-outline-variant bg-surface-container text-on-surface-variant">
                        <th className="text-label-md px-6 py-4">Foto</th>
                        <th className="text-label-md px-6 py-4">Arete #</th>
                        <th className="text-label-md px-6 py-4">Raza</th>
                        <th className="text-label-md px-6 py-4">Sexo</th>
                        <th className="text-label-md px-6 py-4">
                            Fecha de nacimiento
                        </th>
                        <th className="text-label-md px-6 py-4">Estado</th>
                        <th className="text-label-md px-6 py-4">Categoría</th>
                        <th className="text-label-md px-6 py-4 text-center">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                    {data.map((animal) => (
                        <FilaTable animal={animal} onEdit={onEdit} />
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="flex items-center justify-between border-t border-outline-variant bg-surface px-6 py-4">
                <span className="text-body-sm text-on-surface-variant">
                    Mostrando {from}-{to} de {total} animales
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(current_page - 1)}
                        disabled={current_page === 1}
                        className="rounded-lg p-2 hover:bg-surface-container-low disabled:opacity-30"
                    >
                        <span className="material-symbols-outlined">
                            chevron_left
                        </span>
                    </button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: last_page }, (_, i) => i + 1)
                            .filter(
                                (p) =>
                                    p === 1 ||
                                    p === last_page ||
                                    Math.abs(p - current_page) <= 1,
                            )
                            .reduce((acc, p, i, arr) => {
                                if (i > 0 && p - arr[i - 1] > 1)
                                    acc.push('...');
                                acc.push(p);
                                return acc;
                            }, [])
                            .map((p, i) =>
                                p === '...' ? (
                                    <span
                                        key={i}
                                        className="px-2 text-on-surface-variant"
                                    >
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => handlePageChange(p)}
                                        className={`text-body-sm flex h-8 w-8 items-center justify-center rounded-lg font-bold transition-colors ${
                                            p === current_page
                                                ? 'bg-primary text-white'
                                                : 'text-on-surface hover:bg-surface-container-low'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ),
                            )}
                    </div>
                    <button
                        onClick={() => handlePageChange(current_page + 1)}
                        disabled={current_page === last_page}
                        className="rounded-lg p-2 hover:bg-surface-container-low disabled:opacity-30"
                    >
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnimalTable;
