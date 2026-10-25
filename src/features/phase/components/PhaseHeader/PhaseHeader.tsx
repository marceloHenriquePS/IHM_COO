import { renderRichText } from "@/shared/utils/richText";
import "./PhaseHeader.css";

interface PhaseHeaderProps {
    heading: string;
    instructions: string;
    requirements?: string[];
}

export function PhaseHeader({ heading, instructions, requirements }: PhaseHeaderProps) {
    return (
        <header className="phase-header">
            <h1 className="phase-header-title">{heading}</h1>
            <p className="phase-header-text">{renderRichText(instructions)}</p>

            {requirements && (
                <ol className="phase-header-list">
                    {requirements.map((req, i) => <li key={i}>{renderRichText(req)}</li>)}
                </ol>
            )

            }
        </header>
    );
}
