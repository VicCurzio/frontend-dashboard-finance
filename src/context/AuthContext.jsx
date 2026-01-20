import { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../api/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Al cargar la app, verificamos si hay un token guardado
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Validamos el token con el endpoint /auth/me que pide tu prueba
                    const { data } = await authApi.get('/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(data);
                } catch (error) {
                    localStorage.removeItem('token'); // Token inválido o expirado
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    // 2. Función para iniciar sesión
    const login = async (email, password) => {
        const { data } = await authApi.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token); // Guardamos el JWT
        setUser(data.user);
    };

    // 3. Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);