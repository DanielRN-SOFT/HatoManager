import Avatar from "./Avatar";

const ListaBuscador = ({filtered, handleSelect, currentId }) => {
    return (
        <ul className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
                <li className="flex flex-col items-center gap-1 py-6 text-center">
                    <span className="material-symbols-outlined text-[28px] text-gray-300">
                        search_off
                    </span>
                    <p className="text-xs text-gray-400">
                        Sin resultados para "{search}"
                    </p>
                </li>
            ) : (
                filtered.map((animal) => {
                    const isActive = String(animal.id) === String(currentId);
                    return (
                        <li key={animal.id}>
                            <button
                                onClick={() => handleSelect(animal)}
                                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-green-50 ${
                                    isActive ? 'bg-green-50' : ''
                                }`}
                            >
                                <Avatar animal={animal} size="sm" />

                                <div className="min-w-0 flex-1">
                                    <p
                                        className={`text-sm font-semibold leading-none ${
                                            isActive
                                                ? 'text-green-700'
                                                : 'text-gray-800'
                                        }`}
                                    >
                                        {animal.ear_tag}
                                        {animal.name && (
                                            <span className="ml-1 font-normal text-gray-500">
                                                {animal.name}
                                            </span>
                                        )}
                                    </p>
                                    {animal.breed?.name && (
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            {animal.breed.name}
                                        </p>
                                    )}
                                </div>

                                {isActive && (
                                    <span className="material-symbols-outlined text-[16px] text-green-600">
                                        check_circle
                                    </span>
                                )}
                            </button>
                        </li>
                    );
                })
            )}
        </ul>
    );
};

export default ListaBuscador;
