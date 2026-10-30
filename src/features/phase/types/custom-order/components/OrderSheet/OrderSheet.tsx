// OrderSheet/OrderSheet.tsx
import "./OrderSheet.css";

interface OrderSheetProps {
    number: string;
    slots: number;
    items: string[];
    details: { id: string; label: string; value: string }[];
    finalizeLabel: string;
    wrong?: boolean;
    locked?: boolean;
    onRemove?: (index: number) => void;
    onFinalize: () => void;
}

export function OrderSheet({
    number,
    slots,
    items,
    details,
    finalizeLabel,
    wrong,
    locked,
    onRemove,
    onFinalize,
}: OrderSheetProps) {
    const total = Math.max(slots, items.length);

    return (
        <article className={`order-sheet ${wrong ? "wrong" : ""}`}>
            <h2 className="order-sheet-title">Pedido #{number}</h2>

            <div className="order-sheet-slots">
                {Array.from({ length: total }, (_, i) =>
                    items[i] ? (
                        <button
                            key={i}
                            type="button"
                            className="order-sheet-slot filled"
                            aria-label="Remover item"
                            title={locked ? undefined : "Clique para remover"}
                            disabled={locked}
                            onClick={() => onRemove?.(i)}
                        >
                            <img src={items[i]} alt="" />
                        </button>
                    ) : (
                        <div key={i} className="order-sheet-slot">
                            +
                        </div>
                    )
                )}
            </div>

            <dl className="order-sheet-details">
                {details.map((d) => (
                    <div key={d.id} className="order-sheet-row">
                        <dt>{d.label}:</dt>
                        <dd>{d.value}</dd>
                    </div>
                ))}
            </dl>

            <button className="order-sheet-finalize" type="button" onClick={onFinalize}>
                {finalizeLabel}
            </button>
        </article>
    );
}