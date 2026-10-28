import { DropSlot } from "@/features/phase/components/DropSlot/DropSlot";
import "./AttributeCard.css";

export interface AttributeRow {
    id: string;
    label: string;
    icon: string;
    value: string;
}

interface AttributeCardProps {
    title: string;
    rows: AttributeRow[];
    types: Record<string, string | null>;
    wrongIds?: string[];
    locked?: boolean;
    submitLabel: string;
    submitIcon?: string;
    onTypeChange: (rowId: string, type: string | null) => void;
    onSubmit: () => void;
}

export function AttributeCard({
    title, rows, types, wrongIds = [], locked,
    submitLabel, submitIcon, onTypeChange, onSubmit,
}: AttributeCardProps) {
    return (
        <section className="attribute-card">
            <header className="attribute-card-header">
                <h2>{title}</h2>
            </header>

            <div className="attribute-card-body">
                <div className="attribute-card-columns">
                    <span>ATRIBUTOS</span>
                    <span>TIPO</span>
                </div>

                <ul className="attribute-card-rows">
                    {rows.map((row) => (
                        <li key={row.id} className="attribute-row">
                            <div className="attribute-row-label">
                                <img src={row.icon} alt="" />
                                <span>
                                    <b>{row.label.toUpperCase()}:</b> {row.value}
                                </span>
                            </div>

                            <DropSlot
                                accept="type"
                                value={types[row.id] ?? null}
                                wrong={wrongIds.includes(row.id)}
                                locked={locked}
                                onDropValue={(t) => onTypeChange(row.id, t)}
                                onClear={() => onTypeChange(row.id, null)}
                            />
                        </li>
                    ))}
                </ul>

                <button className="attribute-card-submit" type="button" onClick={onSubmit}>
                    {submitIcon && <img src={submitIcon} alt="" />}
                    <span>{submitLabel}</span>
                </button>
            </div>
        </section>
    );
}