const StatBadge = ({ icon, label, value, sub }) => (
    <div className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-secondary">
                {icon}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                {label}
            </span>
        </div>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-[11px] text-gray-400">{sub}</p>}
    </div>
);

export default StatBadge;
