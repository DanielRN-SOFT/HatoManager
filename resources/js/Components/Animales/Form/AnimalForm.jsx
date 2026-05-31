// resources/js/Components/Animales/AnimalForm.jsx
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AccionesForm from './AccionesForm';
import FieldError from './FieldError';
import FieldForm from './FieldForm';
import Header from './Header';
import InputFile from './InputFile';
import PreviewImagen from './PreviewImagen';
import SectionForm from './SectionForm';

const AnimalForm = ({ animal, onCancel, categoriasAnimal, razas }) => {
    const { data, setData, post, processing, errors } = useForm({
        photo: animal?.photo ?? '',
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
    });

    const [preview, setPreview] = useState(animal?.photo ?? null);

    function handlePhoto(e) {
        const file = e.target.files[0];
        if (!file) return;
        setData('photo', file);
        setPreview(URL.createObjectURL(file));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (animal) {
            post(route('animales.update', animal.id), {
                forceFormData: true,
                _method: 'PUT',
                onSuccess: onCancel,
            });
        } else {
            post(route('animales.store'), {
                forceFormData: true,
                onSuccess: onCancel,
            });
        }
    }

    return (
        <div className="w-full">
            {/* Header */}
            <Header animal={animal} />

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Foto */}
                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                        Foto del animal
                    </label>

                    {preview ? (
                        <PreviewImagen
                            preview={preview}
                            data={data}
                            setPreview={setPreview}
                            handlePhoto={handlePhoto}
                        />
                    ) : (
                        <InputFile handlePhoto={handlePhoto} />
                    )}

                    {errors.photo && <FieldError msg={errors.photo} />}
                </div>

                {/* Identificación */}
                <SectionForm label="Identificación">
                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                        <FieldForm
                            label="Nombre"
                            icon="badge"
                            error={errors.name}
                        >
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Ej. Lola"
                                className="field-input"
                            />
                        </FieldForm>

                        <FieldForm
                            label="Arete #"
                            icon="sell"
                            error={errors.ear_tag}
                        >
                            <input
                                type="number"
                                value={data.ear_tag}
                                onChange={(e) =>
                                    setData('ear_tag', e.target.value)
                                }
                                placeholder="Ej. 4502"
                                className="field-input"
                            />
                        </FieldForm>

                        <FieldForm
                            label="Género"
                            icon="transgender"
                            error={errors.sex}
                        >
                            <select
                                value={data.sex}
                                onChange={(e) => setData('sex', e.target.value)}
                                className="field-input"
                            >
                                <option value="">Seleccionar</option>
                                <option value="M">♂ Macho</option>
                                <option value="H">♀ Hembra</option>
                            </select>
                        </FieldForm>

                        <FieldForm
                            label="Estado"
                            icon="info"
                            error={errors.status}
                        >
                            <input
                                type="text"
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                placeholder="Ej. Activo"
                                className="field-input"
                            />
                        </FieldForm>
                    </div>
                </SectionForm>

                {/* Clasificación */}
                <SectionForm label="Clasificación">
                    <div className="grid grid-cols-2 gap-5">
                        <FieldForm
                            label="Raza"
                            icon="pets"
                            error={errors.breed_id}
                        >
                            <select
                                value={data.breed_id}
                                onChange={(e) =>
                                    setData('breed_id', e.target.value)
                                }
                                className="field-input"
                            >
                                <option value="">Seleccionar</option>
                                {razas.map((raza) => (
                                    <option key={raza.id} value={raza.id}>
                                        {raza.name}
                                    </option>
                                ))}
                            </select>
                        </FieldForm>

                        <FieldForm
                            label="Categoría"
                            icon="category"
                            error={errors.animal_category_id}
                        >
                            <select
                                value={data.animal_category_id}
                                onChange={(e) =>
                                    setData(
                                        'animal_category_id',
                                        e.target.value,
                                    )
                                }
                                className="field-input"
                            >
                                <option value="">Seleccionar</option>
                                {categoriasAnimal.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </FieldForm>
                    </div>
                </SectionForm>

                {/* Fechas */}
                <SectionForm label="Fechas">
                    <div className="grid grid-cols-2 gap-5">
                        <FieldForm
                            label="Fecha de nacimiento"
                            icon="cake"
                            error={errors.birth_date}
                        >
                            <input
                                type="date"
                                value={data.birth_date}
                                onChange={(e) =>
                                    setData('birth_date', e.target.value)
                                }
                                className="field-input"
                            />
                        </FieldForm>

                        <FieldForm
                            label="Fecha de publicación"
                            icon="calendar_month"
                            error={errors.publication_date}
                        >
                            <input
                                type="date"
                                value={data.publication_date}
                                onChange={(e) =>
                                    setData('publication_date', e.target.value)
                                }
                                className="field-input"
                            />
                        </FieldForm>
                    </div>
                </SectionForm>

                {/* Precios y peso */}
                <SectionForm label="Precios y peso">
                    <div className="grid grid-cols-3 gap-5">
                        <FieldForm
                            label="Precio"
                            icon="payments"
                            error={errors.price}
                        >
                            <input
                                type="number"
                                step="0.0001"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                placeholder="0.00"
                                className="field-input"
                            />
                        </FieldForm>

                        <FieldForm
                            label="Peso objetivo"
                            icon="scale"
                            error={errors.target_weight}
                        >
                            <input
                                type="number"
                                value={data.target_weight}
                                onChange={(e) =>
                                    setData('target_weight', e.target.value)
                                }
                                placeholder="Kg"
                                className="field-input"
                            />
                        </FieldForm>

                        <FieldForm
                            label="Precio / kg"
                            icon="price_change"
                            error={errors.price_weight}
                        >
                            <input
                                type="number"
                                step="0.0001"
                                value={data.price_weight}
                                onChange={(e) =>
                                    setData('price_weight', e.target.value)
                                }
                                placeholder="0.00"
                                className="field-input"
                            />
                        </FieldForm>
                    </div>
                </SectionForm>

                {/* Información adicional */}
                <SectionForm label="Información adicional">
                    <div className="grid grid-cols-2 gap-5">
                        <FieldForm
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
                                className="field-input resize-none"
                            />
                        </FieldForm>

                        <FieldForm
                            label="Descripción (opcional)"
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
                                className="field-input resize-none"
                            />
                        </FieldForm>
                    </div>
                </SectionForm>

                {/* Acciones */}
                <AccionesForm
                    onCancel={onCancel}
                    processing={processing}
                    animal={animal}
                />
            </form>
        </div>
    );
};

export default AnimalForm;
