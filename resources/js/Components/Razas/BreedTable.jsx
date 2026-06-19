import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import FilaBreed from './FilaBreed';
import ModalEliminarBreed from './ModalEliminarBreed';
import ModalFormBreed from './ModalFormBreed';

const BreedTable = ({ breeds }) => {
    const [modalEditar, setModalEditar] = useState(null);
    const [modalEliminar, setModalEliminar] = useState(null);

    function handlePageChange(page) {
        router.get(
            route('breeds.index'),
            { page },
            { preserveState: true, replace: true },
        );
    }

    const { data, current_page, last_page, total, per_page } = breeds;
    const from = (current_page - 1) * per_page + 1;
    const to = Math.min(current_page * per_page, total);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Modal Editar */}
            <Modal
                show={!!modalEditar}
                onClose={() => setModalEditar(null)}
                closeable
                maxWidth="sm"
            >
                <ModalFormBreed
                    breed={modalEditar}
                    onClose={() => setModalEditar(null)}
                />
            </Modal>

            {/* Modal Eliminar */}
            <Modal
                show={!!modalEliminar}
                onClose={() => setModalEliminar(null)}
                closeable
                maxWidth="sm"
            >
                <ModalEliminarBreed
                    breed={modalEliminar}
                    onClose={() => setModalEliminar(null)}
                />
            </Modal>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 bg-secondary text-xs font-semibold uppercase tracking-wide text-white">
                            {[
                                '#',
                                'Nombre',
                                'Estado',
                                'Creado',
                                'Acciones',
                            ].map((h) => (
                                <th key={h} className="px-4 py-3">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-16 text-center">
                                    <div className="flex flex-col items-center gap-3 text-gray-400">
                                        <span className="material-symbols-outlined text-5xl">
                                            search_off
                                        </span>
                                        <p className="text-sm">
                                            No hay razas que coincidan con los
                                            filtros.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((breed, index) => (
                                <FilaBreed
                                    key={breed.id}
                                    breed={breed}
                                    index={
                                        (current_page - 1) * per_page +
                                        index +
                                        1
                                    }
                                    setModalEditar={setModalEditar}
                                    setModalEliminar={setModalEliminar}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {last_page > 1 && (
                <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                    <span className="text-xs text-gray-500">
                        {from}–{to} de {total} razas
                    </span>
                    <div className="flex gap-2">
                        <PagBtn
                            onClick={() => handlePageChange(current_page - 1)}
                            disabled={current_page === 1}
                            label="&laquo;"
                        />
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
                                        key={`dots-${i}`}
                                        className="px-1 text-xs text-gray-400"
                                    >
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={`page-${p}`}
                                        onClick={() => handlePageChange(p)}
                                        className={`rounded px-3 py-1 text-xs transition ${
                                            p === current_page
                                                ? 'bg-primary text-white'
                                                : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ),
                            )}
                        <PagBtn
                            onClick={() => handlePageChange(current_page + 1)}
                            disabled={current_page === last_page}
                            label="&raquo;"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const PagBtn = ({ onClick, disabled, label }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
        dangerouslySetInnerHTML={{ __html: label }}
    />
);

export default BreedTable;
