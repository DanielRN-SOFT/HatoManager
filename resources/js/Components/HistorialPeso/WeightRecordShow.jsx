import Modal from '../Modal';

const scoreConfig = {
    1: {
        label: 'Extremadamente flaco',
        color: 'bg-red-50 text-red-700 border-red-100',
    },
    2: {
        label: 'Flaco',
        color: 'bg-orange-50 text-orange-700 border-orange-100',
    },
    3: {
        label: 'Moderado / Promedio',
        color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    4: {
        label: 'Obeso / Gordo',
        color: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    5: {
        label: 'Extremadamente gordo',
        color: 'bg-rose-50 text-rose-700 border-rose-100',
    },
};

const DetailCard = ({ label, value, icon }) => (
    <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
        <p className="mb-1.5 flex items-center gap-1.5 text-xs text-gray-400">
            <span className="material-symbols-outlined text-[14px]">
                {icon}
            </span>
            {label}
        </p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
);

const WeightRecordShow = ({ show, onClose, record }) => {
    const animal = record?.animal;
    const score = record?.body_condition_score;
    const scoreInfo = scoreConfig[score];

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3.5">
                    {animal?.photo ? (
                        <img
                            src={animal.photo}
                            alt={animal.name}
                            className="h-14 w-14 rounded-full border border-gray-200 object-cover"
                        />
                    ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-green-50 text-lg font-semibold text-green-700">
                            {animal?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-gray-900">
                            {animal?.name}
                        </h2>
                        <span className="text-sm text-gray-400">
                            Arete #{animal?.ear_tag}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            close
                        </span>
                    </button>
                </div>

                {/* Peso destacado */}
                <div className="mb-5 flex items-center justify-between rounded-xl border border-green-100 bg-green-50/80 px-5 py-4">
                    <div>
                        <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-green-600">
                            Peso registrado
                        </p>
                        <p className="text-3xl font-bold text-green-700">
                            {record?.weight}
                            <span className="ml-1 text-base font-normal text-green-500">
                                kg
                            </span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-green-600">
                            Fecha
                        </p>
                        <p className="text-sm font-medium text-green-700">
                            {record?.weight_date
                                ? new Date(
                                      record.weight_date,
                                  ).toLocaleDateString('es-CO', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                  })
                                : '—'}
                        </p>
                        <p className="text-xs text-green-500">
                            {record?.weight_date
                                ? new Date(
                                      record.weight_date,
                                  ).toLocaleTimeString('es-CO', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                  })
                                : ''}
                        </p>
                    </div>
                </div>

                {/* Condición corporal */}
                {scoreInfo && (
                    <div
                        className={`mb-5 flex items-center justify-between rounded-xl border px-4 py-3 ${scoreInfo.color}`}
                    >
                        <div>
                            <p className="mb-0.5 text-xs font-medium uppercase tracking-wide opacity-60">
                                Condición corporal
                            </p>
                            <p className="text-sm font-semibold">
                                {scoreInfo.label}
                            </p>
                        </div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span
                                    key={i}
                                    className={`h-2.5 w-2.5 rounded-full border transition-all ${
                                        i <= score
                                            ? 'border-current bg-current opacity-80'
                                            : 'border-current bg-transparent opacity-20'
                                    }`}
                                />
                            ))}
                            <span className="ml-1 text-sm font-bold">
                                {score}/5
                            </span>
                        </div>
                    </div>
                )}

                {/* Detalles */}
                <div className="mb-5 grid grid-cols-2 gap-3">
                    <DetailCard
                        label="Método de pesaje"
                        icon="scale"
                        value={record?.weight_method?.name ?? '—'}
                    />
                    <DetailCard
                        label="Etapa productiva"
                        icon="timeline"
                        value={record?.productive_stage?.name ?? '—'}
                    />
                    <DetailCard
                        label="Temperatura ambiente"
                        icon="thermometer"
                        value={
                            record?.room_temperature
                                ? `${parseFloat(record.room_temperature).toFixed(1)} °C`
                                : '—'
                        }
                    />
                    <DetailCard
                        label="Ayuno previo"
                        icon="no_meals"
                        value={record?.previous_fast ? 'Sí' : 'No'}
                    />
                </div>

                {/* Observaciones */}
                {record?.observations && (
                    <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-amber-600">
                            <span className="material-symbols-outlined text-[14px]">
                                sticky_note_2
                            </span>
                            Observaciones
                        </p>
                        <p className="text-sm leading-relaxed text-amber-900">
                            {record.observations}
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default WeightRecordShow;
