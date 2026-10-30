import "./ClassSheet.css";

interface ClassSheetProps {
    title: string;
    rows: { id: string; label: string; type: string; icon: string; value: string }[];
}

export function ClassSheet({ title, rows }: ClassSheetProps) {
    return (
        <section className="class-sheet">
            <header className="class-sheet-header">
                <h2>{title}</h2>
            </header>

            <ul className="class-sheet-rows">
                {rows.map((r) => (
                    <li key={r.id} className="class-sheet-row">
                        <div className="class-sheet-label">
                            <img src={r.icon} alt="" />
                            <span>
                                {r.type}: <b>{r.label.toUpperCase()}</b>
                            </span>
                        </div>

                        <output className="class-sheet-value" key={r.value}>
                            {r.value}
                        </output>
                    </li>
                ))}
            </ul>
        </section>
    );
}