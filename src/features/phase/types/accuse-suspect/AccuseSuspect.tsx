import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { IMAGES } from "./images";
import { ClueList } from "./components/ClueList/ClueList";
import { SuspectCard } from "./components/SuspectCard/SuspectCard";
import "./AccuseSuspect.css";

export function AccuseSuspect({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    if (step.type !== "accuse-suspect") return null;
    const { content } = step;

    function handleSelect(id: string) {
        setSelectedId(id);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        if (!selectedId) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        if (selectedId !== content.answer) {
            showFeedback({
                type: "error",
                text: content.messages.wrongBySuspect?.[selectedId] ?? content.messages.wrong,
            });
            return;
        }

        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="accuse-suspect">
            <ClueList title={content.dossierTitle} clues={content.clues} />

            <h3 className="accuse-suspect-question">{content.question}</h3>

            <div className="accuse-suspect-list">
                {content.suspects.map((s) => (
                    <SuspectCard
                        key={s.id}
                        name={s.name}
                        role={s.role}
                        image={IMAGES[s.image]}
                        selected={selectedId === s.id}
                        disabled={locked}
                        onSelect={() => handleSelect(s.id)}
                    />
                ))}
            </div>

            <ResourceCenter icon={ICONS.box} className="accuse-center">
                <div className="accuse-actions">
                    <button type="button" className="accuse-submit" onClick={handleSubmit}>
                        {locked ? continueLabel : content.submitLabel}
                    </button>
                </div>
            </ResourceCenter>
        </div>
    );
}