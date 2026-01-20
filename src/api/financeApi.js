import axios from 'axios';

const financeApi = axios.create({
    baseURL: 'http://localhost:3002',
});

financeApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default financeApi;