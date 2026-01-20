import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import { authApi } from '../api/config';
import NotificationModal from '../components/common/NotificationModal';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();

    const validarFormulario = () => {
        const { nombre, email, password, confirmPassword } = formData;

        if (!nombre.trim() || !email.trim() || !password || !confirmPassword) {
            setError('Todos los campos son obligatorios');
            return false;
        }

        if (nombre.trim().length < 3) {
            setError('El nombre debe tener al menos 3 caracteres');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, ingresa un correo electrónico válido');
            return false;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validarFormulario()) return;

        setLoading(true);
        try {
            await authApi.post('/auth/register', {
                nombre: formData.nombre.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            setShowSuccessModal(true);

        } catch (err) {
            const mensajeError = err.response?.data?.error ||
                err.response?.data?.message ||
                'Error al conectar con el servidor';
            setError(mensajeError);
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate('/login');
    };

    return (
        <div className="login-screen">
            <div className="login-card glass-card">
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
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <CustomInput
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <CustomInput
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <CustomInput
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Repite tu contraseña"
                        />
                    </div>

                    <div className="login-actions">
                        <CustomButton
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="btn-login-full"
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </CustomButton>

                        <Link to="/login" >
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

            <NotificationModal
                isOpen={showSuccessModal}
                title="¡Registro Exitoso!"
                message="Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión para gestionar tus finanzas."
                onConfirm={handleModalClose}
            />
        </div>
    );
};

export default Register;