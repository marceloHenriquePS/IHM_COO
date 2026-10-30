import "./Compartment.css";

interface CompartmentProps {
    label: string;
    icon: string;
    items: { id: string; label: string }[];
    locked?: boolean;
    onRemove?: (id: string) => void;
}

export function Compartment({ label, icon, items, locked, onRemove }: CompartmentProps) {
    return (
        <section className="compartment">
            <h3 className="compartment-title">
                <img src={icon} alt="" />
                <span>{label}</span>
            </h3>

            <ul className="compartment-items">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            className="compartment-chip"
                            disabled={locked || !onRemove}
                            title={onRemove && !locked ? "Clique para devolver à esteira" : undefined}
                            onClick={() => onRemove?.(item.id)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}