import "./AlterPanel.css";

interface AlterPanelProps {
    attributes: { id: string; label: string }[];
    selectLabel: string;
    valueLabel: string;
    submitLabel: string;
    attributeId: string;
    newValue: string;
    disabled?: boolean;
    onAttributeChange: (id: string) => void;
    onValueChange: (value: string) => void;
    onSubmit: () => void;
}

export function AlterPanel({
    attributes, selectLabel, valueLabel, submitLabel,
    attributeId, newValue, disabled,
    onAttributeChange, onValueChange, onSubmit,
}: AlterPanelProps) {
    return (
        <div className="alter-panel">
            <label className="alter-panel-field">
                <span>{selectLabel}</span>
                <select
                    value={attributeId}
                    disabled={disabled}
                    onChange={(e) => onAttributeChange(e.target.value)}
                >
                    {attributes.map((a) => (
                        <option key={a.id} value={a.id}>{a.label}</option>
                    ))}
                </select>
            </label>

            <label className="alter-panel-field">
                <span>{valueLabel}</span>
                <input
                    type="text"
                    value={newValue}
                    disabled={disabled}
                    onChange={(e) => onValueChange(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") onSubmit(); }}
                />
            </label>

            <button type="button" className="alter-panel-submit" onClick={onSubmit}>
                {submitLabel}
            </button>
        </div>
    );
}