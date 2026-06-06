import Input from './Form/Input';
import Label from './Form/Label';
import Select from './Form/Select';

const WeightRecordForm = ({
    data,
    setData,
    errors,
    animals,
    processing,
    productiveStages,
    weightMethods,
}) => {
    console.log(data);
    return (
        <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-2 gap-5">
                {/* Animal */}
                <div>
                    <Label label={'Animal'} />
                    <Select
                        data={data}
                        campo={'animal_id'}
                        value={data.animal_id}
                        setData={setData}
                        processing={processing}
                    >
                        <option value="">Selecciona un animal</option>
                        {animals.map((animal) => (
                            <option key={animal.id} value={animal.id}>
                                {animal.ear_tag}
                                {animal.name ? ` — ${animal.name}` : ''}
                            </option>
                        ))}
                    </Select>
                    {errors.animal_id && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.animal_id}
                        </p>
                    )}
                </div>

                {/* Fecha del pesaje */}
                <div>
                    <Label label={'Fecha de pesaje'} />
                    <Input
                        type={'datetime-local'}
                        setData={setData}
                        data={data}
                        processing={processing}
                        campo={'weight_date'}
                    />
                    {errors.weight_date && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.weight_date}
                        </p>
                    )}
                </div>
            </div>

            {/* Etapa productiva del animal */}
            <div>
                <Label label={'Etapa Productiva'} />
                <Select
                    data={data}
                    campo={'productive_stage_id'}
                    setData={setData}
                    processing={processing}
                >
                    <option value="">Selecciona una etapa</option>
                    {productiveStages.map((productiveStage) => (
                        <option
                            key={productiveStage.id}
                            value={productiveStage.id}
                        >
                            {productiveStage.name}
                        </option>
                    ))}
                </Select>
                {errors.productive_stage_id && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.productive_stage_id}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-3 gap-5">
                {/* PESO */}
                <div>
                    <Label label={'Peso (KG)'} />
                    <Input
                        campo={'weight'}
                        placeholder={'Ej: 50'}
                        type={'number'}
                        setData={setData}
                        data={data}
                        processing={processing}
                    />
                    {errors.weight && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.weight}
                        </p>
                    )}
                </div>

                {/* Condicion corporal */}
                <div>
                    <Label label={'Condicion Corporal'} />
                    <Select
                        data={data}
                        campo={'body_condition_score'}
                        setData={setData}
                        processing={processing}
                    >
                        <option value="">Puntaje</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Select>
                    {errors.body_condition_score && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.body_condition_score}
                        </p>
                    )}
                </div>

                {/* Metodo de Pesaje */}
                <div>
                    <Label label={'Metodo de Pesaje'} />
                    <Select
                        data={data}
                        campo={'weight_method_id'}
                        setData={setData}
                        processing={processing}
                    >
                        <option value="">Etapa</option>
                        {weightMethods.map((weightMethod) => (
                            <option
                                key={weightMethod.id}
                                value={weightMethod.id}
                            >
                                {weightMethod.name}
                            </option>
                        ))}
                    </Select>
                    {errors.weight_method_id && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.weight_method_id}
                        </p>
                    )}
                </div>
            </div>

            {/* Temperatura ambiente */}
            <div className="grid grid-cols-2 gap-5">
                {/* Temperatura ambiente */}
                <div>
                    <Label label={'Temperatura ambiente (C)'} />
                    <Input
                        placeholder={'Ej: 10'}
                        campo={'room_temperature'}
                        type={'number'}
                        setData={setData}
                        data={data}
                        processing={processing}
                    />
                    {errors.room_temperature && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.room_temperature}
                        </p>
                    )}
                </div>

                <div>
                    <Label label={'¿Ayuno Previo?'} />
                    <div className="flex gap-5">
                        <div className="flex gap-5">
                            {['Si', 'No'].map((option) => (
                                <label
                                    key={option}
                                    className="group flex cursor-pointer items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        name="previous_fast"
                                        value={option}
                                        className="peer sr-only" // oculta el input nativo
                                        checked={
                                            (option == 'Si' &&
                                                data.previous_fast === 1) ||
                                            (option === 'No' &&
                                                data.previous_fast === 0)
                                        }
                                        onChange={(e) =>
                                            setData(
                                                'previous_fast',
                                                option === 'Si' ? 1 : 0,
                                            )
                                        }
                                    />
                                    {/* Círculo visual personalizado */}
                                    <div className="h-4 w-4 rounded-full border-2 border-gray-300 transition-all peer-checked:border-secondary peer-checked:bg-primary" />
                                    <span className="text-sm text-gray-700 peer-checked:text-green-600">
                                        {option}
                                    </span>
                                </label>
                            ))}
                            {errors.previous_fast && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.previous_fast}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notas */}
            <div>
                <div className="flex items-center">
                    <Label label={'Observaciones'} />
                    <span className="mx-2 mb-1 font-normal text-gray-400">
                        (opcional)
                    </span>
                </div>

                <textarea
                    value={data.observations}
                    onChange={(e) => setData('observations', e.target.value)}
                    rows={2}
                    placeholder="Observaciones adicionales..."
                    className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    disabled={processing}
                />
                {errors.observations && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.observations}
                    </p>
                )}
            </div>
        </div>
    );
};

export default WeightRecordForm;
