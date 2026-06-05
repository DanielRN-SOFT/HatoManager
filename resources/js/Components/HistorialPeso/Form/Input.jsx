const Input = ({ type, data, setData, processing, campo }) => {
    return (
        <input
            type={type}
            value={data.product}
            onChange={(e) => setData(campo, e.target.value)}
            placeholder="Ej: Ivermectina"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={processing}
        />
    );
};

export default Input;
