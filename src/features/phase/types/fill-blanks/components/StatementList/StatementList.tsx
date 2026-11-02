import { DropSlot } from "@/features/phase/components/DropSlot/DropSlot";
import "./StatementList.css";

interface StatementListProps {
    title: string;
    statements: string[];
    values: Record<string, string | null>;
    wrongIds?: string[];
    locked?: boolean;
    onDropWord: (blankId: string, word: string) => void;
    onClear: (blankId: string) => void;
}

export function StatementList({ title, statements, values, wrongIds = [], locked, onDropWord, onClear }: StatementListProps) {
    return (
        <section className="statement-list">
            <h2 className="statement-list-title">{title}</h2>

            <ol className="statement-list-items">
                {statements.map((text, i) => (
                    <li key={i}>
                        {text.split(/\{(\w+)\}/).map((part, j) =>
                            j % 2 === 1 ? (
                                <span key={j} className="blank">
                                    <DropSlot
                                        accept="word"
                                        value={values[part] ?? null}
                                        placeholder="______"
                                        wrong={wrongIds.includes(part)}
                                        locked={locked}
                                        onDropValue={(w) => onDropWord(part, w)}
                                        onClear={() => onClear(part)}
                                    />
                                </span>
                            ) : (
                                <span key={j}>{part}</span>
                            )
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}