import "./OptionPicker.css";

interface OptionPickerProps {
    count: number;
    value: number | null;
    submitLabel: string;
    disabled?: boolean;
    onChange: (index: number) => void;
    onSubmit: () => void;
}

export function OptionPicker({
    count, value, submitLabel, disabled, onChange, onSubmit,
}: OptionPickerProps) {
    return (
        <div className="option-picker">
            <fieldset className="option-picker-options" disabled={disabled}>
                <legend className="visually-hidden">Opção do diagnóstico</legend>

                {Array.from({ length: count }, (_, i) => (
                    <label key={i} className="option-picker-option">
                        <span>{i + 1}</span>
                        <input
                            type="radio"
                            name="diagnose-option"
                            checked={value === i}
                            onChange={() => onChange(i)}
                        />
                    </label>
                ))}
            </fieldset>

            <button type="button" className="option-picker-submit" onClick={onSubmit}>
                {submitLabel}
            </button>
        </div>
    );
}