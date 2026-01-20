import useFinanceData from '../hooks/useFinanceData';
import GastoForm from '../components/GastoForm';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import DataTable from '../components/common/DataTable';
import FilterBar from '../components/common/FilterBar';
import financeApi from '../api/financeApi';
import ConfirmModal from '../components/common/ConfirmModal';

const Gastos = () => {
    const {
        data, tipoFiltro, fechaSeleccionada, setFechaSeleccionada,
        editando, setEditando, handleTipoFiltroChange, handleDeleteClick,
        confirmDelete, modalConfig, setModalConfig, handleImportJson, refresh
    } = useFinanceData('gastos');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await financeApi.put(`/gastos/${editando.id}`, editando);
            setEditando(null);
            refresh();
        } catch (error) { console.error("Error al actualizar"); }
    };

    return (
        <div className="gastos-view">
            <div className="header-section">
                <h1>📉 Gestión de Gastos</h1>
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
                <div className="edit-card gasto">
                    <h3>Editar Gasto</h3>
                    <form onSubmit={handleUpdate} className="horizontal-form">
                        <CustomInput value={editando.categoria || ''} onChange={(e) => setEditando({ ...editando, categoria: e.target.value })} placeholder="Categoría" />
                        <CustomInput value={editando.descripcion} onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })} placeholder="Descripción" />
                        <CustomInput type="number" value={editando.monto} onChange={(e) => setEditando({ ...editando, monto: e.target.value })} placeholder="Monto" />
                        <CustomButton variant="success" type="submit">Guardar</CustomButton>
                        <CustomButton variant="danger" type="button" onClick={() => setEditando(null)}>Cancelar</CustomButton>
                    </form>
                </div>
            )}

            <GastoForm onGastoCreated={refresh} />
            <DataTable items={data} onEdit={setEditando} onDelete={handleDeleteClick} esGasto={true} />

            <ConfirmModal
                isOpen={modalConfig.show}
                title="Eliminar Registro"
                message="¿Estás seguro de que deseas eliminar este gasto de forma permanente?"
                onConfirm={confirmDelete}
                onCancel={() => setModalConfig({ show: false, id: null })}
            />
        </div>
    );
};

export default Gastos;