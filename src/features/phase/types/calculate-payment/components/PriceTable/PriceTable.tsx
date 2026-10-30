import "./PriceTable.css";

interface PriceTableProps {
    title: string;
    image: string;
    items: { id: string; label: string; price: number }[];
}

const money = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function PriceTable({ title, image, items }: PriceTableProps) {
    return (
        <article className="price-table">
            <h2 className="price-table-title">{title}</h2>

            <img src={image} alt="" className="price-table-image" />

            <dl className="price-table-list">
                {items.map((i) => (
                    <div key={i.id} className="price-table-row">
                        <dt>{i.label}:</dt>
                        <dd>{money(i.price)}</dd>
                    </div>
                ))}
            </dl>
        </article>
    );
}