import "./FeedbackMessage.css";

export interface Feedback {
    type: "warning" | "error" | "success";
    text: string;
}

export function FeedbackMessage({ feedback }: { feedback: Feedback | null }) {
    return (
        <div className="feedback-area" role="status" aria-live="polite">
            {feedback && <p key={feedback.text + feedback.type} className={`feedback feedback-${feedback.type}`}>{feedback.text}</p>}
        </div>
    );
}