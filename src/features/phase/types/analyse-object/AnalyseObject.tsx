// SelectCandidates.tsx
import type { StepScreenProps } from "../../stepType";
import "./AnalyseObject.css";
import { useState } from "react";
import { ICONS } from "../../icons";
import { PHOTOS } from "./photos";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ResumeList } from "./components/ResumeList/ResumeList";
import type { ResumeFieldDef } from "./components/ResumeList/ResumeCard";

export function AnalyseObject({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);


    if (step.type !== "analyse-object" || !step.content) return null;
    const { content } = step;

    const fields: ResumeFieldDef[] = content.fields.map((f) => ({
        id: f.id,
        label: f.label,
        icon: ICONS[f.icon],
    }));

    function handleToggle(id: string) {
        if (locked) return;

        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        };

        if (selectedIds.length < content.maxSelected) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const isCorrect =
            selectedIds.length === content.answer.length &&
            content.answer.every((id) => selectedIds.includes(id));

        if (!isCorrect) {
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="analyse-object">
            <ResourceCenter>
                <ResumeList
                    candidates={content.candidates}
                    photos={PHOTOS}
                    fields={fields}
                    selectedIds={selectedIds}
                    maxSelected={content.maxSelected}
                    onToggle={handleToggle}
                />
            </ResourceCenter>

            <button className="analyse-submit" type="button" onClick={handleSubmit}>
                {content.submitIcon && !locked && (
                    <img src={ICONS[content.submitIcon]} alt="" className="analyse-submit-icon" />
                )}
                {locked ? continueLabel : content.submitLabel}
            </button>
        </div>
    );
}