import Field from './Field';
import SectionCard from './SectionCard';

const InformacionAdicional = ({ errors, data, setData }) => {
    const textareaCls =
        'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 resize-none';

    return (
        <div className="mb-5">
            <SectionCard
                icon="description"
                title="Información adicional"
                hint="Opcional"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                        label="Enfermedades previas"
                        icon="vaccines"
                        error={errors.previous_diseases}
                    >
                        <textarea
                            value={data.previous_diseases}
                            onChange={(e) =>
                                setData('previous_diseases', e.target.value)
                            }
                            placeholder="Describe enfermedades o tratamientos anteriores..."
                            rows={4}
                            className={textareaCls}
                        />
                    </Field>

                    <Field
                        label="Descripción"
                        icon="notes"
                        error={errors.description}
                    >
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            placeholder="Información adicional sobre el animal..."
                            rows={4}
                            className={textareaCls}
                        />
                    </Field>
                </div>
            </SectionCard>
        </div>
    );
};

export default InformacionAdicional;
