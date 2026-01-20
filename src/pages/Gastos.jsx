import { useEffect, useState } from 'react';
import financeApi from '../api/financeApi';
import GastoForm from '../components/GastoForm';

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('mes');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().slice(0, 7));
    const [editando, setEditando] = useState(null);

    const fetchGastos = async () => {
        if (!fechaSeleccionada) return;
        try {
            const query = `filtro=${tipoFiltro}&fechaSeleccionada=${fechaSeleccionada}`;
            const { data } = await financeApi.get(`/gastos?${query}`);
            setGastos(data);
        } catch (error) {
            console.error("Error al cargar gastos", error);
        }
    };

    // Escucha cambios en tipo o en la fecha específica para recargar
    useEffect(() => {
        fetchGastos();
    }, [tipoFiltro, fechaSeleccionada]);

    const handleTipoFiltroChange = (e) => {
        const nuevoTipo = e.target.value;
        setTipoFiltro(nuevoTipo);

        // Ajustar el valor inicial de fechaSeleccionada según el tipo de input
        const hoy = new Date();
        if (nuevoTipo === 'mes') {
            setFechaSeleccionada(hoy.toISOString().slice(0, 7)); // YYYY-MM
        } else if (nuevoTipo === 'año') {
            setFechaSeleccionada(hoy.getFullYear().toString()); // YYYY
        } else {
            setFechaSeleccionada(hoy.toISOString().split('T')[0]); // YYYY-MM-DD
        }
    };

    const handleImportJson = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const jsonDatos = JSON.parse(event.target.result);
                await financeApi.post('/import-json', { tipo: 'gasto', datos: jsonDatos });
                alert("Importación de gastos exitosa");
                fetchGastos();
            } catch (error) {
                alert("Error en el formato del JSON");
            }
        };
        reader.readAsText(file);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await financeApi.put(`/gastos/${editando.id}`, editando);
            setEditando(null);
            fetchGastos();
            alert("Gasto actualizado");
        } catch (error) {
            alert("Error al actualizar el gasto");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este gasto?")) {
            try {
                await financeApi.delete(`/gastos/${id}`);
                fetchGastos();
            } catch (error) {
                alert("No se pudo eliminar el gasto");
            }
        }
    };

    return (
        <div className="gastos-view">
            <div className="header-section">
                <h1>📉 Gestión de Gastos</h1>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label className="btn primary" style={{ cursor: 'pointer' }}>
                        📥 Importar JSON
                        <input type="file" accept=".json" onChange={handleImportJson} hidden />
                    </label>

                    <div style={{ display: 'flex', gap: '5px', background: '#eee', padding: '5px', borderRadius: '5px' }}>
                        <select value={tipoFiltro} onChange={handleTipoFiltroChange}>
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
                        <button className="btn success" onClick={fetchGastos}>🔍</button>
                    </div>
                </div>
            </div>

            {editando && (
                <div className="card" style={{ marginBottom: '20px', border: '2px solid #e74c3c' }}>
                    <h3>Editar Gasto</h3>
                    <form onSubmit={handleUpdate} className="horizontal-form">
                        <input type="text" placeholder="Categoría" value={editando.categoria || ''} onChange={(e) => setEditando({ ...editando, categoria: e.target.value })} />
                        <input type="text" placeholder="Descripción" value={editando.descripcion} onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })} />
                        <input type="number" placeholder="Monto" value={editando.monto} onChange={(e) => setEditando({ ...editando, monto: e.target.value })} />
                        <button type="submit" className="btn success">Guardar</button>
                        <button type="button" className="btn danger" onClick={() => setEditando(null)}>Cancelar</button>
                    </form>
                </div>
            )}

            <GastoForm onGastoCreated={fetchGastos} />

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
                        {gastos.map((g) => (
                            <tr key={g.id}>
                                <td>{new Date(g.fecha).toLocaleDateString()}</td>
                                <td><strong>{g.categoria}</strong></td>
                                <td>{g.descripcion}</td>
                                <td className="monto-negativo">-${Number(g.monto).toLocaleString()}</td>
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