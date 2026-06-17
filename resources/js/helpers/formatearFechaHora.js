export default function formatDateTime(d) {
    if (!d) return '—';
    return new Date(d).toLocaleString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
