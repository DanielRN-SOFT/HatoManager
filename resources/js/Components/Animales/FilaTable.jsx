import { router } from '@inertiajs/react';

const FilaTable = ({ animal, onEdit }) => {
    function handleExportPdf(id) {
        window.open(route('inventory.pdf', id), '_blank');
    }

    return (
        <tr
            key={animal.id}
            className="transition-colors hover:bg-surface-container-low"
        >
            <td className="px-6 py-4">
                <img src={animal.photo} alt={animal.name} />
            </td>

            <td className="px-6 py-4 font-bold text-on-surface">
                {animal.ear_tag}
            </td>
            <td className="text-body-sm px-6 py-4">{animal.breed}</td>
            <td className="px-6 py-4 font-bold text-on-surface">
                {animal.sex}
            </td>
            <td className="px-6 py-4 font-bold text-on-surface">
                {animal.birth_date}
            </td>
            <td className="px-6 py-4 font-bold text-on-surface">
                {animal.status}
            </td>
            <td className="text-body-sm px-6 py-4">{animal.animal_category?.name}</td>

            <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                    <button
                        className="text-outline transition-colors hover:text-primary"
                        onClick={() =>
                            router.visit(route('inventory.show', animal.id))
                        }
                    >
                        <span className="material-symbols-outlined">
                            visibility
                        </span>
                    </button>
                    <button
                        className="text-outline transition-colors hover:text-primary"
                        onClick={() => onEdit(animal)}
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </button>

                    <button
                        onClick={() => handleExportPdf(animal.id)}
                        className="text-outline transition-colors hover:text-error"
                    >
                        <span className="material-symbols-outlined">
                            picture_as_pdf
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default FilaTable;
