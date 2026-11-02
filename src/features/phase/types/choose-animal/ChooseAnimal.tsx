import { useEffect, useRef, useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { Dialogue } from "../../components/Dialogue/Dialogue";
import { IMAGES } from "../match-sounds/images";
import { AnimalSlot } from "./components/AnimalSlot/AnimalSlot";
import { AnimalPicker } from "./components/AnimalPicker/AnimalPicker";
import "./ChooseAnimal.css";

const NEXT_REQUEST_MS = 2500;

export function ChooseAnimal({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [requestIndex, setRequestIndex] = useState(0);
    const [chosen, setChosen] = useState<string | null>(null);
    const [wrong, setWrong] = useState(false);
    const [reply, setReply] = useState<string | null>(null);
    const [resolved, setResolved] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    if (step.type !== "choose-animal") return null;
    const { content } = step;
    const { messages } = content;
    const request = content.requests[requestIndex];
    const isLast = requestIndex === content.requests.length - 1;

    const animals = content.animals.map((a) => ({ ...a, image: IMAGES[a.image] }));
    const chosenAnimal = animals.find((a) => a.id === chosen);

    function handleDrop(id: string) {
        if (resolved) return;
        setChosen(id);
        setWrong(false);
        clearFeedback();
    }

    function handleClear() {
        setChosen(null);
        setWrong(false);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }
        if (resolved) return;

        if (!chosen) {
            showFeedback({ type: "warning", text: messages.incomplete });
            return;
        }

        if (chosen !== request.answer) {
            setWrong(true);
            showFeedback({
                type: "error",
                text: messages.wrongBy?.[chosen] ?? messages.wrong,
            });
            return;
        }

        setResolved(true);
        setReply(request.reply);

        if (isLast) {
            showFeedback({ type: "success", text: messages.success });
            onComplete();
            return;
        }

        timer.current = setTimeout(() => {
            setRequestIndex((i) => i + 1);
            setChosen(null);
            setReply(null);
            setResolved(false);
        }, NEXT_REQUEST_MS);
    }

    return (
        <div className="choose-animal">
            <Dialogue
                label={content.speakerLabel}
                text={reply ?? request.text}
                image={IMAGES[content.speakerImage]}
                side="left"
            />

            <div className="choose-animal-answer">
                <AnimalSlot
                    image={chosenAnimal?.image ?? null}
                    label={chosenAnimal?.label}
                    wrong={wrong}
                    locked={locked || resolved}
                    onDropAnimal={handleDrop}
                    onClear={handleClear}
                />

                <button type="button" className="choose-animal-submit" onClick={handleSubmit}>
                    {locked ? continueLabel : content.submitLabel}
                </button>
            </div>

            <ResourceCenter icon={ICONS.box} className="animals-center">
                <AnimalPicker animals={animals} locked={locked || resolved} />
            </ResourceCenter>
        </div>
    );
}