import Modal from '@/Components/Modal';
import ModalFormRole from '@/Components/Roles/ModalFormRole';
import RoleFilterBar from '@/Components/Roles/RoleFilterBar';
import RoleTable from '@/Components/Roles/RoleTable';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ roles, permissions, filters }) {
    const [showModalCrear, setShowModalCrear] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Roles" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Roles</h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Administra los roles y sus permisos asignados
                    </p>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        add_moderator
                    </span>
                    Nuevo rol
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="lg"
            >
                <ModalFormRole
                    permissions={permissions}
                    onClose={() => setShowModalCrear(false)}
                />
            </Modal>

            <div className="space-y-4">
                <RoleFilterBar filters={filters} />
                <RoleTable roles={roles} permissions={permissions} />
            </div>
        </AuthenticatedLayout>
    );
}
