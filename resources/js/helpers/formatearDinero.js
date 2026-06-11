const formatearDinero = (valor) => {
    const resultado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    }).format(valor);
    return resultado;
};

export default formatearDinero;
