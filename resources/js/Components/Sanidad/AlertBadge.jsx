export default function AlertBadge({ nextDate }) {
    if (!nextDate) return null;

    const days = Math.ceil(
        (new Date(nextDate) - new Date()) / (1000 * 60 * 60 * 24),
    );

    const classes =
        days < 0
            ? 'bg-red-100 text-red-700'
            : days <= 7
              ? 'bg-orange-100 text-orange-700'
              : 'bg-green-100 text-green-700';

    const label =
        days < 0
            ? `Vencida hace ${Math.abs(days)}d`
            : days === 0
              ? 'Hoy'
              : `En ${days}d`;

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${classes}`}
        >
            <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
            >
                notifications
            </span>
            {label}
        </span>
    );
}
