// features/phase/types/build-object/BuildObject.tsx
import "./BuildObject.css";
import { ClassCard } from "./components/ClassCard/ClassCard";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ResourceGroups } from "./components/ResourceGroups/ResourceGroups";
import { useState } from "react";
import type { StepScreenProps } from "../../stepType";

export function BuildObject({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {
    const [values, setValues] = useState<Record<string, string | null>>({});
    const [wrongIds, setWrongIds] = useState<string[]>([]);


    if (step.type !== "build-object") return null;
    const { content } = step;

    const fields = content.fields.map((f) => ({
        id: f.id,
        label: f.label,
        icon: ICONS[f.icon],
    }));

    const groups = content.groups.map((g) => ({
        ...g,
        icon: ICONS[g.icon],
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

        const hasEmpty = content.fields.some((f) => !values[f.id]);
        if (hasEmpty) {
            setWrongIds([]);
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const wrong = content.fields.filter((f) => values[f.id] !== f.expected);
        if (wrong.length > 0) {
            setWrongIds(wrong.map((f) => f.id));
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        setWrongIds([]);
        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }


    return (
        <div className="build-object">
            <ClassCard
                title={content.className}
                fields={fields}
                values={values}
                locked={locked}
                submitLabel={locked ? continueLabel : content.submitLabel}
                submitIcon={!locked && content.submitIcon ? ICONS[content.submitIcon] : undefined}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                wrongIds={wrongIds}
            />

            <ResourceCenter>
                <ResourceGroups groups={groups} />
            </ResourceCenter>
        </div>
    );
}