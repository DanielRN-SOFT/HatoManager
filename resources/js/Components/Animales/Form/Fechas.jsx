import { useState } from 'react';
import Field from './Field';
import SectionCard from './SectionCard';

const Fechas = ({ errors, data, setData, inputCls }) => {
    const [showPublicationDate, setShowPublicationDate] = useState(
        data.publication_date ? true : false,
    );
    function handleRadio(e) {
        setData('in_sell', e.target.value);
        setShowPublicationDate(e.target.value === 'true');
    }
    return (
        <SectionCard icon="calendar_today" title="Fechas">
            <div className="grid grid-cols-2 gap-4">
                <Field
                    label="Fecha de nacimiento"
                    icon="cake"
                    error={errors.birth_date}
                >
                    <input
                        max={new Date().toISOString().split('T')[0]}
                        type="date"
                        value={data.birth_date?.split('T')[0] ?? ''}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className={inputCls}
                    />
                </Field>

                <Field label="¿Animal en venta?" icon="sell_cloud">
                    <div className="flex gap-3">
                        <label
                            className={`flex h-10 w-10 cursor-pointer items-center justify-center gap-2 rounded-full border transition-all ${
                                showPublicationDate
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-outline-variant text-on-surface-variant hover:border-outline'
                            }`}
                        >
                            <input
                                type="radio"
                                name="en_venta"
                                id="en_venta_si"
                                value="true"
                                onChange={handleRadio}
                                className="sr-only"
                            />
                            Sí
                        </label>
                        <label
                            className={`flex h-10 w-10 cursor-pointer items-center justify-center gap-2 rounded-full border transition-all ${
                                !showPublicationDate
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-outline-variant text-on-surface-variant hover:border-outline'
                            }`}
                        >
                            <input
                                type="radio"
                                name="en_venta"
                                id="en_venta_no"
                                value="false"
                                onChange={handleRadio}
                                className="sr-only"
                            />
                            No
                        </label>
                    </div>
                </Field>
            </div>

            {showPublicationDate && (
                <Field
                    label="Fecha de publicación"
                    icon="calendar_today"
                    error={errors.publication_date}
                >
                    <input
                        type="date"
                        value={
                            data.publication_date
                                ? data.publication_date
                                : new Date().toISOString().split('T')[0]
                        }
                        onChange={(e) =>
                            setData('publication_date', e.target.value)
                        }
                        className={`${inputCls} cursor-not-allowed opacity-45`}
                    />
                </Field>
            )}
        </SectionCard>
    );
};

export default Fechas;
