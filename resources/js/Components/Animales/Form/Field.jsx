const Field = ({ label, icon, error, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500 mt-3">
            <span className="material-symbols-outlined text-[12px] text-primary">
                {icon}
            </span>
            {label}
        </label>
        {children}
        {error && (
            <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                <span className="material-symbols-outlined text-[12px]">
                    error
                </span>
                {error}
            </p>
        )}
    </div>
);

export default Field
