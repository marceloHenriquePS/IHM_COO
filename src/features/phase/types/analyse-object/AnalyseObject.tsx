// SelectCandidates.tsx
import type { PhaseScreenProps } from "../../phaseTypes";
// import { BriefPanel } from "./components/BriefPanel/BriefPanel";
import "./AnalyseObject.css";
import { useState } from "react";
import { ICONS } from "../../icons";
import { PHOTOS } from "./photos";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ResumeList } from "./components/ResumeList/ResumeList";
import type { ResumeFieldDef } from "./components/ResumeList/ResumeCard";

export function AnalyseObject({ phase, showFeedback, clearFeedback }: PhaseScreenProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);


    if (phase.type !== "analyse-object" || !phase.content) return null;
    const { content } = phase;

    const fields: ResumeFieldDef[] = content.fields.map((f) => ({
        id: f.id,
        label: f.label,
        icon: ICONS[f.icon],
    }));

    function handleToggle(id: string) {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
        clearFeedback();
    }

    function handleSubmit() {
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
    }

    return (
        <div className="analyse-object">
            <ResourceCenter icon={ICONS.box}>
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
                {content.submitLabel}
            </button>
        </div>
    );
}