import FieldError from './FieldError';

const FieldForm = ({ label, icon, error, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-[14px] text-primary">
                {icon}
            </span>
            {label}
        </label>
        <div className="relative">{children}</div>
        {error && <FieldError msg={error} />}
    </div>
);

export default FieldForm;
