import './Button.css'

type ButtonProps = {
    label: string;
    width?: string;
    className?: string;
    onClick?: () => void;
};

export function Button({label, width, className, onClick}: ButtonProps) {
    return (
        <button 
            className={`button ${className ?? ''}`}
            style={width ? {width} : undefined}
            onClick={onClick}
            >
            {label}
        </button>
    );
}