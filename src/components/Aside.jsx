import { NavLink } from 'react-router-dom';

const Aside = () => {
    return (
        <aside className="sidebar">
            <div className="menu-label">Principal</div>
            <nav className="nav-links">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                    📊 Dashboard
                </NavLink>
                <NavLink to="/ventas" className={({ isActive }) => isActive ? 'active' : ''}>
                    📈 Ventas
                </NavLink>
                <NavLink to="/gastos" className={({ isActive }) => isActive ? 'active' : ''}>
                    📉 Gastos
                </NavLink>
            </nav>
        </aside>
    );
};

export default Aside;