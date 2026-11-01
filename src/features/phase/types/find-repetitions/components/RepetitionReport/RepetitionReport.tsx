import "./RepetitionReport.css";

interface RepetitionReportProps {
    title: string;
    items: string[];
    sendLabel: string;
    locked?: boolean;
    onRemove: (name: string) => void;
    onSend: () => void;
}

export function RepetitionReport({
    title, items, sendLabel, locked, onRemove, onSend,
}: RepetitionReportProps) {
    return (
        <section className="repetition-report">
            <header className="repetition-report-header">
                <h3>{title}</h3>
                <button type="button" className="repetition-report-send" onClick={onSend}>
                    {sendLabel}
                </button>
            </header>

            <ul className="repetition-report-items">
                {items.map((name) => (
                    <li key={name}>
                        <button
                            type="button"
                            className="repetition-chip"
                            disabled={locked}
                            title={locked ? undefined : "Clique para remover"}
                            onClick={() => onRemove(name)}
                        >
                            {name}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}