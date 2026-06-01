export default function FarmField({
    label,
    name,
    type = 'text',
    placeholder,
    data,
    setData,
    errors,
}) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-on-surface-variant">
                {label}
            </label>
            <input
                type={type}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
                placeholder={placeholder}
                step={type === 'number' ? 'any' : undefined}
                className={[
                    'w-full rounded-lg border bg-surface px-3 py-2 text-sm text-on-surface',
                    'placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/30',
                    errors[name]
                        ? 'border-error focus:ring-error/20'
                        : 'border-outline-variant',
                ].join(' ')}
            />
            {errors[name] && (
                <p className="mt-1 text-xs text-error">{errors[name]}</p>
            )}
        </div>
    );
}
