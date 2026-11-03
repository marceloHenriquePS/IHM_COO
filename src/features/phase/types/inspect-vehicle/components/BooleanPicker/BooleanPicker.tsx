import "./BooleanPicker.css";

interface BooleanPickerProps {
    value: boolean | null;
    submitLabel: string;
    disabled?: boolean;
    onChange: (value: boolean) => void;
    onSubmit: () => void;
}

export function BooleanPicker({ value, submitLabel, disabled, onChange, onSubmit }: BooleanPickerProps) {
    return (
        <div className="boolean-picker">
            <span className="boolean-picker-call">retornar: </span>

            <fieldset className="boolean-picker-options" disabled={disabled}>
                <legend className="visually-hidden">Valor do parâmetro</legend>

                <label className="boolean-picker-option">
                    <span>true</span>
                    <input
                        type="radio"
                        name="boolean-value"
                        checked={value === true}
                        onChange={() => onChange(true)}
                    />
                </label>

                <label className="boolean-picker-option">
                    <span>false</span>
                    <input
                        type="radio"
                        name="boolean-value"
                        checked={value === false}
                        onChange={() => onChange(false)}
                    />
                </label>
            </fieldset>

            <button type="button" className="boolean-picker-submit" onClick={onSubmit}>
                {submitLabel}
            </button>
        </div>
    );
}