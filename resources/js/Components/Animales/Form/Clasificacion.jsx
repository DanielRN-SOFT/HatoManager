import Field from './Field';
import SectionCard from './SectionCard';

const Clasificacion = ({
    errors,
    data,
    selectCls,
    razas,
    setData,
    categoriasAnimal,
    lotes,
}) => {
    console.log(data)
    return (
        <SectionCard icon="category" title="Clasificación">
            <div className="grid grid-cols-2 gap-4">
                <Field label="Raza" icon="pets" error={errors.breed_id}>
                    <select
                        value={data.breed_id}
                        onChange={(e) => setData('breed_id', e.target.value)}
                        className={selectCls}
                    >
                        <option value="">Seleccionar</option>
                        {razas.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field
                    label="Categoría"
                    icon="category"
                    error={errors.animal_category_id}
                >
                    <select
                        value={data.animal_category_id}
                        onChange={(e) =>
                            setData('animal_category_id', e.target.value)
                        }
                        className={selectCls}
                    >
                        <option value="">Seleccionar</option>
                        {categoriasAnimal.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <Field
                className="mt-5"
                label="Lote"
                icon={'location_on'}
                error={errors.paddock_id}
            >
                <select
                    value={data.paddock_id}
                    onChange={(e) => setData('paddock_id', e.target.value)}
                    className={`${selectCls} w-full`}
                >
                    <option value="">Seleccionar</option>
                    {lotes.map((lote) => {
                        return (
                            <option key={lote.id} value={lote.id}>
                                {lote.name}
                            </option>
                        );
                    })}
                </select>
            </Field>
        </SectionCard>
    );
};

export default Clasificacion;
