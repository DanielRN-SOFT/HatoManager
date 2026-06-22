import { Link } from "@inertiajs/react";
import { MdOutlineArrowForward } from "react-icons/md";

const HeroSection = () => {
    return (
        <section className="relative flex h-[500px] items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/ganado-hero.png"
                    alt="Ganado de alta calidad"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8">
                <div className="max-w-2xl">
                    <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-6xl">
                        Compra ganado de la mejor calidad
                    </h1>
                    <p className="mb-8 text-xl font-medium leading-relaxed text-white/90">
                        Conectamos compradores con los mejores ganaderos del
                        país. Venta directa y segura para fortalecer tu hato.
                    </p>
                    <Link
                        href={'/sales'}
                        className="flex w-fit items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-on-primary transition-all hover:bg-primary-container"
                    >
                        Explorar Catálogo
                        <MdOutlineArrowForward className="text-2xl" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
