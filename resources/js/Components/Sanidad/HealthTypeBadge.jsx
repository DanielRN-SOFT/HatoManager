export default function HealthTypeBadge({ type }) {
    const config = {
        vacuna: { label: 'Vacuna', classes: 'bg-blue-100 text-blue-700' },
        desparasitacion: {
            label: 'Desparasitación',
            classes: 'bg-yellow-100 text-yellow-700',
        },
        tratamiento: {
            label: 'Tratamiento',
            classes: 'bg-red-100 text-red-700',
        },
    };

    const { label, classes } = config[type] ?? {
        label: type,
        classes: 'bg-gray-100 text-gray-600',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${classes}`}
        >
            {label}
        </span>
    );
}
