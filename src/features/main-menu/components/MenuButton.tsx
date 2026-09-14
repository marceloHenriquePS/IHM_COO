import './MenuButton.css'

type MenuButtonProps = {
    label: string;
    onClick: () => void;
};

export function MenuButton({label, onClick}: MenuButtonProps) {
    return (
        <button className="menu-button" onClick={onClick}>
            {label}
        </button>
    );
}