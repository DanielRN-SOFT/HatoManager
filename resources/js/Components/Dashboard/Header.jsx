import { router } from "@inertiajs/react";
import { GrDashboard } from "react-icons/gr";
import { MdDashboardCustomize } from "react-icons/md";

const Header = ({finca}) => {
    return (
        <div className="mb-5 flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-container">
                    <MdDashboardCustomize className="text-[22px] text-on-primary" />
                </div>
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                        {finca?.nombre ?? 'Mi Finca'}
                    </p>
                    <h1 className="text-xl font-bold leading-tight text-on-surface">
                        Dashboard
                    </h1>
                    <p className="mt-0.5 text-xs text-on-surface-variant">
                        Visualiza todas las estadisticas y observa una vista general
                    </p>
                </div>
            </div>
            <button
                onClick={() => router.visit(route('animals.index'))}
                className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all hover:shadow-lg active:scale-95"
            >
                <span className="material-symbols-outlined text-[18px]">
                    pets
                </span>
                Ver hato
            </button>
        </div>
    );
};

export default Header;
