const Select = ({ data, setData, processing, children, campo }) => {
    const selectCls =
        'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 cursor-pointer';
    return (
        <select
            value={data[campo]}
            onChange={(e) => setData(campo, e.target.value)}
            className={selectCls}
            disabled={processing}
        >
            {children}
        </select>
    );
};

export default Select;
