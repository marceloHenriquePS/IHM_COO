// features/phase/types/build-object/BuildObject.tsx
import "./BuildObject.css";
import { ClassCard } from "./components/ClassCard/ClassCard";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ResourceGroups } from "./components/ResourceGroups/ResourceGroups";
import { useState } from "react";
import type { PhaseScreenProps } from "../../phaseTypes";

export function BuildObject({ phase, showFeedback, clearFeedback}: PhaseScreenProps) {
    const [values, setValues] = useState<Record<string, string | null>>({});
    const [wrongIds, setWrongIds] = useState<string[]>([]);


    if (phase.type !== "build-object") return null;

    const { content } = phase;

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
    }


    return (
        <div className="build-object">
            <ClassCard
                title={content.className}
                fields={fields}
                values={values}
                submitLabel={content.submitLabel}
                submitIcon={content.submitIcon ? ICONS[content.submitIcon] : undefined}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
                wrongIds={wrongIds}
            />

            <ResourceCenter icon={content.resourceIcon ? ICONS[content.resourceIcon] : undefined}>
                <ResourceGroups groups={groups} />
            </ResourceCenter>
        </div>
    );
}