const SectionCard = ({
    icon,
    title,
    accent = 'border-primary',
    children,
    hint,
}) => (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div
            className={`flex items-center justify-between border-t-4 ${accent} px-5 py-3`}
        >
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-secondary">
                    {icon}
                </span>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                    {title}
                </h3>
            </div>
            {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
        </div>
        <div className="px-5 pb-5 pt-3">{children}</div>
    </div>
);
export default SectionCard;
