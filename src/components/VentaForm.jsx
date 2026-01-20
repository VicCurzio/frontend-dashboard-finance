import { useState } from 'react';
import financeApi from '../api/financeApi';

const VentaForm = ({ onVentaCreated }) => {
    const [formData, setFormData] = useState({
        fecha: new Date().toISOString().split('T')[0],
        categoria: '',
        monto: '',
        descripcion: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Endpoint obligatorio: Crear venta 
            await financeApi.post('/ventas', formData);
            onVentaCreated(); // Recarga la tabla
            setFormData({ ...formData, categoria: '', monto: '', descripcion: '' });
        } catch (error) {
            alert("Error al crear la venta");
        }
    };

    return (
        <div className="card form-container">
            <h3>Registrar Nueva Venta</h3>
            <form onSubmit={handleSubmit} className="horizontal-form">
                <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Categoría"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Monto"
                    value={formData.monto}
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                />
                <button type="submit" className="btn success">Guardar</button>
            </form>
        </div>
    );
};

export default VentaForm;