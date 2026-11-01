import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { BaseClassCard, type BaseClassRow } from "./components/BaseClassCard/BaseClassCard";
import { BaseClassResources } from "./components/BaseClassResources/BaseClassResources";
import "./BuildBaseClass.css";

export function BuildBaseClass({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [rows, setRows] = useState<BaseClassRow[]>(() =>
        step.type === "build-base-class"
            ? Array.from({ length: step.content.answer.length }, () => ({ attribute: null, type: null }))
            : []
    );
    const [wrongRows, setWrongRows] = useState<number[]>([]);

    if (step.type !== "build-base-class") return null;
    const { content } = step;

    function handleChange(index: number, field: "attribute" | "type", value: string | null) {
        setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
        setWrongRows([]);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        const filled = rows
            .map((r, i) => ({ ...r, index: i }))
            .filter((r) => r.attribute || r.type);

        const half = filled.filter((r) => !r.attribute || !r.type);
        if (half.length > 0 || filled.length < content.answer.length) {
            setWrongRows(half.map((r) => r.index));
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const used = new Set<number>();
        const wrong: number[] = [];

        filled.forEach((r) => {
            const match = content.answer.findIndex(
                (a, i) => !used.has(i) && a.attribute === r.attribute && a.type === r.type
            );
            if (match === -1) wrong.push(r.index);
            else used.add(match);
        });

        if (wrong.length > 0) {
            setWrongRows(wrong);
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        setWrongRows([]);
        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="build-base-class">
            <BaseClassCard
                title={content.className}
                attributeTitle={content.attributeTitle}
                typeTitle={content.typeTitle}
                rows={rows}
                wrongRows={wrongRows}
                locked={locked}
                onChange={handleChange}
                submitLabel={locked ? continueLabel : content.submitLabel}
                onSubmit={handleSubmit}
            />

            <ResourceCenter icon={ICONS.box} className="base-center">
                <BaseClassResources
                    attributes={content.attributes}
                    types={content.types}
                    locked={locked}
                />
            </ResourceCenter>
        </div>
    );
}