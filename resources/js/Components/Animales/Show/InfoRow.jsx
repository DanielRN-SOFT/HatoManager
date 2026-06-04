const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 border-b border-gray-50 py-2.5 last:border-0">
        <span className="material-symbols-outlined mt-0.5 text-[16px] text-primary">
            {icon}
        </span>
        <span className="w-32 shrink-0 text-xs text-gray-400">{label}</span>
        <span className="text-sm font-medium text-gray-800">
            {value ?? '—'}
        </span>
    </div>
);


export default InfoRow
