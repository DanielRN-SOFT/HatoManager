import Field from './Field';
import SectionCard from './SectionCard';

const PreciosPeso = ({ errors, data, setData, inputCls }) => {
    const estimatedValue =
        data.target_weight && data.price_weight
            ? (
                  parseFloat(data.target_weight) * parseFloat(data.price_weight)
              ).toLocaleString('es-CO', { maximumFractionDigits: 0 })
            : null;

    return (
        <div className="mb-5">
            <SectionCard
                icon="payments"
                title="Precios y peso"
                accent="border-secondary"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Field
                        label="Valor estimado (COP)"
                        icon="payments"
                        error={errors.price}
                    >
                        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
                            <span className="border-r border-gray-200 bg-gray-100 px-3 py-2.5 text-xs font-bold text-gray-400">
                                $
                            </span>
                            <input
                                type="number"
                                step="0.0001"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                placeholder="0.00"
                                className={inputCls}
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
                                    setData('target_weight', e.target.value)
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
                                    setData('price_weight', e.target.value)
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

                {/* Resumen calculado */}
                {estimatedValue && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                        <span className="material-symbols-outlined text-[16px] text-green-600">
                            calculate
                        </span>
                        <p className="text-xs text-green-700">
                            Valor por peso objetivo:{' '}
                            <strong>${estimatedValue} COP</strong>
                        </p>
                    </div>
                )}
            </SectionCard>
        </div>
    );
};

export default PreciosPeso;
