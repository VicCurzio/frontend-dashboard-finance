import { useEffect, useState } from 'react';
import financeApi from '../api/financeApi';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const Dashboard = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totals, setTotals] = useState({ ingresos: 0, gastos: 0, balance: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await financeApi.get('/dashboard/line-chart');
                const formattedData = data.map(item => ({
                    ...item,
                    fechaOriginal: item.fecha.split('T')[0]
                }));

                const ingresos = formattedData.reduce((acc, curr) => acc + curr.ventas, 0);
                const gastos = formattedData.reduce((acc, curr) => acc + curr.gastos, 0);

                setTotals({ ingresos, gastos, balance: ingresos - gastos });
                setChartData(formattedData);
            } catch (error) {
                console.error("Error en gráfico:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatAxisDate = (tickItem) => {
        if (!tickItem) return '';
        const [, month, day] = tickItem.split('-');
        return `${day}/${month}`;
    };

    if (loading) return <div className="loading-state">Cargando dashboard...</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>📊 Panel de Control</h1>
                <p className="subtitle">Resumen de tu actividad financiera</p>
            </header>

            <div className="kpi-grid">
                <div className="kpi-card glass-card">
                    <span className="label">Total Ingresos</span>
                    <h2 className="text-success">${totals.ingresos.toLocaleString()}</h2>
                </div>
                <div className="kpi-card glass-card">
                    <span className="label">Total Gastos</span>
                    <h2 className="text-danger">${totals.gastos.toLocaleString()}</h2>
                </div>
                <div className="kpi-card glass-card">
                    <span className="label">Balance Neto</span>
                    <h2 className={totals.balance >= 0 ? 'text-success' : 'text-danger'}>
                        ${totals.balance.toLocaleString()}
                    </h2>
                </div>
            </div>

            <div className="chart-container glass-card">
                <h3>Ventas vs Gastos (Tendencia)</h3>
                <div className="responsive-chart-wrapper">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis
                                dataKey="fechaOriginal"
                                tickFormatter={formatAxisDate}
                                stroke="#7f8c8d"
                                fontSize={12}
                            />
                            <YAxis
                                tickFormatter={(v) => `$${v.toLocaleString()}`}
                                stroke="#7f8c8d"
                                fontSize={12}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                labelFormatter={(label) => `Fecha: ${label.split('-').reverse().join('/')}`}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Line
                                type="monotone"
                                dataKey="ventas"
                                stroke="#27ae60"
                                strokeWidth={4}
                                dot={{ r: 4, fill: '#27ae60' }}
                                activeDot={{ r: 8 }}
                                name="Ingresos"
                            />
                            <Line
                                type="monotone"
                                dataKey="gastos"
                                stroke="#e74c3c"
                                strokeWidth={4}
                                dot={{ r: 4, fill: '#e74c3c' }}
                                activeDot={{ r: 8 }}
                                name="Gastos"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;