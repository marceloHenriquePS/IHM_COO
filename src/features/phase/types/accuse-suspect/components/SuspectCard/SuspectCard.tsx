import "./SuspectCard.css";

interface SuspectCardProps {
    name: string;
    role: string;
    image: string;
    selected: boolean;
    disabled?: boolean;
    onSelect: () => void;
}

export function SuspectCard({ name, role, image, selected, disabled, onSelect }: SuspectCardProps) {
    return (
        <button
            type="button"
            className={`suspect-card ${selected ? "selected" : ""}`}
            aria-pressed={selected}
            disabled={disabled}
            onClick={onSelect}
        >
            <img src={image} alt="" className="suspect-card-image" />
            <b className="suspect-card-name">{name}</b>
            <span className="suspect-card-role">{role}</span>
        </button>
    );
}