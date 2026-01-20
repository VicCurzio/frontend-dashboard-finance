const CustomButton = ({ children, variant = "primary", className = "", ...props }) => (
    <button {...props} className={`btn ${variant} ${className}`}>
        {children}
    </button>
);

export default CustomButton;