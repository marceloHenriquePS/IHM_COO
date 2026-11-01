import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { PairBoard } from "./components/PairBoard/PairBoard";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ClassCardView } from "./components/ClassCardView/ClassCardView";
import { HotelRulesModal } from "./components/HotelRulesModal/HotelRulesModal";
import "./MatchPairs.css";

export function MatchPairs({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {
    const [links, setLinks] = useState<Record<string, string>>({});
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [showRules, setShowRules] = useState(false);
    const [wrongLeft, setWrongLeft] = useState<string[]>([]);

    if (step.type !== "match-pairs") return null;
    const { content } = step;

    function resetFeedback() {
        setWrongLeft([]);
        clearFeedback();
    }

    function handleSelectLeft(id: string) {
        if (links[id]) {
            setLinks((prev) => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        }
        setSelectedLeft((cur) => (cur === id && !links[id] ? null : id));
        resetFeedback();
    }

    function handleSelectRight(rightId: string) {
        if (!selectedLeft) return;

        setLinks((prev) => {
            const next = { ...prev };

            Object.keys(next).forEach((l) => {
                if (next[l] === rightId) delete next[l];
            });

            next[selectedLeft] = rightId;
            return next;
        });
        setSelectedLeft(null);
        resetFeedback();
    }

    function handleValidate() {
        if (locked) {
            onContinue();
            return;
        }

        if (content.leftItems.some((l) => !links[l.id])) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const wrong = content.leftItems
            .filter((l) => links[l.id] !== content.answer[l.id])
            .map((l) => l.id);

        if (wrong.length > 0) {
            setWrongLeft(wrong);
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="match-pairs">
            <PairBoard
                left={content.leftItems}
                right={content.rightItems}
                links={links}
                selectedLeft={selectedLeft}
                wrongLeft={wrongLeft}
                locked={locked}
                onSelectLeft={handleSelectLeft}
                onSelectRight={handleSelectRight}
            />

            <ResourceCenter className="match-center">
                <div className="match-center-row">
                    <ClassCardView
                        name={content.classCard.name}
                        attributes={content.classCard.attributes}
                        method={content.classCard.method}
                    />

                    <div className="match-center-buttons">
                        <button type="button" onClick={() => setShowRules(true)}>
                            {content.rulesLabel}
                        </button>
                        <button type="button" onClick={handleValidate}>
                            {locked ? continueLabel : content.validateLabel}
                        </button>
                    </div>
                </div>
            </ResourceCenter>

            <HotelRulesModal
                open={showRules}
                title={content.rules.title}
                intro={content.rules.intro}
                inherits={content.rules.inherits}
                jobs={content.rules.jobs}
                onClose={() => setShowRules(false)}
            />        
        </div>
    );
}