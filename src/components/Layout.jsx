import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Aside from './Aside';

const Layout = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="main-wrapper">
                <Aside />
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;