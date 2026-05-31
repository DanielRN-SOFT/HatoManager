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

    const { data, current_page, last_page, total, per_page } = animales;
    const from = (current_page - 1) * per_page + 1;
    const to = Math.min(current_page * per_page, total);

    return (
        <div className="overflow-hidden rounded">
            <div className="overflow-x-auto">
                <table className="w-full text-left rounded-full">
                    <thead className='rounded-full'>
                        <tr className="bg-surface-container-low">
                            {[
                                'Foto',
                                'Arete #',
                                'Raza',
                                'Sexo',
                                'Nacimiento',
                                'Estado',
                                'Categoría',
                                'Acciones',
                            ].map((h) => (
                                <th
                                    key={h}
                                    className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="py-16 text-center text-sm text-on-surface-variant"
                                >
                                    <span className="material-symbols-outlined mb-2 block text-[40px] opacity-20">
                                        search_off
                                    </span>
                                    No hay animales que coincidan con los
                                    filtros.
                                </td>
                            </tr>
                        ) : (
                            data.map((animal) => (
                                <FilaTable
                                    key={animal.id}
                                    animal={animal}
                                    onEdit={onEdit}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between bg-surface-container-low/50 px-5 py-3">
                <span className="text-xs text-on-surface-variant">
                    {from}–{to} de{' '}
                    <span className="font-semibold text-on-surface">
                        {total}
                    </span>{' '}
                    animales
                </span>
                <div className="flex items-center gap-1">
                    <PagBtn
                        onClick={() => handlePageChange(current_page - 1)}
                        disabled={current_page === 1}
                        icon="chevron_left"
                    />
                    {Array.from({ length: last_page }, (_, i) => i + 1)
                        .filter(
                            (p) =>
                                p === 1 ||
                                p === last_page ||
                                Math.abs(p - current_page) <= 1,
                        )
                        .reduce((acc, p, i, arr) => {
                            if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                            acc.push(p);
                            return acc;
                        }, [])
                        .map((p, i) =>
                            p === '...' ? (
                                <span
                                    key={i}
                                    className="px-1 text-xs text-on-surface-variant"
                                >
                                    …
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => handlePageChange(p)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-semibold transition-all duration-150 ${p === current_page ? 'bg-primary text-on-primary shadow-sm shadow-primary/40' : 'text-on-surface hover:bg-primary/10 hover:text-primary'}`}
                                >
                                    {p}
                                </button>
                            ),
                        )}
                    <PagBtn
                        onClick={() => handlePageChange(current_page + 1)}
                        disabled={current_page === last_page}
                        icon="chevron_right"
                    />
                </div>
            </div>
        </div>
    );
};

const PagBtn = ({ onClick, disabled, icon }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="flex h-8 w-8 items-center justify-center rounded-xl text-on-surface-variant transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-25"
    >
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </button>
);

export default AnimalTable;
