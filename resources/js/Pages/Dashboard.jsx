import AlertasDashboard from '@/Components/Dashboard/AlertasDashboard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ alertas, totales, tab }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="mx-auto px-4 py-6">
                <AlertasDashboard
                    alertas={alertas}
                    totales={totales}
                    tab={tab}
                />
            </div>
        </AuthenticatedLayout>
    );
}
