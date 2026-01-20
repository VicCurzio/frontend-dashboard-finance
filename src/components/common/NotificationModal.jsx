import CustomButton from "./CustomButton";

const NotificationModal = ({ isOpen, title, message, onConfirm, type = 'success' }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-card scale-up">
                <div className="modal-header">
                    <div className={`icon-circle ${type}`}>
                        {type === 'success' ? '✓' : 'ℹ'}
                    </div>
                    <h3 className="text-center">{title}</h3>
                </div>
                <div className="modal-body text-center">
                    <p>{message}</p>
                </div>
                <div className="modal-footer centered">
                    <CustomButton
                        variant="primary"
                        onClick={onConfirm}
                        className="btn-wide"
                    >
                        Entendido
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;