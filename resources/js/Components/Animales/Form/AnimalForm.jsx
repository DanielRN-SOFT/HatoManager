// resources/js/Components/Animales/AnimalForm.jsx
import { router, useForm } from '@inertiajs/react';
import Clasificacion from './Clasificacion';
import Fechas from './Fechas';
import Field from './Field';
import Header from './Header';
import InformacionBasica from './InformacionBasica';
import SectionCard from './SectionCard';
import PreciosPeso from './PreciosPeso';
import InformacionAdicional from './InformacionAdicional';
import Acciones from './Acciones';

const inputCls =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10';
const selectCls =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 cursor-pointer';


/* ─────────────────────────────────────────────
   Main Form
───────────────────────────────────────────── */
const AnimalForm = ({ animal, categoriasAnimal, razas }) => {
    const { data, setData, post, processing, errors } = useForm({
        _method: animal ? 'PUT' : 'POST',
        photo: '',
        name: animal?.name ?? '',
        ear_tag: animal?.ear_tag ?? '',
        sex: animal?.sex ?? '',
        birth_date: animal?.birth_date ?? '',
        status: animal?.status ?? '',
        description: animal?.description ?? '',
        previous_diseases: animal?.previous_diseases ?? '',
        price: animal?.price ?? '',
        target_weight: animal?.target_weight ?? '',
        price_weight: animal?.price_weight ?? '',
        publication_date: animal?.publication_date ?? '',
        animal_category_id: animal?.animal_category?.id ?? '',
        breed_id: animal?.breed?.id ?? '',
        reason_to_death:
            animal?.status === 'Muerto' ? animal?.reason_to_death : null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        animal
            ? post(route('animals.update', animal.id), { forceFormData: true })
            : post(route('animals.store'), { forceFormData: true });
    }


    function handleCancel() {
        router.visit(route('animals.index'));
    }

    return (
        <div className="w-full">
            {/* ── Page Header ── */}
            <Header animal={animal} handleCancel={handleCancel} />

            <form onSubmit={handleSubmit}>
                {/* ════════════════════════════════════════
                    ROW 1 — Foto (columna izq.) + Identificación (columna der.)
                ════════════════════════════════════════ */}
                <InformacionBasica
                    setData={setData}
                    data={data}
                    animal={animal}
                    errors={errors}
                    inputCls={inputCls}
                    selectCls={selectCls}
                />

                {/* ════════════════════════════════════════
                    ROW 2 — Clasificación + Fechas
                ════════════════════════════════════════ */}
                <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Clasificación */}
                    <Clasificacion
                        errors={errors}
                        data={data}
                        setData={setData}
                        selectCls={selectCls}
                        razas={razas}
                        categoriasAnimal={categoriasAnimal}
                    />

                    {/* Fechas */}
                    <Fechas
                        errors={errors}
                        setData={setData}
                        data={data}
                        inputCls={inputCls}
                    />
                </div>

                {/* ════════════════════════════════════════
                    ROW 3 — Precios y peso (full width)
                ════════════════════════════════════════ */}
                <PreciosPeso errors={errors} data={data} setData={setData} inputCls={inputCls}/>

                {/* ════════════════════════════════════════
                    ROW 4 — Info adicional (full width, 2 col internas)
                ════════════════════════════════════════ */}
                <InformacionAdicional errors={errors} data={data} setData={setData}/>

                {/* ── Acciones ── */}
              <Acciones handleCancel={handleCancel} processing={processing} animal={animal}/>
            </form>
        </div>
    );
};

export default AnimalForm;
