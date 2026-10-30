import { useEffect, useRef, useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { Conveyor } from "./components/Conveyor/Conveyor";
import { Compartment } from "./components/Compartment/Compartment";
import { DestinationSwitch } from "./components/DestinationSwitch/DestinationSwitch";
import { RulesModal } from "./components/RulesModal/RulesModal";
import "./SortConveyor.css";

const MOVE_MS = 900;

export function SortConveyor({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [queue, setQueue] = useState<string[]>(() =>
        step.type === "sort-conveyor" ? step.content.attributes.map((a) => a.id) : []
    );
    const [placed, setPlaced] = useState<Record<string, string>>({});
    const [destination, setDestination] = useState(() =>
        step.type === "sort-conveyor" ? step.content.compartments[0]?.id ?? "" : ""
    );
    const [running, setRunning] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    if (step.type !== "sort-conveyor") return null;
    const { content } = step;

    const busy = running || locked;
    const destIndex = content.compartments.findIndex((c) => c.id === destination);
    const direction = destIndex === 0 ? "left" : "right";

    const labelOf = (id: string) =>
        content.attributes.find((a) => a.id === id)?.label ?? id;

    function evaluate(finalPlaced: Record<string, string>) {
        const wrong = content.attributes.filter((a) => finalPlaced[a.id] !== a.answer).length;

        if (wrong === 0) {
            showFeedback({ type: "success", text: content.messages.success });
            onComplete();
        } else {
            showFeedback({
                type: "error",
                text: content.messages.wrong.replace("{n}", String(wrong)),
            });
        }
    }

    function handleRun() {
        if (locked) {
            onContinue();
            return;
        }
        if (running) return;

        if (queue.length === 0) {
            showFeedback({ type: "warning", text: content.messages.queueEmpty });
            return;
        }

        clearFeedback();
        setRunning(true);

        const id = queue[0];
        timer.current = setTimeout(() => {
            const nextPlaced = { ...placed, [id]: destination };
            const nextQueue = queue.slice(1);

            setPlaced(nextPlaced);
            setQueue(nextQueue);
            setRunning(false);

            if (nextQueue.length === 0) evaluate(nextPlaced);
        }, MOVE_MS);
    }

    function handleReturn(id: string) {
        if (busy) return;
        setPlaced((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
        setQueue((prev) => [...prev, id]);
        clearFeedback();
    }

    function handleDestination(id: string) {
        setDestination(id);
        clearFeedback();
    }

    return (
        <div className="sort-conveyor">
            <Conveyor
                item={queue[0] ? labelOf(queue[0]) : null}
                remaining={queue.length}
                leaving={running ? direction : null}
            />

            <div className="sort-conveyor-compartments">
                {content.compartments.map((c) => (
                    <Compartment
                        key={c.id}
                        label={c.label}
                        icon={ICONS[c.icon]}
                        locked={busy}
                        onRemove={handleReturn}
                        items={Object.entries(placed)
                            .filter(([, compartmentId]) => compartmentId === c.id)
                            .map(([id]) => ({ id, label: labelOf(id) }))}
                    />
                ))}
            </div>

            <ResourceCenter icon={ICONS.box} className="conveyor-center">
                <div className="conveyor-controls">
                    <DestinationSwitch
                        options={content.compartments.map((c) => ({
                            id: c.id,
                            label: c.label,
                            icon: ICONS[c.icon],
                        }))}
                        value={destination}
                        disabled={busy}
                        onChange={handleDestination}
                    />

                    <div className="conveyor-buttons">
                        <button type="button" className="conveyor-button" onClick={() => setShowRules(true)}>
                            {content.rulesLabel}
                        </button>
                        <button type="button" className="conveyor-button" disabled={running} onClick={handleRun}>
                            {locked ? continueLabel : content.runLabel}
                        </button>
                    </div>
                </div>
            </ResourceCenter>

            <RulesModal
                open={showRules}
                title={content.rules.title}
                intro={content.rules.intro}
                items={content.rules.items}
                onClose={() => setShowRules(false)}
            />
        </div>
    );
}