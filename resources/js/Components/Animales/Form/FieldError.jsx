const FieldError = ({ msg }) => (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-error">
        <span className="material-symbols-outlined text-[14px]">error</span>
        {msg}
    </p>
);

export default FieldError;
