import './Button.css'

type ButtonProps = {
    label: string;
    width?: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

export function Button({label, width, className, onClick, disabled}: ButtonProps) {
    return (
        <button 
            className={`button ${className ?? ''}`}
            style={width ? {width} : undefined}
            onClick={onClick}
            disabled={disabled}
            >
            {label}
        </button>
    );
}