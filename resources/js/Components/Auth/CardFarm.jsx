const CardFarm = ({ farm }) => {
    const { name, city, department } = farm;
    return (
        <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-surface-dim bg-white p-5 transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-3xl">
                        agriculture
                    </span>
                </div>
                <div>
                    <h3 className="text-lg font-bold leading-tight text-primary">
                        {name}
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                        {city} , {department}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="rounded-full bg-[#EAF3DE] px-3 py-1 text-xs font-semibold text-primary">
                    150 animales
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-outline-variant transition-colors group-hover:border-primary/50"></div>
            </div>
        </div>
    );
};

export default CardFarm;
