import { FieldSlot } from "./FieldSlot";
import "./ClassCard.css";

export interface ClassCardField {
    id: string;
    label: string;
    icon: string;
}

interface ClassCardProps {
    title: string;
    fields: ClassCardField[];
    values: Record<string, string | null>;
    locked: boolean;
    submitLabel: string;
    submitIcon?: string;
    wrongIds?: string[]
    onSubmit: () => void;
    onFieldChange: (fieldId: string, value: string | null) => void;
}

export function ClassCard({title, fields, values, locked, submitLabel, submitIcon, wrongIds, onSubmit, onFieldChange}: ClassCardProps) {
    return (
        <section className="class-card">
            <header className="class-card-header">
                <h2>{title}</h2>
            </header>

            <div className="class-card-body">
                <div className="class-card-fields">
                    {fields.map((field) => (
                        <FieldSlot
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            icon={field.icon}
                            value={values[field.id] ?? null}
                            locked={locked}
                            wrong={wrongIds?.includes(field.id)}
                            onDropValue={(v) => onFieldChange(field.id, v)}
                            onClear={() => onFieldChange(field.id, null)}
                        />
                    ))}
                </div>

                <button className="class-card-submit" type="button" onClick={onSubmit}>
                    {submitIcon && <img src={submitIcon} alt="" />}
                    <span>{submitLabel}</span>
                </button>
            </div>
        </section>
    );
}