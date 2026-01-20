import CustomButton from './CustomButton';

const DataTable = ({ items, onEdit, onDelete, esGasto }) => (
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
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{new Date(item.fecha).toLocaleDateString()}</td>
                        <td><strong>{item.categoria}</strong></td>
                        <td>{item.descripcion}</td>
                        <td className={esGasto ? "monto-negativo" : "monto-positivo"}>
                            {esGasto ? `-$${Number(item.monto).toLocaleString()}` : `$${Number(item.monto).toLocaleString()}`}
                        </td>
                        <td>
                            <CustomButton variant="primary" className="btn-edit" onClick={() => onEdit(item)}>Editar</CustomButton>
                            <CustomButton variant="danger" className="btn-delete" onClick={() => onDelete(item.id)}>Eliminar</CustomButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default DataTable;