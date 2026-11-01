import { useState } from "react";
import "./RegisterInput.css";

interface RegisterInputProps {
    placeholder: string;
    submitLabel: string;
    disabled?: boolean;
    onRegister: (text: string) => boolean;
}

export function RegisterInput({ placeholder, submitLabel, disabled, onRegister }: RegisterInputProps) {
    const [text, setText] = useState("");

    function submit() {
        if (disabled) return;
        if (onRegister(text)) setText("");
    }

    return (
        <div className="register-input">
            <input
                type="text"
                value={text}
                placeholder={placeholder}
                aria-label={placeholder}
                disabled={disabled}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            />

            <button type="button" disabled={disabled} onClick={submit}>
                {submitLabel}
            </button>
        </div>
    );
}