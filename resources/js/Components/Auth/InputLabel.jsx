export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                'mb-1.5 block text-sm font-semibold text-on-surface ' +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
