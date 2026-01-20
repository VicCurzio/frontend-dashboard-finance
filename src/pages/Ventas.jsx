import useFinanceData from '../hooks/useFinanceData';
import VentaForm from '../components/VentaForm';
import FilterBar from '../components/common/FilterBar';
import DataTable from '../components/common/DataTable';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import financeApi from '../api/financeApi';
import ConfirmModal from '../components/common/ConfirmModal';

const Ventas = () => {
    const {
        data, tipoFiltro, fechaSeleccionada, setFechaSeleccionada,
        editando, setEditando, handleTipoFiltroChange, handleDeleteClick,
        confirmDelete, modalConfig, setModalConfig, handleImportJson, refresh
    } = useFinanceData('ventas');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let fechaLimpia = editando.fecha;
            if (!fechaLimpia || fechaLimpia.includes('Invalid')) {
                fechaLimpia = new Date().toISOString().split('T')[0];
            }

            const payload = {
                categoria: editando.categoria,
                descripcion: editando.descripcion,
                monto: parseFloat(editando.monto),
                fecha: fechaLimpia
            };

            await financeApi.put(`/ventas/${editando.id}`, payload);
            setEditando(null);
            refresh();
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    return (
        <div className="ventas-view">
            <div className="header-section">
                <h1>💰 Registro de Ventas</h1>
                <FilterBar
                    tipoFiltro={tipoFiltro}
                    onTipoChange={handleTipoFiltroChange}
                    fechaSeleccionada={fechaSeleccionada}
                    onFechaChange={setFechaSeleccionada}
                    onSearch={refresh}
                    onImport={handleImportJson}
                />
            </div>

            {editando && (
                <div className="edit-card venta">
                    <h3>Editar Venta</h3>
                    <form onSubmit={handleUpdate} className="horizontal-form">
                        <CustomInput
                            value={editando.categoria || ''}
                            onChange={(e) => setEditando({ ...editando, categoria: e.target.value })}
                            placeholder="Cliente/Categoría"
                        />
                        <CustomInput
                            value={editando.descripcion}
                            onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })}
                            placeholder="Producto"
                        />
                        <CustomInput
                            type="number"
                            value={editando.monto}
                            onChange={(e) => setEditando({ ...editando, monto: e.target.value })}
                            placeholder="Monto"
                        />
                        <CustomButton variant="success" type="submit">Actualizar</CustomButton>
                        <CustomButton variant="danger" type="button" onClick={() => setEditando(null)}>Cancelar</CustomButton>
                    </form>
                </div>
            )}

            <VentaForm onVentaCreated={refresh} />
            <DataTable items={data} onEdit={setEditando} onDelete={handleDeleteClick} esGasto={false} />

            <ConfirmModal
                isOpen={modalConfig.show}
                title="Eliminar Venta"
                message="¿Estás seguro de eliminar este registro de venta? Esta acción no se puede deshacer."
                onConfirm={confirmDelete}
                onCancel={() => setModalConfig({ show: false, id: null })}
            />
        </div>
    );
};

export default Ventas;