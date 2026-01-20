import { useFinanceForm } from '../hooks/useFinanceForm';
import CustomInput from './common/CustomInput';
import CustomButton from './common/CustomButton';

const GastoForm = ({ onGastoCreated }) => {
    const { formData, handleChange, handleSubmit } = useFinanceForm('/gastos', onGastoCreated);

    return (
        <div className="card form-container">
            <h3>Registrar Nuevo Gasto</h3>
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
                    placeholder="Categoría (ej. Alquiler)"
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
                <CustomButton variant="danger" type="submit">
                    Guardar Gasto
                </CustomButton>
            </form>
        </div>
    );
};

export default GastoForm;