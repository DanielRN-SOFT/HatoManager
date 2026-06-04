import Field from './Field';
import SectionCard from './SectionCard';

const Clasificacion = ({
    errors,
    data,
    selectCls,
    razas,
    setData,
    categoriasAnimal,
}) => {
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
        </SectionCard>
    );
};

export default Clasificacion;
