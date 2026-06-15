const Finca = ({animal}) => {
    return (
        <>
            {animal.farm && (
                <>
                    <div className="my-5 h-px bg-outline-variant" />
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">
                            home_pin
                        </span>
                        <div>
                            <p className="text-sm font-bold text-on-surface">
                                {animal.farm.name}
                            </p>
                            {animal.farm.department && (
                                <p className="text-xs text-on-surface-variant">
                                    {animal.farm.department}
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Finca;
