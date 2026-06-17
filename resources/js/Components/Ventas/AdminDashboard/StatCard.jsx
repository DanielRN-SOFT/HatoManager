const StatCard = ({ icon, label, value, sub, color }) => {
    return (
        <div className="flex items-start gap-4 rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white p-5 shadow-sm">
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[22px] ${color}`}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {label}
                </p>
                <p className="mt-0.5 truncate text-2xl font-bold text-gray-800">
                    {value}
                </p>
                {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
            </div>
        </div>
    );
};

export default StatCard;
