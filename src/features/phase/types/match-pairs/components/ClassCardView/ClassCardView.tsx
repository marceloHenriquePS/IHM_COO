import "./ClassCardView.css";

interface ClassCardViewProps {
    name: string;
    attributes: string[];
    method: string;
}

export function ClassCardView({ name, attributes, method }: ClassCardViewProps) {
    return (
        <section className="class-card-view">
            <h3 className="class-card-view-title">{name}</h3>

            <ul className="class-card-view-attrs">
                {attributes.map((a) => <li key={a}>{a}</li>)}
            </ul>

            <p className="class-card-view-method">{method}</p>
        </section>
    );
}