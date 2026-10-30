import { useEffect, useRef, useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { IMAGES } from "./images";
import { Terminal } from "./components/Terminal/Terminal";
import { MethodQueue } from "./components/MethodQueue/MethodQueue";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import "./SequenceMethods.css";
import { MethodList } from "../../components/MethodList/MethodList";

const STEP_DELAY_MS = 1200;

export function SequenceMethods({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [queue, setQueue] = useState<string[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const [running, setRunning] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [failedIndex, setFailedIndex] = useState<number | null>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    if (step.type !== "sequence-methods") return null;
    const { content } = step;

    const busy = running || locked;

    function resetRun() {
        setStatus(null);
        setActiveIndex(null);
        setFailedIndex(null);
        clearFeedback();
    }

    function handleDropMethod(name: string) {
        if (busy || queue.length >= content.slots) return;
        setQueue((prev) => [...prev, name]);
        resetRun();
    }

    function handleUndo() {
        if (busy || queue.length === 0) return;
        setQueue((prev) => prev.slice(0, -1));
        resetRun();
    }

    function runStep(index: number) {
        const name = queue[index];
        setActiveIndex(index);

        if (name !== content.answer[index]) {
            setFailedIndex(index);
            setStatus(`Erro ao executar ${name}: essa ação não pode acontecer agora.`);
            showFeedback({ type: "error", text: content.messages.wrong });
            setRunning(false);
            return;
        }

        const method = content.methods.find((m) => m.name === name);
        setStatus(method?.status ?? name);

        if (index === queue.length - 1) {
            timer.current = setTimeout(() => {
                setRunning(false);
                showFeedback({ type: "success", text: content.messages.success });
                onComplete();
            }, STEP_DELAY_MS);
            return;
        }

        timer.current = setTimeout(() => runStep(index + 1), STEP_DELAY_MS);
    }

    function handleExecute() {
        if (locked) {
            onContinue();
            return;
        }
        if (running) return;

        if (queue.length < content.slots) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        clearFeedback();
        setFailedIndex(null);
        setRunning(true);
        runStep(0);
    }

    const isError = failedIndex !== null;

    return (
        <div className="sequence-methods">
            <img
                className="sequence-methods-image"
                src={IMAGES[content.image]}
                alt=""
            />

            <Terminal text={status ?? content.initialStatus} error={isError} />

            <MethodQueue
                slots={content.slots}
                items={queue}
                activeIndex={activeIndex}
                failedIndex={failedIndex}
                locked={busy}
                onDropMethod={handleDropMethod}
            />

            <div className="sequence-methods-actions">
                <button
                    type="button"
                    className="sequence-button"
                    disabled={busy || queue.length === 0}
                    onClick={handleUndo}
                >
                    {content.undoLabel}
                </button>

                <button
                    type="button"
                    className="sequence-button"
                    disabled={running}
                    onClick={handleExecute}
                >
                    {locked ? continueLabel : content.runLabel}
                </button>
            </div>

            <ResourceCenter className="methods-center">
                <MethodList
                    methods={content.methods.map((m) => m.name)}
                    locked={busy}
                />
            </ResourceCenter>
        </div>
    );
}