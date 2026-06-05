const Select = ({ value, setData, processing, children }) => {
    return (
        <select
            value={value}
            onChange={(e) => setData('animal_id', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={processing}
        >
            {children}
        </select>
    );
};

export default Select;
