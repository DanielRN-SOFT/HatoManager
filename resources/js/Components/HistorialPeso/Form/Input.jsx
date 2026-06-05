const Input = ({ type, data, setData, processing, campo, placeholder }) => {
    const inputCls =
        'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10';
    return (
        <input
            type={type}
            value={data[campo]}
            onChange={(e) => setData(campo, e.target.value)}
            placeholder={placeholder}
            className={inputCls}
            disabled={processing}
        />
    );
};

export default Input;
