import "./Terminal.css";

interface TerminalProps {
    text: string;
    error?: boolean;
}

export function Terminal({ text, error }: TerminalProps) {
    return (
        <div className={`terminal ${error ? "error" : ""}`} role="status" aria-live="polite">
            {text}
        </div>
    );
}