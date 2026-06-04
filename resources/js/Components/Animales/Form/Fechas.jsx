import Field from "./Field";
import SectionCard from "./SectionCard";

const Fechas = ({errors, data, setData, inputCls}) => {
    return (
        <SectionCard icon="calendar_today" title="Fechas">
            <div className="grid grid-cols-2 gap-4">
                <Field
                    label="Fecha de nacimiento"
                    icon="cake"
                    error={errors.birth_date}
                >
                    <input
                        type="date"
                        value={data.birth_date?.split('T')[0] ?? ''}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className={inputCls}
                    />
                </Field>

                <Field
                    label="Fecha de publicación"
                    icon="calendar_today"
                    error={errors.publication_date}
                >
                    <input
                        type="date"
                        value={data.publication_date ?? ''}
                        onChange={(e) =>
                            setData('publication_date', e.target.value)
                        }
                        className={inputCls}
                    />
                </Field>
            </div>
        </SectionCard>
    );
};

export default Fechas;
