import "./ClueList.css";

interface ClueListProps {
    title: string;
    clues: string[];
}

export function ClueList({ title, clues }: ClueListProps) {
    return (
        <article className="clue-list">
            <h2 className="clue-list-title">{title}</h2>
            <ol className="clue-list-items">
                {clues.map((c) => <li key={c}>{c}</li>)}
            </ol>
        </article>
    );
}