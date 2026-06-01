const SectionForm = ({ label, children }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                {label}
            </span>
            <div className="h-px flex-1 bg-gray-200" />
        </div>
        {children}
    </div>
);

export default SectionForm;
