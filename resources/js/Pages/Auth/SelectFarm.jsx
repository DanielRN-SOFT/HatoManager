import CardFarm from '@/Components/Auth/CardFarm';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const SelectFarm = ({ farms }) => {
    const [selectedFarm, setSelectedFarm] = useState(null);
    const { post, data, setData, processing } = useForm({
        farm_id: null,
    });

    function handleContinue() {
        if (!selectedFarm) return;
        post(route('select-farm.store'));
    }
    return (
        <main class="mx-auto flex w-full max-w-2xl flex-grow flex-col items-center justify-start px-4 pb-32 pt-16">
            <div class="mb-10 text-center">
                <h1 class="mb-2 font-headline text-2xl font-bold text-primary md:text-3xl">
                    Selecciona tu finca activa
                </h1>
                <p class="text-body-md text-on-surface-variant">
                    Los datos del panel corresponderán a la finca seleccionada.
                </p>
            </div>

            <div class="w-full space-y-4">
                {farms.map((farm) => {
                    return (
                        <CardFarm
                            key={farm.id}
                            farm={farm}
                            selected={selectedFarm === farm.id}
                            onSelect={() => {
                                setSelectedFarm(farm.id);
                                setData('farm_id', farm.id)
                            }}
                        />
                    );
                })}
            </div>

            <div class="fixed bottom-0 left-0 z-40 flex w-full justify-center border-t border-outline-variant/30 bg-surface p-6">
                <button
                    onClick={handleContinue}
                    disabled={!selectedFarm || processing}
                    class="flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-secondary active:scale-95"
                >
                    {processing ? 'Cargando...' : 'Continuar'}
                    <span class="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </main>
    );
};

export default SelectFarm;
