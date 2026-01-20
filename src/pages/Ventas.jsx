import { useEffect, useState } from 'react';
import financeApi from '../api/financeApi';
import VentaForm from '../components/VentaForm';

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [filtro, setFiltro] = useState('mes');
    const [editando, setEditando] = useState(null);

    const fetchVentas = async () => {
        try {
            // Coincide con tu backend: exports.getVentas usa req.query.filtro
            const { data } = await financeApi.get(`/ventas?filtro=${filtro}`);
            setVentas(data);
        } catch (error) {
            console.error("Error al cargar ventas", error);
        }
    };

    useEffect(() => {
        fetchVentas();
    }, [filtro]);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta venta?")) {
            try {
                await financeApi.delete(`/ventas/${id}`);
                fetchVentas();
            } catch (error) {
                alert("No se pudo eliminar");
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Coincide con tu exports.updateVenta
            await financeApi.put(`/ventas/${editando.id}`, editando);
            setEditando(null);
            fetchVentas();
            alert("Venta actualizada");
        } catch (error) {
            alert("Error al actualizar");
        }
    };

    const handleImportJson = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const jsonDatos = JSON.parse(event.target.result);
                // Coincide con tu exports.importJson: { tipo, datos }
                await financeApi.post('/import-json', {
                    tipo: 'venta',
                    datos: jsonDatos
                });
                alert("Importación exitosa");
                fetchVentas();
            } catch (error) {
                alert("Error en el formato del JSON");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="ventas-view">
            <div className="header-section">
                <h1>Gestión de Ventas</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <label className="btn" style={{ background: '#34495e', color: 'white', cursor: 'pointer' }}>
                        📥 Importar JSON
                        <input type="file" accept=".json" onChange={handleImportJson} hidden />
                    </label>
                    <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                        <option value="dia">Hoy</option>
                        <option value="semana">Semana</option>
                        <option value="mes">Mes</option>
                        <option value="año">Año</option>
                    </select>
                </div>
            </div>

            {editando && (
                <div className="card" style={{ marginBottom: '20px', border: '2px solid #27ae60' }}>
                    <h3>Editar Registro</h3>
                    <form onSubmit={handleUpdate} className="horizontal-form">
                        <input type="text" value={editando.descripcion} onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })} />
                        <input type="number" value={editando.monto} onChange={(e) => setEditando({ ...editando, monto: e.target.value })} />
                        <button type="submit" className="btn success">Guardar</button>
                        <button type="button" className="btn" onClick={() => setEditando(null)}>Cancelar</button>
                    </form>
                </div>
            )}

            <VentaForm onVentaCreated={fetchVentas} />

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
                        {ventas.map((v) => (
                            <tr key={v.id}>
                                <td>{new Date(v.fecha).toLocaleDateString()}</td>
                                <td>{v.descripcion}</td>
                                <td className="monto-positivo">${v.monto}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => setEditando(v)}>Editar</button>
                                    <button className="btn-delete" onClick={() => handleDelete(v.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ventas;