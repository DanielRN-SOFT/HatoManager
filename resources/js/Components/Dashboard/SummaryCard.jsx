const SummaryCard = ({
    icon,
    title,
    value,
    sub,
    accent,
    iconCls,
    onClick,
    valueSmall,
    badge,
}) => (
    <div
        onClick={onClick}
        className={`relative rounded-xl border-l-4 bg-white p-4 shadow-sm ${accent} ${onClick ? 'cursor-pointer transition hover:shadow-md' : ''}`}
    >
        {badge != null && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow">
                {badge}
            </span>
        )}
        <div className="flex items-start gap-3">
            <span
                className={`material-symbols-outlined mt-0.5 text-[22px] ${iconCls}`}
            >
                {icon}
            </span>
            <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    {title}
                </p>
                <p
                    className={`font-bold text-gray-800 ${valueSmall ? 'text-base leading-tight' : 'text-2xl'}`}
                >
                    {value}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-gray-400">
                    {sub}
                </p>
            </div>
        </div>
    </div>
);

export default SummaryCard;
