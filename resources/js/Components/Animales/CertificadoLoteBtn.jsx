const CertificadoLoteBtn = ({ farmId }) => {
    return (
        <div className="group relative">
            <button className="flex items-center gap-2 rounded-2xl border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition-all hover:bg-green-50 active:scale-95">
                <span className="material-symbols-outlined text-[18px]">
                    verified
                </span>
                Certificado lote
            </button>
            <div className="absolute right-0 z-20 hidden w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg group-hover:block">
                <button
                    onClick={() =>
                        window.open(
                            route('health.certificado.lote', {
                                farm: farmId,
                                modo: 'color',
                            }),
                            '_blank',
                        )
                    }
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                    <span className="material-symbols-outlined text-[15px]">
                        picture_as_pdf
                    </span>
                    Color
                </button>
                <button
                    onClick={() =>
                        window.open(
                            route('health.certificado.lote', {
                                farm: farmId,
                                modo: 'byn',
                            }),
                            '_blank',
                        )
                    }
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50"
                >
                    <span className="material-symbols-outlined text-[15px]">
                        picture_as_pdf
                    </span>
                    Blanco y negro
                </button>
            </div>
        </div>
    );
};

export default CertificadoLoteBtn;
