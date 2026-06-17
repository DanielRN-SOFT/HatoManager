import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function InviteForm({ farm }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (showModal) setTimeout(() => inputRef.current?.focus(), 100);
    }, [showModal]);

    function submit(e) {
        e.preventDefault();
        post(route('veterinarians.invite', farm.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('email');
                setShowModal(false);
            },
        });
    }

    return (
        <>
            <Modal
                show={showModal}
                maxWidth="sm"
                closeable={true}
                onClose={() => {
                    setShowModal(false);
                    reset('email');
                }}
            >
                <div className="p-6">
                    {/* Ícono */}
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <span className="material-symbols-outlined text-2xl text-primary">
                            person_add
                        </span>
                    </div>

                    {/* Título */}
                    <h3 className="mb-1 text-center text-base font-semibold text-gray-800">
                        Invitar veterinario
                    </h3>
                    <p className="mb-6 text-center text-sm text-gray-500">
                        Ingresa el correo del veterinario que tendrá acceso a{' '}
                        <span className="font-medium text-gray-700">
                            {farm.name}
                        </span>
                        .
                    </p>

                    {/* Input */}
                    <div className="mb-2">
                        <input
                            ref={inputRef}
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="correo@veterinario.com"
                            className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                                errors.email
                                    ? 'border-red-400'
                                    : 'border-gray-200'
                            }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Aviso */}
                    <p className="mb-6 flex items-center gap-1.5 text-xs text-gray-400">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 14 }}
                        >
                            info
                        </span>
                        Si el correo no tiene cuenta, recibirá un enlace de
                        registro válido por 48 horas.
                    </p>

                    {/* Acciones */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setShowModal(false);
                                reset('email');
                            }}
                            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={submit}
                            disabled={processing}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: 16 }}
                            >
                                send
                            </span>
                            {processing ? 'Enviando…' : 'Enviar invitación'}
                        </button>
                    </div>
                </div>
            </Modal>

            <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 px-4 py-2.5 text-sm text-gray-400 transition hover:border-primary hover:text-primary"
            >
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18 }}
                >
                    person_add
                </span>
                Invitar veterinario
            </button>
        </>
    );
}
