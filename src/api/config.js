import axios from 'axios';

// Instancia para Microservicio Autenticación (Drizzle)
export const authApi = axios.create({
    baseURL: 'http://localhost:3001', // Cambia al puerto real de tu backend Auth
});

// Instancia para Microservicio Ventas/Gastos (Sequelize)
export const financeApi = axios.create({
    baseURL: 'http://localhost:3002', // Cambia al puerto real de tu backend Finanzas
});

// Interceptor para inyectar el JWT automáticamente en las peticiones de finanzas
financeApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});