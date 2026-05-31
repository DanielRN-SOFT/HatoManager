import FieldError from "./FieldError";

const FieldForm = ({ label, icon, error, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">
                {icon}
            </span>
            {label}
        </label>
        <div className="relative">{children}</div>
        {error && <FieldError msg={error} />}
    </div>
);

export default FieldForm;
