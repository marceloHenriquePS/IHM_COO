import { renderRichText } from "@/shared/utils/richText";
import "./PhaseHeader.css";

interface PhaseHeaderProps {
    heading: string;
    instructions: string;
}

export function PhaseHeader({ heading, instructions }: PhaseHeaderProps) {
    return (
        <header className="phase-header">
            <h1 className="phase-header-title">{heading}</h1>
            <p className="phase-header-text">{renderRichText(instructions)}</p>
        </header>
    );
}
