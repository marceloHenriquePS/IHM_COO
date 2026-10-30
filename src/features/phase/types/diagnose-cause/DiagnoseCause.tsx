import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ReportCard } from "./components/ReportCard/ReportCard";
import { OptionPicker } from "./components/OptionPicker/OptionPicker";
import "./DiagnoseCause.css";

export function DiagnoseCause({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [choice, setChoice] = useState<number | null>(null);

    if (step.type !== "diagnose-cause") return null;
    const { content } = step;

    function handleChange(index: number) {
        setChoice(index);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        if (choice === null) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        if (choice !== content.answer) {
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="diagnose-cause">
            <ReportCard
                title={content.reportTitle}
                question={content.question}
                options={content.options}
            />

            <ResourceCenter icon={ICONS.box} className="cause-center">
                <OptionPicker
                    count={content.options.length}
                    value={choice}
                    submitLabel={locked ? continueLabel : content.submitLabel}
                    disabled={locked}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </ResourceCenter>
        </div>
    );
}