import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ClassPanel } from "./components/ClassPanel/ClassPanel";
import { ChipsBar } from "./components/ChipsBar/ChipsBar";
import "./BuildSubclasses.css";

export function BuildSubclasses({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    // id da classe filha -> labels dos atributos colocados
    const [placed, setPlaced] = useState<Record<string, string[]>>(() =>
        step.type === "build-subclasses"
            ? Object.fromEntries(step.content.children.map((c) => [c.id, []]))
            : {}
    );
    // "classeId:label" dos itens marcados em vermelho
    const [wrongKeys, setWrongKeys] = useState<string[]>([]);

    if (step.type !== "build-subclasses") return null;
    const { content } = step;
    const { messages } = content;

    const attrOf = (label: string) => content.attributes.find((a) => a.label === label);
    const textOf = (label: string) => {
        const a = attrOf(label);
        return a ? `${a.type}: ${a.field}` : label;
    };

    function handleDrop(classId: string, label: string) {
        if (placed[classId].includes(label)) {
            showFeedback({ type: "warning", text: messages.duplicate });
            return;
        }
        setPlaced((prev) => ({ ...prev, [classId]: [...prev[classId], label] }));
        setWrongKeys([]);
        clearFeedback();
    }

    function handleRemove(classId: string, label: string) {
        setPlaced((prev) => ({ ...prev, [classId]: prev[classId].filter((l) => l !== label) }));
        setWrongKeys([]);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        const total = Object.values(placed).reduce((sum, list) => sum + list.length, 0);
        if (total === 0) {
            showFeedback({ type: "warning", text: messages.incomplete });
            return;
        }

        const inherited: string[] = [];
        const wrong: string[] = [];
        let missing = false;

        content.children.forEach((c) => {
            placed[c.id].forEach((label) => {
                const key = `${c.id}:${label}`;
                if (content.parent.attributes.includes(label)) inherited.push(key);
                else if (!c.answer.includes(label)) wrong.push(key);
            });
            if (c.answer.some((label) => !placed[c.id].includes(label))) missing = true;
        });

        if (inherited.length > 0) {
            setWrongKeys([...inherited, ...wrong]);
            showFeedback({ type: "error", text: messages.inherited });
            return;
        }
        if (wrong.length > 0) {
            setWrongKeys(wrong);
            showFeedback({ type: "error", text: messages.wrong });
            return;
        }
        if (missing) {
            showFeedback({ type: "warning", text: messages.missing });
            return;
        }

        setWrongKeys([]);
        showFeedback({ type: "success", text: messages.success });
        onComplete();
    }

    return (
        <div className="build-subclasses">
            <div className="build-subclasses-row">
                <ClassPanel
                    name={content.parent.name}
                    tone="yellow"
                    tag="classe base"
                    items={content.parent.attributes.map((label) => ({ label, text: textOf(label) }))}
                />

                {content.children.map((c) => (
                    <ClassPanel
                        key={c.id}
                        name={c.name}
                        tone={c.tone}
                        tag={`herda de ${content.parent.name}`}
                        emptyText="Arraste os atributos aqui"
                        locked={locked}
                        items={placed[c.id].map((label) => ({
                            label,
                            text: textOf(label),
                            wrong: wrongKeys.includes(`${c.id}:${label}`),
                        }))}
                        onDropAttribute={(label) => handleDrop(c.id, label)}
                        onRemove={(label) => handleRemove(c.id, label)}
                    />
                ))}
            </div>

            <ResourceCenter icon={ICONS.box} className="subclass-center">
                <div className="subclass-center-row">
                    <ChipsBar labels={content.attributes.map((a) => a.label)} locked={locked} />


                </div>
            </ResourceCenter>

            <button type="button" className="subclass-submit" onClick={handleSubmit}>
                {locked ? continueLabel : content.submitLabel}
            </button>
        </div>
    );
}