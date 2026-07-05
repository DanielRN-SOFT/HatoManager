// resources/js/Components/Shared/AnimalSearch.jsx
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { BiTag } from 'react-icons/bi';
import { MdPets } from 'react-icons/md';

export default function AnimalSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const ref = useRef(null);
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    // Cerrar al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Atajo de teclado Ctrl+K / Cmd+K
    useEffect(() => {
        function handleKey(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        }
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    function handleChange(e) {
        const val = e.target.value;
        setQuery(val);
        setCursor(-1);

        clearTimeout(debounceRef.current);
        if (!val.trim()) {
            setResults([]);
            setOpen(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(route('animals.search', { q: val }), {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });
                const data = await res.json();
                setResults(data);
                setOpen(true);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);
    }

    function handleKeyDown(e) {
        if (!open) return;
        if (e.key === 'ArrowDown') {
            setCursor((c) => Math.min(c + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            setCursor((c) => Math.max(c - 1, -1));
        } else if (e.key === 'Enter' && cursor >= 0) {
            goToAnimal(results[cursor]);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    }

    function goToAnimal(animal) {
        setOpen(false);
        setQuery('');
        router.visit(route('animals.show', animal.id));
    }

    const statusColors = {
        activo: 'bg-green-50 text-green-700',
        vendido: 'bg-surface-container text-on-surface-variant',
        muerto: 'bg-red-50 text-red-700',
    };

    return (
        <div
            ref={ref}
            className="relative mx-4 hidden max-w-sm flex-1 sm:block"
        >
            <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-on-surface-variant">
                    search
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => results.length > 0 && setOpen(true)}
                    placeholder="Buscar animal, arete o lote…"
                    className="w-full rounded-full border border-transparent bg-surface-container-low py-2 pl-9 pr-16 text-sm transition-all duration-200 placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute right-3 rounded border border-outline-variant px-1.5 py-0.5 text-[10px] text-on-surface-variant">
                    ⌘K
                </span>
            </div>

            {open && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-lg">
                    {loading && (
                        <div className="flex items-center gap-2 px-3 py-4 text-xs text-on-surface-variant">
                            <span className="material-symbols-outlined animate-spin text-[16px]">
                                progress_activity
                            </span>
                            Buscando…
                        </div>
                    )}

                    {!loading && results.length === 0 && query && (
                        <p className="px-3 py-4 text-xs text-on-surface-variant">
                            Sin resultados para "{query}"
                        </p>
                    )}

                    {!loading && results.length > 0 && (
                        <>
                            <p className="px-3 pt-2.5 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant/60">
                                Animales
                            </p>
                            <div className="max-h-72 overflow-y-auto">
                                {results.map((animal, i) => (
                                    <button
                                        key={animal.id}
                                        onClick={() => goToAnimal(animal)}
                                        className={[
                                            'flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors',
                                            cursor === i
                                                ? 'bg-primary/10'
                                                : 'hover:bg-surface-container',
                                        ].join(' ')}
                                    >
                                        <div className="text-lg">
                                            <MdPets />
                                        </div>

                                        {animal.name && (
                                            <span
                                                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium`}
                                            >
                                                {animal.name}
                                            </span>
                                        )}

                                        <div className="text-lg">
                                            <BiTag/>
                                        </div>

                                        {animal.ear_tag && (
                                            <span
                                                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium`}
                                            >
                                                {animal.ear_tag}
                                            </span>
                                        )}
                                        {animal.status && (
                                            <span
                                                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColors[animal.status.toLowerCase()] ?? ''}`}
                                            >
                                                {animal.status}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container/50 px-3 py-2">
                                <span className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                                    <kbd className="rounded border border-outline-variant px-1 text-[10px]">
                                        ↑↓
                                    </kbd>
                                    navegar
                                    <kbd className="rounded border border-outline-variant px-1 text-[10px]">
                                        ↵
                                    </kbd>
                                    abrir
                                </span>
                                <button
                                    onClick={() =>
                                        router.visit(
                                            route('animals.index', {
                                                search: query,
                                            }),
                                        )
                                    }
                                    className="text-[11px] text-primary hover:underline"
                                >
                                    Ver todos los resultados →
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
