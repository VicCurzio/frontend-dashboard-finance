import { useEffect, useState } from 'react';
import financeApi from '../api/financeApi';
import VentaForm from '../components/VentaForm';

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('mes');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
    const [editando, setEditando] = useState(null);

    const fetchVentas = async () => {
        try {
            // Si el usuario no eligió fecha, no filtramos o usamos valor por defecto
            const query = `filtro=${tipoFiltro}&fechaSeleccionada=${fechaSeleccionada}`;
            const { data } = await financeApi.get(`/ventas?${query}`);
            setVentas(data);
        } catch (error) {
            console.error("Error al cargar ventas", error);
        }
    };

    useEffect(() => {
        fetchVentas();
    }, [tipoFiltro]); // Se dispara al cambiar tipo, pero espera al clic de botón si quieres más control

    const handleImportJson = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const jsonDatos = JSON.parse(event.target.result);
                await financeApi.post('/import-json', { tipo: 'venta', datos: jsonDatos });
                alert("Importación exitosa");
                fetchVentas();
            } catch (error) {
                alert("Error en el formato del JSON");
            }
        };
        reader.readAsText(file);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await financeApi.put(`/ventas/${editando.id}`, editando);
            setEditando(null);
            fetchVentas();
            alert("Venta actualizada");
        } catch (error) {
            alert("Error al actualizar");
        }
    };

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

    return (
        <div className="ventas-view">
            <div className="header-section">
                <h1>📈 Gestión de Ventas</h1>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label className="btn primary" style={{ cursor: 'pointer' }}>
                        📥 Importar JSON
                        <input type="file" accept=".json" onChange={handleImportJson} hidden />
                    </label>

                    {/* BUSCADOR DE CALENDARIO NATURAL */}
                    <div style={{ display: 'flex', gap: '5px', background: '#eee', padding: '5px', borderRadius: '5px' }}>
                        <select value={tipoFiltro} onChange={(e) => { setTipoFiltro(e.target.value); setFechaSeleccionada('') }}>
                            <option value="dia">Día</option>
                            <option value="semana">Semana</option>
                            <option value="mes">Mes</option>
                            <option value="año">Año</option>
                        </select>
                        <input
                            type={tipoFiltro === 'mes' ? 'month' : (tipoFiltro === 'año' ? 'number' : 'date')}
                            value={fechaSeleccionada}
                            onChange={(e) => setFechaSeleccionada(e.target.value)}
                            placeholder="AAAA"
                        />
                        <button className="btn success" onClick={fetchVentas}>🔍</button>
                    </div>
                </div>
            </div>

            {editando && (
                <div className="card" style={{ marginBottom: '20px', border: '2px solid #27ae60' }}>
                    <h3>Editar Registro</h3>
                    <form onSubmit={handleUpdate} className="horizontal-form">
                        <input type="text" placeholder="Categoría" value={editando.categoria || ''} onChange={(e) => setEditando({ ...editando, categoria: e.target.value })} />
                        <input type="text" placeholder="Descripción" value={editando.descripcion} onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })} />
                        <input type="number" placeholder="Monto" value={editando.monto} onChange={(e) => setEditando({ ...editando, monto: e.target.value })} />
                        <button type="submit" className="btn success">Guardar</button>
                        <button type="button" className="btn danger" onClick={() => setEditando(null)}>Cancelar</button>
                    </form>
                </div>
            )}

            <VentaForm onVentaCreated={fetchVentas} />

            <div className="card mt-2">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Categoría</th>
                            <th>Descripción</th>
                            <th>Monto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((v) => (
                            <tr key={v.id}>
                                <td>{new Date(v.fecha).toLocaleDateString()}</td>
                                <td><strong>{v.categoria}</strong></td>
                                <td>{v.descripcion}</td>
                                <td className="monto-positivo">${Number(v.monto).toLocaleString()}</td>
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