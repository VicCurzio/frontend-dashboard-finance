import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="loading">Cargando datos del microservicio...</div>;

    return (
        <div className="profile-page">
            <h1>👤 Perfil de Usuario</h1>
            <div className="card">
                <p><strong>Nombre:</strong> {user?.nombre}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Rol:</strong> {user?.rol}</p>
                <p><strong>ID:</strong> {user?.id}</p>
            </div>
        </div>
    );
};

export default Profile;