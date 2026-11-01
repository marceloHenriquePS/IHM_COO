import type { ClassTone } from "@/shared/data/modules";
import "./ClassBox.css";

interface ClassBoxProps {
    name: string;
    tone: ClassTone;
    attributes: { type: string; name: string }[];
}

export function ClassBox({ name, tone, attributes }: ClassBoxProps) {
    return (
        <section className={`class-box ${tone}`}>
            <h2 className="class-box-title">{name}</h2>

            <ul className="class-box-list">
                {attributes.map((a) => (
                    <li key={a.name}>{a.type}: {a.name}</li>
                ))}
            </ul>
        </section>
    );
}