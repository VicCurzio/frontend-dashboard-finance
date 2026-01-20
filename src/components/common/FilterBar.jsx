import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const FilterBar = ({ tipoFiltro, onTipoChange, fechaSeleccionada, onFechaChange, onSearch, onImport }) => (
    <div className="actions-wrapper">
        <label className="import-label">
            📥 Importar JSON
            <input type="file" accept=".json" onChange={onImport} hidden />
        </label>

        <div className="filter-container">
            <select value={tipoFiltro} onChange={(e) => onTipoChange(e.target.value)}>
                <option value="dia">Día</option>
                <option value="semana">Semana</option>
                <option value="mes">Mes</option>
                <option value="año">Año</option>
            </select>
            <CustomInput
                type={tipoFiltro === 'mes' ? 'month' : (tipoFiltro === 'año' ? 'number' : 'date')}
                value={fechaSeleccionada}
                onChange={(e) => onFechaChange(e.target.value)}
                className="search-input"
            />
            <CustomButton variant="success" onClick={onSearch}>🔍</CustomButton>
        </div>
    </div>
);

export default FilterBar;