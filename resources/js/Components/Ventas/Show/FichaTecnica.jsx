function getAge(birthDate) {
    if (!birthDate) return '—';
    const birth = new Date(birthDate);
    const now = new Date();
    let months =
        (now.getFullYear() - birth.getFullYear()) * 12 +
        (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) months -= 1;
    if (months < 1) return 'Recién nacido';
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    const parts = [];
    if (years > 0) parts.push(`${years} año${years > 1 ? 's' : ''}`);
    if (remMonths > 0)
        parts.push(`${remMonths} mes${remMonths > 1 ? 'es' : ''}`);
    return parts.join(' y ');
}

function Spec({ icon, label, value }) {
    return (
        <div className="flex items-center gap-2.5 rounded-xl bg-surface-container p-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <span className="material-symbols-outlined text-[15px] text-primary">
                    {icon}
                </span>
            </div>
            <div className="min-w-0">
                <p className="text-[11px] leading-tight text-on-surface-variant">
                    {label}
                </p>
                <p className="truncate text-[13px] font-semibold leading-tight text-on-surface">
                    {value}
                </p>
            </div>
        </div>
    );
}

const FichaTecnica = ({ animal }) => {
    return (
        <div className="grid grid-cols-2 gap-2">
            <Spec icon="pets" label="Raza" value={animal.breed?.name || '—'} />
            <Spec
                icon={animal.sex === 'Macho' ? 'male' : 'female'}
                label="Sexo"
                value={animal.sex || '—'}
            />
            <Spec icon="cake" label="Edad" value={getAge(animal.birth_date)} />
            <Spec
                icon="monitor_weight"
                label="Peso objetivo"
                value={
                    animal.target_weight ? `${animal.target_weight} kg` : '—'
                }
            />
        </div>
    );
};
export default FichaTecnica;
