import axios from 'axios';

const financeApi = axios.create({
    baseURL: import.meta.env.VITE_API_FINANCE,
});

financeApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default financeApi;