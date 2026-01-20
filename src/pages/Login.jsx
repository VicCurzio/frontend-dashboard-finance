import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Credenciales inválidas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-screen">
            <div className="login-card">
                <h2>Finanzas Pro</h2>
                <span className="subtitle">Gestiona tu capital con inteligencia</span>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <CustomInput
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <CustomInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-actions">
                        <CustomButton
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="btn-login-full"
                        >
                            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                        </CustomButton>
                        <CustomButton
                            type="button"
                            variant="secondary"
                            className="btn-login-full"
                            onClick={() => navigate('/register')}
                        >
                            Crear una cuenta
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;