import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { renderRichText } from "@/shared/utils/richText";
import { FOODS, HINT, LABELS, MESSAGES, RULES } from "./feedConfig";
import { IMAGES } from "../match-sounds/images";
import { MethodCall } from "./components/MethodCall/MethodCall";
import { FoodBar } from "./components/FoodBar/FoodBar";
import { FeedRulesModal } from "./components/FeedRulesModal/FeedRulesModal";
import "./FeedAnimal.css";

export function FeedAnimal({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [values, setValues] = useState<(string | null)[]>(() =>
        step.type === "feed-animal" ? step.content.answer.map(() => null) : []
    );
    const [wrongIndexes, setWrongIndexes] = useState<number[]>([]);
    const [showRules, setShowRules] = useState(false);

    if (step.type !== "feed-animal") return null;
    const { content } = step;

    function handleDrop(index: number, food: string) {
        if (values.some((v, i) => v === food && i !== index)) {
            showFeedback({ type: "warning", text: MESSAGES.duplicate });
            return;
        }
        setValues((prev) => prev.map((v, i) => (i === index ? food : v)));
        setWrongIndexes([]);
        clearFeedback();
    }

    function handleClear(index: number) {
        setValues((prev) => prev.map((v, i) => (i === index ? null : v)));
        setWrongIndexes([]);
        clearFeedback();
    }

    function handleFeed() {
        if (locked) {
            onContinue();
            return;
        }

        if (values.some((v) => !v)) {
            setWrongIndexes([]);
            showFeedback({ type: "warning", text: MESSAGES.incomplete });
            return;
        }

        const wrong = values
            .map((v, i) => (content.answer.includes(v as string) ? -1 : i))
            .filter((i) => i !== -1);

        if (wrong.length > 0) {
            setWrongIndexes(wrong);
            showFeedback({ type: "error", text: MESSAGES.wrong });
            return;
        }

        setWrongIndexes([]);
        showFeedback({ type: "success", text: content.success });
        onComplete();
    }

    return (
        <div className="feed-animal">
            <img
                src={IMAGES[content.animal.image]}
                alt=""
                className="feed-animal-image"
            />

            <MethodCall
                method={LABELS.method}
                values={values}
                wrongIndexes={wrongIndexes}
                locked={locked}
                onDropFood={handleDrop}
                onClear={handleClear}
            />

            <div className="feed-animal-buttons">
                <button type="button" onClick={handleFeed}>
                    {locked ? continueLabel : LABELS.feed}
                </button>
                <button type="button" onClick={() => setShowRules(true)}>
                    {LABELS.rules}
                </button>
            </div>

            <p className="feed-animal-hint">{renderRichText(HINT)}</p>

            <ResourceCenter icon={ICONS.box} className="food-center">
                <FoodBar foods={FOODS} locked={locked} />
            </ResourceCenter>

            <FeedRulesModal
                open={showRules}
                title={RULES.title}
                intro={RULES.intro}
                signature={RULES.signature}
                items={RULES.items}
                onClose={() => setShowRules(false)}
            />
        </div>
    );
}