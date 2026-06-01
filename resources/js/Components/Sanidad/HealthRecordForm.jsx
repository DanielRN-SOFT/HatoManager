export default function HealthRecordForm({
    data,
    setData,
    errors,
    animals,
    processing,
}) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {/* Animal */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Animal
                </label>
                <select
                    value={data.animal_id}
                    onChange={(e) => setData('animal_id', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={processing}
                >
                    <option value="">Selecciona un animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.ear_tag}
                            {animal.name ? ` — ${animal.name}` : ''}
                        </option>
                    ))}
                </select>
                {errors.animal_id && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.animal_id}
                    </p>
                )}
            </div>

            {/* Tipo */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Tipo
                </label>
                <select
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={processing}
                >
                    <option value="">Selecciona un tipo</option>
                    <option value="vacuna">Vacuna</option>
                    <option value="desparasitacion">Desparasitación</option>
                    <option value="tratamiento">Tratamiento</option>
                </select>
                {errors.type && (
                    <p className="mt-1 text-xs text-red-500">{errors.type}</p>
                )}
            </div>

            {/* Producto */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Producto
                </label>
                <input
                    type="text"
                    value={data.product}
                    onChange={(e) => setData('product', e.target.value)}
                    placeholder="Ej: Ivermectina"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={processing}
                />
                {errors.product && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.product}
                    </p>
                )}
            </div>

            {/* Dosis */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Dosis
                </label>
                <input
                    type="text"
                    value={data.dose}
                    onChange={(e) => setData('dose', e.target.value)}
                    placeholder="Ej: 5ml"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={processing}
                />
                {errors.dose && (
                    <p className="mt-1 text-xs text-red-500">{errors.dose}</p>
                )}
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Fecha de aplicación
                    </label>
                    <input
                        type="date"
                        value={data.applied_at}
                        onChange={(e) => setData('applied_at', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={processing}
                    />
                    {errors.applied_at && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.applied_at}
                        </p>
                    )}
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Próxima fecha
                        <span className="ml-1 font-normal text-gray-400">
                            (opcional)
                        </span>
                    </label>
                    <input
                        type="date"
                        value={data.next_date}
                        onChange={(e) => setData('next_date', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={processing}
                    />
                    {errors.next_date && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.next_date}
                        </p>
                    )}
                </div>
            </div>

            {/* Notas */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Notas
                    <span className="ml-1 font-normal text-gray-400">
                        (opcional)
                    </span>
                </label>
                <textarea
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    rows={3}
                    placeholder="Observaciones adicionales..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={processing}
                />
                {errors.notes && (
                    <p className="mt-1 text-xs text-red-500">{errors.notes}</p>
                )}
            </div>
        </div>
    );
}
