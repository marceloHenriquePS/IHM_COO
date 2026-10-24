import { useCallback, useEffect, useRef, useState } from "react";
import type { Feedback } from "../components/FeedbackMessage/FeedbackMessage";

const DURATIONS: Record<Feedback["type"], number> = {
    warning: 3500,
    error: 4500,
    success: 6000,
};

export function useFeedback() {
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const clearFeedback = useCallback(() => {
        clearTimeout(timer.current);
        setFeedback(null);
    }, []);

    const showFeedback = useCallback((next: Feedback) => {
        clearTimeout(timer.current);
        setFeedback({ ...next });
        timer.current = setTimeout(() => setFeedback(null), DURATIONS[next.type]);
    }, []);

    useEffect(() => () => clearTimeout(timer.current), []);

    return { feedback, showFeedback, clearFeedback };
}