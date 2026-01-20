import { useFinanceForm } from '../hooks/useFinanceForm';
import CustomButton from './common/CustomButton';
import CustomInput from './common/CustomInput';

const VentaForm = ({ onVentaCreated }) => {
    const { formData, handleChange, handleSubmit } = useFinanceForm('/ventas', onVentaCreated);

    return (
        <div className="card form-container">
            <h3>Registrar Nueva Venta</h3>
            <form onSubmit={handleSubmit} className="horizontal-form">
                <CustomInput
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                />
                <CustomInput
                    type="text"
                    name="categoria"
                    placeholder="Categoría"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                />
                <CustomInput
                    type="number"
                    name="monto"
                    placeholder="Monto"
                    value={formData.monto}
                    onChange={handleChange}
                    required
                />
                <CustomInput
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
                <CustomButton variant="success" type="submit">
                    Guardar
                </CustomButton>
            </form>
        </div>
    );
};

export default VentaForm;