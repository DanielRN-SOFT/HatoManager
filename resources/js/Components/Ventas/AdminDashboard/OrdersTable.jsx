import formatearDinero from "@/helpers/formatearDinero";
import Pill from "./Pill";
import formatDateTime from "@/helpers/formatearFechaHora";

const OrdersTable = ({ orders, mode, onDetail, onPageChange, BIZ_STYLES, PAY_STYLES }) => {
    const isSales = mode === 'ventas';
    const rows = orders?.data ?? [];
    const { current_page, last_page } = orders ?? {};

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-secondary text-xs font-semibold uppercase tracking-wide text-white">
                            <th className="px-4 py-3">Referencia</th>
                            <th className="px-4 py-3">Fecha</th>
                            <th className="px-4 py-3">
                                {isSales ? 'Comprador' : 'Vendedor'}
                            </th>
                            <th className="px-4 py-3">Animales</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Estado negocio</th>
                            <th className="px-4 py-3">Estado pago</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="py-16 text-center">
                                    <div className="flex flex-col items-center gap-3 text-gray-400">
                                        <span className="material-symbols-outlined text-5xl">
                                            receipt_long
                                        </span>
                                        <p className="text-sm">
                                            {isSales
                                                ? 'Aún no tienes ventas registradas.'
                                                : 'Aún no tienes compras registradas.'}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((order) => (
                                <tr
                                    key={order.id}
                                    className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50"
                                    onClick={() => onDetail(order)}
                                >
                                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">
                                        {order.reference ?? `#${order.id}`}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {formatDateTime(order.date)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-800">
                                        {order.counterpart_name ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {order.animals_count} cab.
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                                        {formatearDinero(order.subtotal)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Pill
                                            label={order.bussiness_status}
                                            map={BIZ_STYLES}
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Pill
                                            label={order.payment_status}
                                            map={PAY_STYLES}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-gray-400">
                                        <span
                                            className="material-symbols-outlined"
                                            style={{ fontSize: 18 }}
                                        >
                                            chevron_right
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {last_page > 1 && (
                <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                    <span className="text-xs text-gray-500">
                        Página {current_page} de {last_page}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPageChange(current_page - 1)}
                            disabled={current_page === 1}
                            className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                        >
                            &laquo;
                        </button>
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
                                        key={p}
                                        onClick={() => onPageChange(p)}
                                        className={`rounded px-3 py-1 text-xs transition ${p === current_page ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        {p}
                                    </button>
                                ),
                            )}
                        <button
                            onClick={() => onPageChange(current_page + 1)}
                            disabled={current_page === last_page}
                            className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                        >
                            &raquo;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrdersTable;
