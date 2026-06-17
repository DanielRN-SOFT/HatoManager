import { router } from "@inertiajs/react";
import CertificadoLoteBtn from "./CertificadoLoteBtn";
import { useRole } from "@/hooks/useRole";
import { SiSwisscows } from "react-icons/si";

const Header = ({finca}) => {
     const { isGanadero } = useRole();
        function handleNuevo() {
            router.visit(route('animals.create'));
        }
    return (
        <div className="mb-6 flex flex-col gap-4 p-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-container sm:h-12 sm:w-12">
                    <SiSwisscows className="text-[20px] text-on-primary sm:text-[24px]" />
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                        {finca.nombre}
                    </p>
                    <h1 className="text-xl font-bold text-on-surface sm:text-2xl">
                        Inventario del hato
                    </h1>
                </div>
            </div>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <CertificadoLoteBtn farmId={finca.id} />
                {isGanadero && (
                    <button
                        onClick={handleNuevo}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/40 active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            add_circle
                        </span>
                        Registrar animal
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
