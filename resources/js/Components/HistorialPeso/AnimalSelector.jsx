import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Buscador from './Buscador';
import ButtonSelector from './ButtonSelector';
import ListaBuscador from './ListaBuscador';

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

    return (
        <div className="relative" ref={ref}>
            {/* Trigger */}
            <ButtonSelector setOpen={setOpen} open={open} current={current} />

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    {/* Buscador */}
                    <Buscador
                        search={search}
                        setSearch={setSearch}
                        searchRef={searchRef}
                    />

                    {/* Lista */}
                    <ListaBuscador
                        filtered={filtered}
                        handleSelect={handleSelect}
                        currentId={currentId}
                    />

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
