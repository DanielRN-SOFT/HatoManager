const SectionForm = ({ label, children }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-outline-variant" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant/50">
                {label}
            </span>
            <div className="h-px flex-1 bg-outline-variant" />
        </div>
        {children}
    </div>
);

export default SectionForm;
