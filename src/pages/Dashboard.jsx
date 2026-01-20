import { useEffect, useState } from 'react';
import financeApi from '../api/financeApi';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const Dashboard = () => {
    const [chartData, setChartData] = useState([]);
    const [totals, setTotals] = useState({ ventas: 0, gastos: 0, balance: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await financeApi.get('/dashboard/line-chart');
                setChartData(data);

                const totalV = data.reduce((acc, curr) => acc + (curr.ventas || 0), 0);
                const totalG = data.reduce((acc, curr) => acc + (curr.gastos || 0), 0);

                setTotals({
                    ventas: totalV,
                    gastos: totalG,
                    balance: totalV - totalG
                });
            } catch (error) {
                console.error("Error cargando el dashboard", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <p>Cargando métricas...</p>;

    return (
        <div className="dashboard-view">
            <h1>📊 Panel de Control</h1>

            <div className="kpi-grid">
                <div className="card kpi-card">
                    <span>Ingresos Totales</span>
                    <h2 className="text-success">${totals.ventas.toLocaleString()}</h2>
                </div>
                <div className="card kpi-card">
                    <span>Gastos Totales</span>
                    <h2 className="text-danger">${totals.gastos.toLocaleString()}</h2>
                </div>
                <div className="card kpi-card">
                    <span>Balance Neto</span>
                    <h2 className={totals.balance >= 0 ? 'text-success' : 'text-danger'}>
                        ${totals.balance.toLocaleString()}
                    </h2>
                </div>
            </div>

            <div className="card chart-container">
                <h3>Ventas vs Gastos (Tendencia)</h3>
                {/* FIX: Contenedor con altura fija para evitar errores de Recharts */}
                <div style={{ width: '100%', height: 400, minHeight: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis dataKey="fecha" />
                            <YAxis />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Legend verticalAlign="top" height={36} />
                            <Line name="Ventas" type="monotone" dataKey="ventas" stroke="#27ae60" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                            <Line name="Gastos" type="monotone" dataKey="gastos" stroke="#e74c3c" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;