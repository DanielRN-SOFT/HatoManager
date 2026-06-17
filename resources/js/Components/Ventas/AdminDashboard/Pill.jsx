const Pill = ({ label, map }) => {
    const cls = (map ?? {})[label] ?? 'bg-gray-100 text-gray-600';
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}
        >
            {label}
        </span>
    );
}

export default Pill;
