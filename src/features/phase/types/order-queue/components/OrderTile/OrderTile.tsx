import type { OrderTone } from "@/shared/data/modules";
import "./OrderTile.css";

interface OrderTileProps {
    id: string;
    item: string;
    image: string;
    badge: { label: string; tone: OrderTone };
    details: { id: string; label: string; value: string }[];
    selected: boolean;
    disabled?: boolean;
    progress?: number;
    onSelect: () => void;
}

export function OrderTile({id, item, image, badge, details, selected, disabled, progress = 0, onSelect}: OrderTileProps) {
    return (
        <button
            type="button"
            className={`order-tile ${selected ? "selected" : ""}`}
            aria-pressed={selected}
            disabled={disabled}
            onClick={onSelect}
        >
            <h2 className="order-tile-title">Pedido #{id}</h2>

            <img src={image} alt="" className="order-tile-image" />

            <h3 className="order-tile-item">{item}</h3>

            <dl className="order-tile-details">
                {details.map((d) => (
                    <div key={d.id} className="order-tile-row">
                        <dt>{d.label}:</dt>
                        <dd>{d.value}</dd>
                    </div>
                ))}
            </dl>

            {badge.tone === "preparing" && (
                <div
                    className="order-progress"
                    role="progressbar"
                    aria-label="Progresso da preparação"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                >
                    <div
                        className="order-progress-bar"
                        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                    />
                </div>
            )}

            <span className={`order-badge ${badge.tone}`}>{badge.label}</span>
            
        </button>
    );
}