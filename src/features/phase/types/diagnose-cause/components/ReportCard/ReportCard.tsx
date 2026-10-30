import "./ReportCard.css";

interface ReportCardProps {
    title: string;
    question: string;
    options: string[];
}

export function ReportCard({ title, question, options }: ReportCardProps) {
    return (
        <article className="report-card">
            <h2 className="report-card-title">{title}</h2>

            <p className="report-card-question">{question}</p>

            <ol className="report-card-options">
                {options.map((text) => (
                    <li key={text}>{text}</li>
                ))}
            </ol>
        </article>
    );
}