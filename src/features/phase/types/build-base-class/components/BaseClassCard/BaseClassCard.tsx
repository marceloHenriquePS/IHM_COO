import { DropSlot } from "@/features/phase/components/DropSlot/DropSlot";
import "./BaseClassCard.css";

export interface BaseClassRow {
    attribute: string | null;
    type: string | null;
}

interface BaseClassCardProps {
    title: string;
    attributeTitle: string;
    typeTitle: string;
    rows: BaseClassRow[];
    wrongRows?: number[];
    locked?: boolean;
    submitLabel: string;
    onChange: (index: number, field: "attribute" | "type", value: string | null) => void;
    onSubmit: () => void;
}

export function BaseClassCard({ title, attributeTitle, typeTitle, rows, wrongRows = [], locked, submitLabel, onChange, onSubmit }: BaseClassCardProps) {
    return (
        <section className="base-class-card">
            <header className="base-class-card-header">
                <h2>{title}</h2>
            </header>

            <div className="base-class-card-body">
                <div className="base-class-card-columns">
                    <h3>{attributeTitle}</h3>
                    <h3>{typeTitle}</h3>
                </div>

                <ul className="base-class-card-rows">
                    {rows.map((row, i) => (
                        <li key={i} className="base-class-card-row">
                            <DropSlot
                                accept="attribute"
                                value={row.attribute}
                                wrong={wrongRows.includes(i)}
                                locked={locked}
                                onDropValue={(v) => onChange(i, "attribute", v)}
                                onClear={() => onChange(i, "attribute", null)}
                            />
                            <DropSlot
                                accept="type"
                                value={row.type}
                                wrong={wrongRows.includes(i)}
                                locked={locked}
                                onDropValue={(v) => onChange(i, "type", v)}
                                onClear={() => onChange(i, "type", null)}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="base-class-card-footer">
                <button type="button" className="base-class-card-submit" onClick={onSubmit}>
                    {submitLabel}
                </button>
            </div>
        </section>
    );
}