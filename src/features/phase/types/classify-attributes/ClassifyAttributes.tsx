import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { AttributeCard } from "./components/AttributeCard/AttributeCard";
import "./ClassifyAttributes.css";
import { useState } from "react";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { TypeList } from "./components/TypeList/TypeList";

export function ClassifyAttributes({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {
    const [value, setValues] = useState<Record<string, string | null>>({});
    const [wrongIds, setWrongIds] = useState<string[]>([]);


    if (step.type !== "classify-attributes") return null;
    const { content } = step;

    const rows = content.attributes.map((a) => ({
        id: a.id,
        label: a.label,
        icon: ICONS[a.icon],
        value: a.value,
    }));

    function handleFieldChange(fieldId: string, value: string | null) {
        setValues((prev) => ({ ...prev, [fieldId]: value }))
        setWrongIds((prev) => prev.filter(id => id !== fieldId))
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        if (content.attributes.some((a) => !value[a.id])) {
            setWrongIds([]);
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const wrong = content.attributes.filter((a) => value[a.id] !== a.expected);
        if (wrong.length > 0) {
            setWrongIds(wrong.map((a) => a.id));
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        setWrongIds([]);
        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="classify-attributes">
            <AttributeCard
                title={content.className}
                rows={rows}
                types={value}
                wrongIds={wrongIds}
                locked={locked}
                submitLabel={locked ? continueLabel : content.submitLabel}
                submitIcon={!locked && content.submitIcon ? ICONS[content.submitIcon] : undefined}
                onTypeChange={handleFieldChange}
                onSubmit={handleSubmit}
            />

            <ResourceCenter icon={ICONS.box} className="types-center">
                <TypeList types={content.types} locked={locked} />
            </ResourceCenter>
        </div>
    );
}