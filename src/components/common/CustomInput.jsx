const CustomInput = ({ type, value, onChange, placeholder, className = "", ...props }) => {
    const isDateOrMonth = type === 'date' || type === 'month';

    return (
        <input
            {...props}
            type={isDateOrMonth && !value ? 'text' : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`custom-input ${className}`}
            onFocus={(e) => {
                if (isDateOrMonth) e.target.type = type;
            }}
            onBlur={(e) => {
                if (isDateOrMonth && !e.target.value) e.target.type = 'text';
            }}
        />
    );
};

export default CustomInput;