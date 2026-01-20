import axios from 'axios';

const financeApi = axios.create({
    baseURL: 'http://localhost:3002', // Puerto de tu micro de Ventas/Gastos
});

// Interceptor para adjuntar el token automáticamente
financeApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default financeApi;