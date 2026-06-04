import InfoRow from "./InfoRow";
import SectionCard from "./SectionCard";


const InformacionGeneral = ({animal, fmt}) => {
  return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Información general */}
          <SectionCard icon="info" title="Información general">
              <InfoRow icon="pets" label="Raza" value={animal.breed?.name} />
              <InfoRow
                  icon="category"
                  label="Categoría"
                  value={animal.animal_category?.name}
              />
              <InfoRow
                  icon="home"
                  label="Corral"
                  value={animal.paddock?.name}
              />
              <InfoRow
                  icon="grass"
                  label="Tipo de pasto"
                  value={animal.paddock?.type_of_grass}
              />
              <InfoRow
                  icon="straighten"
                  label="Área corral"
                  value={
                      animal.paddock?.area ? `${animal.paddock.area} ha` : null
                  }
              />
              <InfoRow icon="sell" label="Arete" value={`#${animal.ear_tag}`} />
              <InfoRow
                  icon="calendar_today"
                  label="Publicación"
                  value={fmt(animal.publication_date)}
              />
          </SectionCard>

          {/* Descripción / Antecedentes */}
          <SectionCard icon="description" title="Descripción y antecedentes">
              {animal.description && (
                  <div className="mb-4">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                          Descripción
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700">
                          {animal.description}
                      </p>
                  </div>
              )}
              {animal.previous_diseases && (
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                      <div className="mb-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px] text-amber-500">
                              warning
                          </span>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600">
                              Enfermedades previas
                          </p>
                      </div>
                      <p className="text-sm text-amber-800">
                          {animal.previous_diseases}
                      </p>
                  </div>
              )}
              {animal.reason_to_death && (
                  <div className="mt-3 rounded-xl border border-red-100 bg-red-50 p-3">
                      <div className="mb-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px] text-red-500">
                              skull
                          </span>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600">
                              Causa de muerte
                          </p>
                      </div>
                      <p className="text-sm text-red-800">
                          {animal.reason_to_death}
                      </p>
                  </div>
              )}
              {!animal.description &&
                  !animal.previous_diseases &&
                  !animal.reason_to_death && (
                      <p className="py-4 text-center text-sm text-gray-400">
                          Sin información adicional
                      </p>
                  )}
          </SectionCard>
      </div>
  );
}

export default InformacionGeneral
