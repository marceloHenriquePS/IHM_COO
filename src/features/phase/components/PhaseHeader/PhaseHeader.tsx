import { renderRichText } from "@/shared/utils/richText";
import "./PhaseHeader.css";

interface PhaseHeaderProps {
    heading: string;
    instructions: string | string[];
}

export function PhaseHeader({ heading, instructions }: PhaseHeaderProps) {
    const [intro, ...items] = Array.isArray(instructions) ? instructions : [instructions];

    return (
        <header className="phase-header">
            <h1 className="phase-header-title">{heading}</h1>
            <p className="phase-header-text">{renderRichText(intro)}</p>

            {items.length > 0 && (
                <ul className="phase-header-list">
                    {items.map((item, i) => (
                        <li key={i}>{renderRichText(item)}</li>
                    ))}
                </ul>
            )}
        </header>
    );
}
