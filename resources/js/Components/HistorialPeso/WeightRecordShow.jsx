import Modal from '../Modal';

const WeightRecordShow = ({ show, onClose, record }) => {
    const animal = record?.animal;
    console.log(animal);

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                {/* Header: Animal */}
                <div className="mb-6 flex items-center gap-4">
                    {animal?.photo ? (
                        <img
                            src={animal.photo}
                            alt={animal.name}
                            className="h-16 w-16 rounded-full border border-gray-200 object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-xl font-semibold text-gray-500">
                            {animal?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {animal?.name}
                        </h2>
                        <span className="text-sm text-gray-500">
                            Arete #{animal?.ear_tag}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-auto text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Peso destacado */}
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                    <p className="mb-1 text-sm text-green-600">
                        Peso registrado
                    </p>
                    <p className="text-4xl font-bold text-green-700">
                        {record?.weight}{' '}
                        <span className="text-xl font-normal">kg</span>
                    </p>
                    <p className="mt-1 text-sm text-green-600">
                        {record?.weight_date
                            ? new Date(record.weight_date).toLocaleDateString(
                                  'es-CO',
                                  {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric',
                                      second: 'numeric',
                                  },
                              )
                            : '—'}
                    </p>
                </div>

                {/* Detalles del registro */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-3">
                        <p className="mb-1 text-xs text-gray-500">
                            Método de pesaje
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            {record?.weight_method?.name ?? '—'}
                        </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                        <p className="mb-1 text-xs text-gray-500">
                            Etapa productiva
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            {record?.productive_stage?.name ?? '—'}
                        </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                        <p className="mb-1 text-xs text-gray-500">
                            Condición corporal
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            {record?.body_condition_score ?? '—'} / 5
                        </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                        <p className="mb-1 text-xs text-gray-500">
                            Temperatura ambiente
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            {record?.room_temperature
                                ? `${parseFloat(record.room_temperature).toFixed(1)} °C`
                                : '—'}
                        </p>
                    </div>
                    <div className="col-span-2 rounded-lg bg-gray-50 p-3">
                        <p className="mb-1 text-xs text-gray-500">
                            Ayuno previo
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                            {record?.previous_fast ? 'Sí' : 'No'}
                        </p>
                    </div>
                </div>

                {/* Observaciones */}
                {record?.observations && (
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                        <p className="mb-1 text-xs font-medium text-yellow-600">
                            Observaciones
                        </p>
                        <p className="text-sm text-yellow-800">
                            {record.observations}
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default WeightRecordShow;
