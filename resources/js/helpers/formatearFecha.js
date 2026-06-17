export default function formatDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
