import "./AccessColumn.css";

interface AccessColumnProps {
    title: string;
    options: { id: string; label: string }[];
    rows: { id: string; label: string }[];
    values: Record<string, string>;
    disabled?: boolean;
    onChange: (attributeId: string, accessId: string) => void;
}

export function AccessColumn({ title, options, rows, values, disabled, onChange }: AccessColumnProps) {
    return (
        <aside className="access-column">
            <h3 className="access-column-title">{title}</h3>

            {rows.map((r) => (
                <select
                    key={r.id}
                    aria-label={`Acesso de ${r.label}`}
                    value={values[r.id]}
                    disabled={disabled}
                    onChange={(e) => onChange(r.id, e.target.value)}
                >
                    {options.map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                </select>
            ))}
        </aside>
    );
}