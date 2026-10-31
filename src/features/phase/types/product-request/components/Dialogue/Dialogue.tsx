import { useEffect, useState } from "react";
import "./Dialogue.css";

interface DialogueProps {
    label: string;
    text: string | null;
    image: string;
    side: "left" | "right";
    typingSpeed?: number;
}

export function Dialogue({
    label,
    text,
    image,
    side,
    typingSpeed = 35,
}: DialogueProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!text) {
            return;
        }

        let currentIndex = 0;
        let interval: number;

        const timeout = window.setTimeout(() => {
            setIsTyping(true);

            interval = window.setInterval(() => {
                currentIndex++;

                setDisplayedText(text.slice(0, currentIndex));

                if (currentIndex >= text.length) {
                    window.clearInterval(interval);
                    setIsTyping(false);
                }
            }, typingSpeed);
        }, 0);

        return () => {
            window.clearTimeout(timeout);

            if (interval) {
                window.clearInterval(interval);
            }
        };
    }, [text, typingSpeed]);

    return (
        <div className={`dialogue ${side}`}>
            <img
                src={image}
                alt=""
                className="dialogue-image"
            />

            <div className="dialogue-bubble">
                <span className="dialogue-label">{label}</span>

                <p
                    className={`dialogue-text ${isTyping ? "typing" : ""}`}
                    aria-live="polite"
                >
                    {displayedText}
                </p>
            </div>
        </div>
    );
}