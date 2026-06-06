import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const AnimalSelector = ({ animals, selectedAnimal }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef(null);
    const searchRef = useRef(null);

    const currentId = selectedAnimal?.id ?? selectedAnimal;
    const current =
        animals.find((a) => String(a.id) === String(currentId)) ?? animals[0];

    const filtered = animals.filter((a) => {
        const q = search.toLowerCase();
        return (
            String(a.ear_tag).toLowerCase().includes(q) ||
            (a.name ?? '').toLowerCase().includes(q) ||
            (a.breed?.name ?? '').toLowerCase().includes(q)
        );
    });

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setSearch('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (open) {
            setTimeout(() => searchRef.current?.focus(), 50);
        } else {
            setSearch('');
        }
    }, [open]);

    function handleSelect(animal) {
        setOpen(false);
        setSearch('');
        router.get(
            route('weight-records.index'),
            { animal_id: animal.id },
            { preserveState: false, replace: true },
        );
    }

    function getInitials(animal) {
        return String(animal.ear_tag ?? '??')
            .slice(0, 2)
            .toUpperCase();
    }

    function getImageUrl(animal) {
        return animal.media?.[0]?.original_url ?? null;
    }

    const Avatar = ({ animal, size = 'md' }) => {
        const img = getImageUrl(animal);
        const sizes = {
            sm: 'h-7 w-7 text-[11px]',
            md: 'h-9 w-9 text-sm',
            lg: 'h-11 w-11 text-base',
        };
        return img ? (
            <img
                src={img}
                alt={String(animal.ear_tag)}
                className={`${sizes[size]} rounded-full object-cover ring-2 ring-white`}
            />
        ) : (
            <div
                className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700 ring-2 ring-white`}
            >
                {getInitials(animal)}
            </div>
        );
    };

    return (
        <div className="relative" ref={ref}>
            {/* Trigger */}
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

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    {/* Buscador */}
                    <div className="border-b border-gray-100 p-2">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 focus-within:border-green-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20">
                            <span className="material-symbols-outlined text-[16px] text-gray-400">
                                search
                            </span>
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar por arete, nombre o raza..."
                                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <span className="material-symbols-outlined text-[16px]">
                                        close
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Lista */}
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
                                const isActive =
                                    String(animal.id) === String(currentId);
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

                    {/* Footer con conteo */}
                    <div className="border-t border-gray-100 px-3 py-2">
                        <p className="text-xs text-gray-400">
                            {filtered.length}{' '}
                            {filtered.length === 1 ? 'animal' : 'animales'}
                            {search && ` para "${search}"`}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnimalSelector;
