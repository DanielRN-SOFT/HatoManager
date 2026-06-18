export default function FarmField({
    label,
    name,
    type = 'text',
    placeholder,
    data,
    setData,
    errors,
}) {
    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10';

    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
                placeholder={placeholder}
                className={inputCls}
                disabled={false}
            />
            {errors[name] && (
                <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
            )}
        </div>
    );
}
