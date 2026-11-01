import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ClassBox } from "../../components/ClassBox/ClassBox";
import { RepetitionReport } from "./components/RepetitionReport/RepetitionReport";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { RegisterInput } from "./components/RegisterInput/RegisterInput";
import "./FindRepetitions.css";

const normalize = (text: string) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s/g, "");

export function FindRepetitions({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [registered, setRegistered] = useState<string[]>([]);

    if (step.type !== "find-repetitions") return null;
    const { content } = step;
    const { messages } = content;

    function handleRegister(raw: string): boolean {
        const text = raw.trim();
        if (!text) {
            showFeedback({ type: "warning", text: messages.emptyInput });
            return false;
        }

        const key = normalize(text);

        if (registered.some((r) => normalize(r) === key)) {
            showFeedback({ type: "warning", text: messages.duplicate });
            return false;
        }

        const exists = content.classes.some((c) =>
            c.attributes.some((a) => normalize(a.name) === key)
        );
        if (!exists) {
            showFeedback({ type: "error", text: messages.notFound });
            return false;
        }

        const official =
            content.classes.flatMap((c) => c.attributes).find((a) => normalize(a.name) === key)!.name;

        setRegistered((prev) => [...prev, official]);
        clearFeedback();
        return true;
    }

    function handleRemove(name: string) {
        if (locked) return;
        setRegistered((prev) => prev.filter((n) => n !== name));
        clearFeedback();
    }

    function handleSend() {
        if (locked) {
            onContinue();
            return;
        }

        if (registered.length === 0) {
            showFeedback({ type: "warning", text: messages.incomplete });
            return;
        }

        const answerKeys = content.answer.map(normalize);
        const reportKeys = registered.map(normalize);

        if (reportKeys.some((k) => !answerKeys.includes(k))) {
            showFeedback({ type: "error", text: messages.extra });
            return;
        }

        if (answerKeys.some((k) => !reportKeys.includes(k))) {
            showFeedback({ type: "warning", text: messages.missing });
            return;
        }

        showFeedback({ type: "success", text: messages.success });
        onComplete();
    }

    return (
        <div className="find-repetitions">
            <div className="find-repetitions-classes">
                {content.classes.map((c) => (
                    <ClassBox key={c.id} name={c.name} tone={c.tone} attributes={c.attributes} />
                ))}
            </div>

            <RepetitionReport
                title={content.reportTitle}
                items={registered}
                sendLabel={locked ? continueLabel : content.sendLabel}
                locked={locked}
                onRemove={handleRemove}
                onSend={handleSend}
            />

            <ResourceCenter className="register-center">
                <RegisterInput
                    placeholder={content.inputPlaceholder}
                    submitLabel={content.registerLabel}
                    disabled={locked}
                    onRegister={handleRegister}
                />
            </ResourceCenter>        </div>
    );
}