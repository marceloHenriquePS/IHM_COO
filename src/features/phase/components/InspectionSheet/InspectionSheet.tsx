import "./InspectionSheet.css";

interface InspectionSheetProps {
    title: string;
    image: string;
    checks: { id: string; label: string; value: boolean }[];
    doneIds?: string[];
}

export function InspectionSheet({ title, image, checks, doneIds = [] }: InspectionSheetProps) {
    return (
        <article className="inspection-sheet">
            <h2 className="inspection-sheet-title">{title}</h2>

            <img src={image} alt="" className="inspection-sheet-image" />

            <ul className="inspection-sheet-list">
                {checks.map((c) => {
                    const done = doneIds.includes(c.id);
                    return (
                        <li key={c.id} className={`inspection-sheet-row ${done ? "done" : ""}`}>
                            <span className="inspection-sheet-label">{c.label}</span>
                            <span className="inspection-sheet-dots" aria-hidden="true" />
                            <span className="inspection-sheet-value">
                                {done ? "FEITO" : c.value ? "SIM" : "NÃO"}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}