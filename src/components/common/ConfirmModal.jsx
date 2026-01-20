import CustomButton from "./CustomButton";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, type = 'danger' }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-card">
                <div className="modal-header">
                    <h3>{title || 'Confirmación'}</h3>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <CustomButton variant="secondary" onClick={onCancel}>
                        Cancelar
                    </CustomButton>
                    <CustomButton
                        variant={type === 'danger' ? 'danger' : 'primary'}
                        onClick={onConfirm}
                    >
                        Aceptar
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;