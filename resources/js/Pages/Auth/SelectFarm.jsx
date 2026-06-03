import CardFarm from '@/Components/Auth/CardFarm';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const SelectFarm = ({ farms }) => {
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [search, setSearch] = useState('');
    const { post, data, setData, processing } = useForm({
        farm_id: null,
    });

    const filteredFarms = farms.filter((farm) =>
        farm.name.toLowerCase().includes(search.toLowerCase()),
    );

    function handleContinue() {
        if (!selectedFarm) return;
        post(route('select-farm.store'));
    }

    return (
        <main className="mx-auto flex w-full max-w-2xl flex-grow flex-col items-center justify-start px-4 pb-32 pt-4">
            <Head title='Seleccione una finca'></Head>
            {/* Logo section */}
            <div className="flex flex-col items-center gap-1 pt-3">
                <img
                    src="/images/HatoManager-logo.png"
                    alt="HatoManager"
                    className="w-48 object-contain"
                />
            </div>

            <div className="mb-6 text-center">
                <h1 className="mb-2 font-headline text-2xl font-bold text-primary md:text-3xl">
                    Selecciona tu finca activa
                </h1>
                <p className="text-body-md text-on-surface-variant">
                    Los datos del panel corresponderán a la finca seleccionada.
                </p>
            </div>

            {/* Search input */}
            <div className="relative mb-6 w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    search
                </span>
                <input
                    type="text"
                    placeholder="Buscar finca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant bg-surface-variant py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
            </div>

            <div className="w-full space-y-4">
                {filteredFarms.length > 0 ? (
                    filteredFarms.map((farm) => (
                        <CardFarm
                            key={farm.id}
                            farm={farm}
                            selected={selectedFarm === farm.id}
                            animals={farm.animals_count}
                            onSelect={() => {
                                setSelectedFarm(farm.id);
                                setData('farm_id', farm.id);
                            }}
                        />
                    ))
                ) : (
                    <p className="text-center text-sm text-on-surface-variant">
                        No se encontraron fincas.
                    </p>
                )}
            </div>

            <div className="fixed bottom-0 left-0 z-40 flex w-full justify-center border-t border-outline-variant/30 bg-surface p-6">
                <button
                    onClick={handleContinue}
                    disabled={!selectedFarm || processing}
                    className="flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-secondary active:scale-95"
                >
                    {processing ? 'Cargando...' : 'Continuar'}
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </button>
            </div>
        </main>
    );
};

export default SelectFarm;
