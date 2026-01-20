import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import { authApi } from '../api/config';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        setLoading(true);
        try {
            await authApi.post('/auth/register', {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password
            });

            alert("Usuario registrado. Ya puedes iniciar sesión.");
            navigate('/login');

        } catch (err) {
            const mensajeError = err.response?.data?.error ||
                err.response?.data?.message ||
                'Error al conectar con el servidor';
            setError(mensajeError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-screen">
            <div className="login-card">
                <h2>Finanzas Pro</h2>
                <span className="subtitle">Crea tu cuenta para empezar</span>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <CustomInput
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            placeholder="Tu nombre completo"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <CustomInput
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <CustomInput
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <CustomInput
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Repite tu contraseña"
                            required
                        />
                    </div>

                    <div className="login-actions">
                        <CustomButton
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="btn-login-full" // Mismo estilo que el login
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </CustomButton>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <CustomButton
                                type="button"
                                variant="secondary"
                                className="btn-login-full"
                            >
                                ¿Ya tienes cuenta? Inicia sesión
                            </CustomButton>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;