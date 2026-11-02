import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { StatementList } from "./components/StatementList/StatementList";
import { WordBar } from "./components/WordBar/WordBar";
import "./FillBlanks.css";

export function FillBlanks({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [values, setValues] = useState<Record<string, string | null>>(() =>
        step.type === "fill-blanks"
            ? Object.fromEntries(Object.keys(step.content.answer).map((id) => [id, null]))
            : {}
    );
    const [wrongIds, setWrongIds] = useState<string[]>([]);

    if (step.type !== "fill-blanks") return null;
    const { content } = step;

    function handleChange(blankId: string, word: string | null) {
        setValues((prev) => ({ ...prev, [blankId]: word }));
        setWrongIds([]);
        clearFeedback();
    }

    function handleValidate() {
        if (locked) {
            onContinue();
            return;
        }

        const ids = Object.keys(content.answer);

        if (ids.some((id) => !values[id])) {
            setWrongIds([]);
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const wrong = ids.filter((id) => values[id] !== content.answer[id]);

        if (wrong.length > 0) {
            setWrongIds(wrong);
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        setWrongIds([]);
        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="fill-blanks">
            <StatementList
                title={content.title}
                statements={content.statements}
                values={values}
                wrongIds={wrongIds}
                locked={locked}
                onDropWord={handleChange}
                onClear={(id) => handleChange(id, null)}
            />

            <button type="button" className="fill-blanks-submit" onClick={handleValidate}>
                {locked ? continueLabel : content.validateLabel}
            </button>

            <ResourceCenter icon={ICONS.box} className="words-center">
                <WordBar words={content.words} locked={locked} />
            </ResourceCenter>
        </div>
    );
}