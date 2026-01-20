import { useEffect, useState } from 'react';
import financeApi from '../api/financeApi';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const Dashboard = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await financeApi.get('/dashboard/line-chart');

                // CORRECCIÓN: Tratamos la fecha como string puro (YYYY-MM-DD) 
                // para evitar el desfase de zona horaria del navegador.
                const formattedData = data.map(item => ({
                    ...item,
                    // Extraemos solo la parte de la fecha antes de la 'T' o el espacio
                    fechaOriginal: item.fecha.split('T')[0]
                }));

                setChartData(formattedData);
            } catch (error) {
                console.error("Error en gráfico:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Formateador para mostrar DD/MM en el eje X
    const formatAxisDate = (tickItem) => {
        if (!tickItem) return '';
        const [year, month, day] = tickItem.split('-');
        return `${day}/${month}`;
    };

    // Formateador para el Tooltip (cartelito al pasar el mouse)
    const formatTooltipDate = (value) => {
        const [year, month, day] = value.split('-');
        return `Fecha: ${day}/${month}/${year}`;
    };

    if (loading) return <div className="content">Cargando dashboard...</div>;

    return (
        <div className="dashboard-view">
            <h1>📊 Panel de Control</h1>

            <div className="card chart-container">
                <h3>Ventas vs Gastos (Tendencia)</h3>
                <div style={{ width: '100%', height: '400px' }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />

                            <XAxis
                                dataKey="fechaOriginal"
                                tickFormatter={formatAxisDate}
                                minTickGap={30}
                            />

                            <YAxis
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />

                            <Tooltip
                                labelFormatter={formatTooltipDate}
                                formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />

                            <Legend verticalAlign="top" height={36} />

                            <Line
                                type="monotone"
                                dataKey="ventas"
                                stroke="#27ae60"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Ingresos"
                            />
                            <Line
                                type="monotone"
                                dataKey="gastos"
                                stroke="#e74c3c"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
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