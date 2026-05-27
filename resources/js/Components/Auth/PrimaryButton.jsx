export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                'w-full rounded-lg bg-primary px-4 py-3.5 text-sm font-bold text-on-primary shadow-sm transition-all ' +
                'hover:opacity-90 active:scale-[0.98]' +
                'disabled:cursor-not-allowed disabled:opacity-60' +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
