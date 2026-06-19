const Finca = ({ animal }) => {
    if (!animal.farm) return null;
    return (
        <>
            <div className="my-5 h-px bg-outline-variant" />
            <div className="flex items-center gap-2.5 rounded-xl bg-surface-container p-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="material-symbols-outlined text-[15px] text-primary">
                        home_pin
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="text-[11px] leading-tight text-on-surface-variant">
                        Finca de origen
                    </p>
                    <p className="truncate text-[13px] font-bold leading-tight text-on-surface">
                        {animal.farm.name}
                    </p>
                    {animal.farm.department && (
                        <p className="truncate text-[11px] text-on-surface-variant">
                            {animal.farm.department}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
export default Finca;
