import { useAuth } from '../context/AuthContext';
import CustomButton from './common/CustomButton';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="logo">
                <span className="icon">💰</span> Finanzas Pro
            </div>
            <div className="user-info">
                <span className="user-name">
                    Bienvenido, <strong>{user?.nombre || 'Usuario'}</strong>
                </span>
                <CustomButton
                    onClick={logout}
                    variant="danger"
                    className="btn-logout"
                >
                    Cerrar Sesión
                </CustomButton>
            </div>
        </nav>
    );
};

export default Navbar;