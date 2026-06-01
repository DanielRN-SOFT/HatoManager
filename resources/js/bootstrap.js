import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// CSRF token para todas las peticiones
const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];

if (token) {
    window.axios.defaults.headers.common['X-XSRF-TOKEN'] =
        decodeURIComponent(token);
}
