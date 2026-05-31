import { router } from '@inertiajs/react';
import { useState } from 'react';

const AnimalFilterBar = ({ filters }) => {
    const [form, setForm] = useState({
        status: filters.status ?? '',
        breed: filters.breed ?? '',
        category: filters.category ?? '',
    });

    function handleChange(key, value) {
        const next = { ...form, [key]: value };
        setForm(next);
        router.get(route('animales.index'), next, {
            preserveState: true,
            replace: true,
        });
    }

    function handleClear() {
        const empty = { status: '', breed: '', category: '' };
        setForm(empty);
        router.get(route('animales.index'), empty, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-low p-4 shadow-sm">
            <span className="text-label-md text-on-surface-variant">
                Filtrar por:
            </span>

            <select
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="text-body-sm rounded-lg border border-outline-variant bg-surface px-3 py-2"
            >
                <option value="">Estado</option>
                <option value="al_dia">Al día</option>
                <option value="proxima_a_vencer">Próxima a vencer</option>
                <option value="vencida">Vencida</option>
            </select>

            <select
                value={form.breed}
                onChange={(e) => handleChange('breed', e.target.value)}
                className="text-body-sm rounded-lg border border-outline-variant bg-surface px-3 py-2"
            >
                <option value="">Raza</option>
                <option value="brahman">Brahman</option>
                <option value="gyr">Gyr</option>
                <option value="angus">Angus</option>
            </select>

            <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="text-body-sm rounded-lg border border-outline-variant bg-surface px-3 py-2"
            >
                <option value="">Categoría</option>
                <option value="novilla">Novilla</option>
                <option value="toro">Toro</option>
                <option value="vaca_parida">Vaca Parida</option>
                <option value="ternero">Ternero</option>
            </select>

            <div className="h-8 w-px bg-outline-variant" />

            <div className="flex-1" />

            <button
                onClick={handleClear}
                className="text-label-md font-bold text-primary hover:underline"
            >
                Limpiar filtros
            </button>
        </div>
    );
};

export default AnimalFilterBar;
