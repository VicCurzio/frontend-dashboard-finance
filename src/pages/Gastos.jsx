import { useEffect, useState } from 'react';
import financeApi from '../api/financeApi';
import GastoForm from '../components/GastoForm';

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const [filtro, setFiltro] = useState('mes');
    const [editando, setEditando] = useState(null);

    const fetchGastos = async () => {
        try {
            const { data } = await financeApi.get(`/gastos?filtro=${filtro}`);
            setGastos(data);
        } catch (error) {
            console.error("Error al cargar gastos", error);
        }
    };

    useEffect(() => {
        fetchGastos();
    }, [filtro]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await financeApi.put(`/gastos/${editando.id}`, editando);
            setEditando(null);
            fetchGastos();
            alert("Gasto actualizado");
        } catch (error) {
            alert("Error al actualizar");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar este gasto?")) {
            try {
                await financeApi.delete(`/gastos/${id}`);
                fetchGastos();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    return (
        <div className="gastos-view">
            <div className="header-section">
                <h1>📉 Gestión de Gastos</h1>
                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="dia">Hoy</option>
                    <option value="semana">Semana</option>
                    <option value="mes">Mes</option>
                    <option value="año">Año</option>
                </select>
            </div>

            {editando && (
                <div className="card" style={{ marginBottom: '20px', border: '2px solid #e74c3c' }}>
                    <h3>Editar Gasto</h3>
                    <form onSubmit={handleUpdate} className="horizontal-form">
                        <input type="text" value={editando.descripcion} onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })} />
                        <input type="number" value={editando.monto} onChange={(e) => setEditando({ ...editando, monto: e.target.value })} />
                        <button type="submit" className="btn danger">Actualizar</button>
                        <button type="button" className="btn" onClick={() => setEditando(null)}>Cancelar</button>
                    </form>
                </div>
            )}

            <GastoForm onGastoCreated={fetchGastos} />

            <div className="card mt-2">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Monto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gastos.map((g) => (
                            <tr key={g.id}>
                                <td>{new Date(g.fecha).toLocaleDateString()}</td>
                                <td>{g.descripcion}</td>
                                <td className="monto-negativo">-${g.monto}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => setEditando(g)}>Editar</button>
                                    <button className="btn-delete" onClick={() => handleDelete(g.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Gastos;