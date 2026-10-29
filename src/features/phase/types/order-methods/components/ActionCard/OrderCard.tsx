import type { OrderTone } from "@/shared/data/modules";
import "./OrderCard.css";

interface OrderCardProps {
    number: string;
    item: string;
    image: string;
    badge: { label: string; tone: OrderTone };
    details: { id: string; label: string; value: string }[];
    progress?: number;
}

export function OrderCard({ number, item, image, badge, details, progress = 0 }: OrderCardProps) {
    return (
        <article className="order-card">
            <header className="order-card-header">
                <h2>Pedido #{number}</h2>
                <span className={`order-badge ${badge.tone}`}>{badge.label}</span>
            </header>

            <div className="order-card-body">
                <img src={image} alt="" className="order-card-image" />

                <div className="order-card-info">
                    <h3 className="order-card-item">{item}</h3>

                    <dl className="order-card-details">
                        {details.map((d) => (
                            <div key={d.id} className="order-card-row">
                                <dt>{d.label}:</dt>
                                <dd>{d.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

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
                        style={{
                            width: `${Math.min(100, Math.max(0, progress))}%`,
                        }}
                    />
                </div>
            )}
        </article>
    );
}