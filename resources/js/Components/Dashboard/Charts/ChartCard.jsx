const ChartCard = ({ icon, title, sub, children, className = '' }) => (
    <div
        className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
        <div className="mb-0.5 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-secondary">
                {icon}
            </span>
            <span className="text-[13px] font-semibold text-gray-700">
                {title}
            </span>
        </div>
        {sub && <p className="mb-3 text-[11px] text-gray-400">{sub}</p>}
        {children}
    </div>
);

export default ChartCard;
