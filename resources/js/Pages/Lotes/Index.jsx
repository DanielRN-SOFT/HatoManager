import LoteFilterBar from '@/Components/Lotes/LoteFilterBar';
import LoteTable from '@/Components/Lotes/LoteTable';
import ModalFormLote from '@/Components/Lotes/ModalFormLote';
import Modal from '@/Components/Modal';
import Flash from '@/Components/Shared/Flash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ paddocks, filters, typeGrasses }) {
    console.log(paddocks);
    const [showModalCrear, setShowModalCrear] = useState(false);
    return (
        <AuthenticatedLayout>
            <Head title="Métodos de Pesaje" />

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 p-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-container sm:h-12 sm:w-12">
                        <span className="material-symbols-outlined text-[20px] text-on-primary sm:text-[24px]">
                            location_on
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                            Gestión
                        </p>
                        <h1 className="text-xl font-bold text-on-surface sm:text-2xl">
                            Lotes
                        </h1>
                        <p className="mt-0.5 text-xs text-on-surface-variant">
                            Administra los lotes disponibles para registrar
                            animales
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setShowModalCrear(true)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        add_circle
                    </span>
                    Nuevo lote
                </button>
            </div>

            <Flash />

            <Modal
                show={showModalCrear}
                onClose={() => setShowModalCrear(false)}
                closeable
                maxWidth="lg"
            >
                <ModalFormLote
                    typeGrasses={typeGrasses}
                    onClose={() => setShowModalCrear(false)}
                />
            </Modal>

            <div className="space-y-4">
                <LoteFilterBar filters={filters} />
                <LoteTable typeGrasses={typeGrasses} paddocks={paddocks} />
            </div>
        </AuthenticatedLayout>
    );
}
