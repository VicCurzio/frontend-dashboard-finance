import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ConfirmModal from './common/ConfirmModal';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleConfirmLogout = () => {
        logout();
        setShowConfirm(false);
        navigate('/login');
    };

    const handleOpenModal = () => {
        setShowConfirm(true);
        setShowDropdown(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <span className="icon">💰</span> Finanzas Pro
                </div>
                <div className="user-menu-container">
                    <div className="user-trigger" onClick={() => setShowDropdown(!showDropdown)}>
                        <div className="avatar">
                            {user?.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="user-name">
                            Bienvenido, <strong>{user?.nombre || 'Usuario'}</strong>
                        </span>
                        <span className={`arrow ${showDropdown ? 'up' : 'down'}`}>▾</span>
                    </div>
                    {showDropdown && (
                        <>
                            <div className="dropdown-overlay-invisible" onClick={() => setShowDropdown(false)} />

                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/perfil" onClick={() => setShowDropdown(false)}>
                                        👤 Mi Perfil
                                    </Link>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <button onClick={handleOpenModal} className="logout-btn-item">
                                        🚪 Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </nav>

            <ConfirmModal
                isOpen={showConfirm}
                title="Confirmar Salida"
                message="¿Estás seguro de que deseas cerrar tu sesión actual?"
                onConfirm={handleConfirmLogout}
                onCancel={() => setShowConfirm(false)}
                type="danger"
            />
        </>
    );
};

export default Navbar;