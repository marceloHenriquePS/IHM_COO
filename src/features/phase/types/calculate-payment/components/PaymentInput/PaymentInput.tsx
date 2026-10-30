import "./PaymentInput.css";

interface PaymentInputProps {
    method: string;
    value: string;
    submitLabel: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export function PaymentInput({ method, value, submitLabel, disabled, onChange, onSubmit}: PaymentInputProps) {
    return (
        <div className="payment-input">
            <span className="payment-input-call">{method}(</span>

            <label className="payment-input-field">
                <input
                    type="text"
                    inputMode="decimal"
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") onSubmit(); }}
                />
            </label>

            <span className="payment-input-call">)</span>

            <button type="button" className="payment-input-submit" onClick={onSubmit}>
                {submitLabel}
            </button>
        </div>
    );
}