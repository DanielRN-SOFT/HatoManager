import Avatar from './Avatar';

const ButtonSelector = ({ setOpen, open, current }) => {
    return (
        <button
            onClick={() => setOpen((o) => !o)}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left shadow-sm transition-all duration-150 ${
                open
                    ? 'border-green-400 bg-white ring-2 ring-green-500/20'
                    : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/40'
            }`}
        >
            {current && <Avatar animal={current} size="md" />}

            <div className="min-w-0">
                <p className="mb-0.5 text-xs font-semibold uppercase leading-none tracking-wider text-gray-400">
                    Animal seleccionado
                </p>
                <p className="text-sm font-semibold leading-none text-gray-800">
                    {current?.ear_tag ?? '—'}
                    {current?.name && (
                        <span className="ml-1.5 font-normal text-gray-500">
                            {current.name}
                        </span>
                    )}
                </p>
                {current?.breed?.name && (
                    <p className="mt-0.5 text-xs leading-none text-gray-400">
                        {current.breed.name}
                    </p>
                )}
            </div>

            <span
                className={`material-symbols-outlined ml-2 text-[18px] text-gray-400 transition-transform duration-200 ${
                    open ? 'rotate-180' : ''
                }`}
            >
                expand_more
            </span>
        </button>
    );
};

export default ButtonSelector;
