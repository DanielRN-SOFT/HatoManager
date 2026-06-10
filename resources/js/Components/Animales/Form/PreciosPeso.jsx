import Field from './Field';
import SectionCard from './SectionCard';

const PreciosPeso = ({ errors, data, setData, inputCls }) => {
    const handleChange = (field, value) => {
        const updated = { ...data, [field]: value };
        const pw = parseFloat(updated.price_weight) || 0;
        const tw = parseFloat(updated.target_weight) || 0;
        setData((prev) => ({
            ...prev,
            [field]: value,
            price: pw > 0 && tw > 0 ? (pw * tw).toFixed(2) : '',
        }));
    };

    return (
        <div className="mb-5">
            <SectionCard
                icon="payments"
                title="Precios y peso"
                accent="border-secondary"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {/* Valor estimado — solo lectura */}
                    <Field
                        label="Valor estimado (COP)"
                        icon="payments"
                        error={errors.price}
                    >
                        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100 transition-all opacity-70">
                            <span className="border-r border-gray-200 bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-400">
                                $
                            </span>
                            <input
                                type="text"
                                value={
                                    data.price
                                        ? parseFloat(data.price).toLocaleString(
                                              'es-CO',
                                              {
                                                  maximumFractionDigits: 0,
                                              },
                                          )
                                        : ''
                                }
                                readOnly
                                placeholder="Calculado automáticamente"
                                className={`${inputCls} cursor-not-allowed text-gray-500`}
                            />
                        </div>
                    </Field>

                    <Field
                        label="Peso objetivo"
                        icon="flag"
                        error={errors.target_weight}
                    >
                        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
                            <input
                                type="number"
                                value={data.target_weight}
                                onChange={(e) =>
                                    handleChange(
                                        'target_weight',
                                        e.target.value,
                                    )
                                }
                                placeholder="0"
                                className={inputCls}
                            />
                            <span className="border-l border-gray-200 bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-400">
                                kg
                            </span>
                        </div>
                    </Field>

                    <Field
                        label="Precio / kg (COP)"
                        icon="price_change"
                        error={errors.price_weight}
                    >
                        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
                            <span className="border-r border-gray-200 bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-400">
                                $
                            </span>
                            <input
                                type="number"
                                step="0.0001"
                                value={data.price_weight}
                                onChange={(e) =>
                                    handleChange('price_weight', e.target.value)
                                }
                                placeholder="0.00"
                                className={inputCls}
                            />
                            <span className="border-l border-gray-200 bg-gray-100 px-3 py-1.5 text-[10px] font-bold text-gray-400">
                                /kg
                            </span>
                        </div>
                    </Field>
                </div>
            </SectionCard>
        </div>
    );
};

export default PreciosPeso;
