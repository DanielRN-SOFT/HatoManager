import ContactFilterBar from '@/Components/Contacto/ContactFilterBar';
import ContactTable from '@/Components/Contacto/ContactTable';
import ModalDetalleContact from '@/Components/Contacto/ModalDetalleContact';
import ModalEliminarContact from '@/Components/Contacto/ModalEliminarContact';
import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ contacts, topics, filters }) {
    const [modalDetalle, setModalDetalle] = useState(null);
    const [modalEliminar, setModalEliminar] = useState(null);

    return (
        <AuthenticatedLayout>
            <Head title="Mensajes de Contacto" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Mensajes de Contacto
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Bandeja de mensajes recibidos desde el formulario de
                        contacto
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                        mail
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                        {contacts.total}{' '}
                        {contacts.total === 1 ? 'mensaje' : 'mensajes'}
                    </span>
                </div>
            </div>

            <Flash />

            {/* Modal Detalle */}
            <Modal
                show={!!modalDetalle}
                onClose={() => setModalDetalle(null)}
                closeable
                maxWidth="md"
            >
                <ModalDetalleContact
                    contact={modalDetalle}
                    onClose={() => setModalDetalle(null)}
                    onEliminar={() => {
                        setModalEliminar(modalDetalle);
                        setModalDetalle(null);
                    }}
                />
            </Modal>

            {/* Modal Eliminar */}
            <Modal
                show={!!modalEliminar}
                onClose={() => setModalEliminar(null)}
                closeable
                maxWidth="sm"
            >
                <ModalEliminarContact
                    contact={modalEliminar}
                    onClose={() => setModalEliminar(null)}
                />
            </Modal>

            <div className="space-y-4">
                <ContactFilterBar filters={filters} topics={topics} />
                <ContactTable
                    contacts={contacts}
                    setModalDetalle={setModalDetalle}
                    setModalEliminar={setModalEliminar}
                />
            </div>
        </AuthenticatedLayout>
    );
}
