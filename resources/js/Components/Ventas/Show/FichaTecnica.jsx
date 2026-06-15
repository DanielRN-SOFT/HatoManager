const FichaTecnica = ({animal}) => {
    return (
        <div className="grid grid-cols-2 gap-y-4">
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
        <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">
                {icon}
            </span>
            <div>
                <p className="text-xs text-on-surface-variant">{label}</p>
                <p className="text-sm font-semibold text-on-surface">{value}</p>
            </div>
        </div>
    );
}

export default FichaTecnica;
