import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="logo">
                <span className="icon">💰</span> Finanzas Pro
            </div>
            <div className="user-info">
                <span className="user-name">Bienvenido, <strong>{user?.nombre || 'Usuario'}</strong></span>
                <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default Navbar;