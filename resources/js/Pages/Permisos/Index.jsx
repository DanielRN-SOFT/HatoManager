import Modal from '@/Components/Modal';
import ModalFormPermission from '@/Components/Permisos/ModalFormPermission';
import PermissionFilterBar from '@/Components/Permisos/PermissionFilterBar';
import PermissionTable from '@/Components/Permisos/PermissionTable';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ permissions, filters }) {
    const [showModalCrear, setShowModalCrear] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Permisos" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Permisos
                    </h1>
                    <p className="mt-0.5 text-xs text-gray-500">
                        Administra los permisos disponibles para asignar a los
                        roles
                    </p>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        add
                    </span>
                    Nuevo permiso
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="sm"
            >
                <ModalFormPermission onClose={() => setShowModalCrear(false)} />
            </Modal>

            <div className="space-y-4">
                <PermissionFilterBar filters={filters} />
                <PermissionTable permissions={permissions} />
            </div>
        </AuthenticatedLayout>
    );
}
