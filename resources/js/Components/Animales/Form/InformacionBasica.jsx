import { useState } from 'react';
import Field from './Field';
import PhotoZone from './PhotoZone';
import SectionCard from './SectionCard';

const InformacionBasica = ({
    setData,
    data,
    animal,
    errors,
    inputCls,
    selectCls,
}) => {
    function handlePhoto(e) {
        const file = e.target.files[0];
        if (!file) return;
        setData('photo', file);
        setPreview(URL.createObjectURL(file));
    }

    const [preview, setPreview] = useState(animal?.photo ?? null);
    const [showReason, setShowReason] = useState(data.status === 'Muerto');

    return (
        <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr]">
            {/* Foto */}
            <SectionCard icon="photo_camera" title="Foto" hint="Opcional">
                <PhotoZone
                    preview={preview}
                    onPhoto={handlePhoto}
                    onClear={() => {
                        setData('photo', '');
                        setPreview(null);
                    }}
                />
                {errors.photo && (
                    <p className="mt-2 text-center text-[11px] text-red-500">
                        {errors.photo}
                    </p>
                )}
            </SectionCard>

            {/* Identificación */}
            <SectionCard icon="badge" title="Identificación">
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Nombre" icon="badge" error={errors.name}>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ej. Lola"
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Arete #" icon="sell" error={errors.ear_tag}>
                        <input
                            type="number"
                            value={data.ear_tag}
                            onChange={(e) => setData('ear_tag', e.target.value)}
                            placeholder="Ej. 4502"
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Género" icon="transgender" error={errors.sex}>
                        <select
                            value={data.sex}
                            onChange={(e) => setData('sex', e.target.value)}
                            className={selectCls}
                        >
                            <option value="">Seleccionar</option>
                            <option value="M">♂ Macho</option>
                            <option value="H">♀ Hembra</option>
                        </select>
                    </Field>

                    {/* Estado — solo visible al editar */}
                    {animal && (
                        <Field label="Estado" icon="info" error={errors.status}>
                            <select
                                value={data.status}
                                onChange={(e) => {
                                    setData('status', e.target.value);
                                    setShowReason(e.target.value === 'Muerto');
                                    // limpiar motivo si cambia a otro estado
                                    if (e.target.value !== 'Muerto') {
                                        setData('reason_to_death', null);
                                    }
                                }}
                                className={selectCls}
                            >
                                <option disabled value=''>Seleccionar</option>
                                <option value="Activo">Activo</option>
                                <option value="Muerto">Muerto</option>
                            </select>
                        </Field>
                    )}
                </div>

                {/* Motivo de fallecimiento — aparece solo si estado = Muerto */}
                {showReason && (
                    <div className="mt-4">
                        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-red-500">
                                    warning
                                </span>
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-red-500">
                                    Motivo de fallecimiento
                                </p>
                            </div>
                            <textarea
                                value={data.reason_to_death ?? ''}
                                onChange={(e) =>
                                    setData('reason_to_death', e.target.value)
                                }
                                placeholder="Describe la causa de fallecimiento del animal..."
                                rows={3}
                                className="w-full resize-none rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100"
                            />
                            {errors.reason_to_death && (
                                <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                                    <span className="material-symbols-outlined text-[12px]">
                                        error
                                    </span>
                                    {errors.reason_to_death}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </SectionCard>
        </div>
    );
};

export default InformacionBasica;
