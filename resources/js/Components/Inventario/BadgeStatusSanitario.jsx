// resources/js/Components/Ganado/SanitaryStatusBadge.jsx

const STATUS = {
    al_dia: {
        label: 'Al día',
        icon: 'check_circle',
        cls: 'bg-[#EAF3DE] text-[#3B6D11]',
    },
    proxima_a_vencer: {
        label: 'Próxima a vencer',
        icon: 'warning',
        cls: 'bg-[#FFF3D6] text-[#F59E0B]',
    },
    vencida: {
        label: 'Vencida',
        icon: 'cancel',
        cls: 'bg-[#FFE5E5] text-[#BA1A1A]',
    },
};

const BadgeStatusSanitario = ({ status }) => {
    const { label, icon, cls } = STATUS[status] ?? STATUS.al_dia;
    return (
        <span
            className={`text-label-sm inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-bold ${cls}`}
        >
            <span className="material-symbols-outlined text-[16px]">
                {icon}
            </span>
            {label}
        </span>
    );
};

export default BadgeStatusSanitario;
