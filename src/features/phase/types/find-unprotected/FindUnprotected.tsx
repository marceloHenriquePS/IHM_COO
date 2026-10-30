import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { renderRichText } from "@/shared/utils/richText";
import { ClassSheet } from "./components/ClassSheet/ClassSheet";
import { AlterPanel } from "./components/AlterPanel/AlterPanel";
import "./FindUnprotected.css";
import { AccessColumn } from "./components/AccessColumn/AccessColumn";

export function FindUnprotected({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [values, setValues] = useState<Record<string, string>>(() =>
        step.type === "find-unprotected"
            ? Object.fromEntries(step.content.attributes.map((a) => [a.id, a.value]))
            : {}
    );
    const [attributeId, setAttributeId] = useState(() =>
        step.type === "find-unprotected" ? step.content.attributes[0]?.id ?? "" : ""
    );
    const [newValue, setNewValue] = useState("");

    const [access, setAccess] = useState<Record<string, string>>(() =>
        step.type === "find-unprotected" && step.content.access
            ? Object.fromEntries(
                step.content.attributes.map((a) => [a.id, step.content.access!.initial])
            )
            : {}
    );

    if (step.type !== "find-unprotected") return null;
    const { content } = step;

    function handleAttributeChange(id: string) {
        setAttributeId(id);
        clearFeedback();
    }

    function handleValueChange(next: string) {
        setNewValue(next);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        const text = newValue.trim();
        if (!text) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const attr = content.attributes.find((a) => a.id === attributeId);
        if (!attr) return;

        const valid =
            attr.type === "boolean"
                ? text === "true" || text === "false"
                : !Number.isNaN(Number(text.replace(/\./g, "").replace(",", ".")));

        if (!valid) {
            showFeedback({ type: "warning", text: content.messages.invalid });
            return;
        }

        if (attr.id !== content.unprotectedId) {
            showFeedback({ type: "error", text: content.messages.blocked });
            return;
        }

        const cfg = content.access;

        if (cfg) {
            const mode = access[attr.id];

            if (mode === "public") {
                setValues((prev) => ({ ...prev, [attr.id]: text }));
                showFeedback({ type: "error", text: content.messages.stillOpen ?? content.messages.blocked });
                return;
            }

            const allProtected = content.attributes.every(
                (a) => access[a.id] === cfg.requiredId
            );

            if (allProtected) {
                showFeedback({ type: "success", text: content.messages.success });
                onComplete();
            } else {
                showFeedback({ type: "warning", text: content.messages.notAllProtected ?? content.messages.blocked });
            }
            return;
        }

        setValues((prev) => ({ ...prev, [attr.id]: text }));
        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    const rows = content.attributes.map((a) => ({
        ...a,
        icon: ICONS[a.icon],
        value: values[a.id],
    }));

    return (
        <div className="find-unprotected">
            <div className="find-unprotected-top">
                <ClassSheet title={content.className} rows={rows} />
                {content.access && (
                    <AccessColumn
                        title={content.access.title}
                        options={content.access.options}
                        rows={content.attributes}
                        values={access}
                        disabled={locked}
                        onChange={(id, mode) => setAccess((p) => ({ ...p, [id]: mode }))}
                    />
                )}
            </div>


            <p className="find-unprotected-hint">{renderRichText(content.hint)}</p>

            <ResourceCenter icon={ICONS.box} className="alter-center">
                <AlterPanel
                    attributes={content.attributes}
                    selectLabel={content.selectLabel}
                    valueLabel={content.valueLabel}
                    submitLabel={locked ? continueLabel : content.submitLabel}
                    attributeId={attributeId}
                    newValue={newValue}
                    disabled={locked}
                    onAttributeChange={handleAttributeChange}
                    onValueChange={handleValueChange}
                    onSubmit={handleSubmit}
                />
            </ResourceCenter>
        </div>
    );
}