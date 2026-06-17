import { router } from '@inertiajs/react';

const PaginacionTabla = ({ weightRecords }) => {
    return (
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <span className="text-xs text-gray-500">
                Página {weightRecords.current_page} de {weightRecords.last_page}
            </span>
            <div className="flex gap-1">
                {weightRecords.links.map((link, i) => (
                    <button
                        key={i}
                        disabled={!link.url}
                        onClick={() =>
                            link.url &&
                            router.get(
                                link.url,
                                {},
                                { preserveState: true, replace: true },
                            )
                        }
                        className={`rounded px-3 py-1 text-xs transition disabled:opacity-40 ${
                            link.active
                                ? 'bg-primary text-white'
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PaginacionTabla;
