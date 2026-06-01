import { router } from '@inertiajs/react';

export default function AnimalSelector({ animals, selectedAnimal }) {
    function handleChange(e) {
        router.get(
            route('health.index'),
            { animal_id: e.target.value },
            {
                preserveState: false,
                replace: true,
            },
        );
    }

    return (
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-500">
                pets
            </span>
            <select
                value={selectedAnimal ?? ''}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                {animals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                        {animal.ear_tag} {animal.name ? `— ${animal.name}` : ''}
                    </option>
                ))}
            </select>
        </div>
    );
}
