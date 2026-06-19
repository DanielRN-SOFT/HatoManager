import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import ModalFormUsuario from '@/Components/Usuarios/ModalFormUsuario';
import UserFilterBar from '@/Components/Usuarios/UserFilterBar';
import UserTable from '@/Components/Usuarios/UserTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ usuarios, roles, filters }) {
    const [showModalCrear, setShowModalCrear] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Gestión de Usuarios" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Gestión de Usuarios
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Administra los usuarios y sus roles en el sistema
                    </p>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        person_add
                    </span>
                    Nuevo usuario
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="md"
            >
                <ModalFormUsuario
                    roles={roles}
                    onClose={() => setShowModalCrear(false)}
                />
            </Modal>

            <div className="space-y-4">
                <UserFilterBar filters={filters} roles={roles} />
                <UserTable usuarios={usuarios} roles={roles} />
            </div>
        </AuthenticatedLayout>
    );
}
