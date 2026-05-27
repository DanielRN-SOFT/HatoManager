export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={
                'mt-1.5 flex items-center gap-1 text-xs font-medium text-error ' +
                className
            }
        >
            <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
            >
                error
            </span>
            {message}
        </p>
    ) : null;
}
