import { useEffect, useRef, useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { IMAGES } from "./images";
import { OrderTile } from "./components/OrderTile/OrderTile";
import "./OrderQueue.css";
import type { OrderTone } from "@/shared/data/modules";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { ActionList } from "../order-methods/components/ActionList/ActionList";

const PREPARATE_DELAY_MS = 10000;

export function OrderQueue({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {
    const [phases, setPhases] = useState<Record<string, OrderTone>>(() => {
        const initialPhases: Record<string, OrderTone> = {};

        if (step.type === "order-queue") {
            step.content.orders.forEach((order) => {
                initialPhases[order.id] = order.phase;
            });
        }

        return initialPhases;
    });

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    const delay = step.type === "order-queue" ? PREPARATE_DELAY_MS : 0;
    const [progress, setProgress] = useState<Record<string, number>>({});

    function finishPrepare(id: string) {
        const start = Date.now();

        setProgress((prev) => ({ ...prev, [id]: 0 }));

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const percentage = Math.min((elapsed / delay) * 100, 100);

            setProgress((prev) => ({ ...prev, [id]: percentage }));

            if (percentage >= 100) {
                clearInterval(interval);
                setPhases((prev) => ({ ...prev, [id]: "ready" }));
            }
        }, 50);

        timers.current[id] = setTimeout(() => {
            clearInterval(interval);
            setProgress((prev) => ({ ...prev, [id]: 100 }));
            setPhases((prev) => ({ ...prev, [id]: "ready" }));
        }, delay);
    }

    useEffect(() => {
        if (step.type !== "order-queue") return;
        step.content.orders.forEach((o) => {
            if (o.phase === "preparing") finishPrepare(o.id);
        });
        const current = timers.current;
        return () => Object.values(current).forEach(clearTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (step.type !== "order-queue") return null;
    const { content } = step;
    const { messages, states } = content;

    function handleAction(actionId: string) {
        clearFeedback();

        if (!selectedId) {
            showFeedback({ type: "warning", text: messages.noSelection });
            return;
        }

        const phase = phases[selectedId];

        if (actionId === "prepare") {
            if (phase === "preparing") {
                showFeedback({ type: "warning", text: messages.preparing });
            } else if (phase !== "pending") {
                showFeedback({ type: "warning", text: messages.alreadyPrepared });
            } else {
                setPhases((prev) => ({ ...prev, [selectedId]: "preparing" }));
                finishPrepare(selectedId);
            }
            return;
        }

        if (phase === "served") {
            showFeedback({ type: "warning", text: messages.alreadyServed });
        } else if (phase === "preparing") {
            showFeedback({ type: "warning", text: messages.preparing });
        } else if (phase !== "ready") {
            showFeedback({ type: "error", text: messages.notReady });
        } else {
            const next = { ...phases, [selectedId]: "served" as OrderTone };
            setPhases(next);

            const remaining = Object.values(next).filter((p) => p !== "served").length;
            if (remaining === 0) {
                showFeedback({ type: "success", text: messages.success });
                onComplete();
            } else {
                showFeedback({
                    type: "success",
                    text: messages.served.replace("{n}", String(remaining)),
                });
            }
        }
    }

    const actions = content.actions.map((a) => ({
        id: a.id, title: a.title, call: a.call, icon: ICONS[a.icon],
    }));

    return (
        <div className="order-queue">
            <div className="order-queue-list">
                {content.orders.map((o) => {
                    const phase = phases[o.id] ?? o.phase ?? "pending";
                    const currentState = states[phase] ?? states.pending;
                    const details = o.details.map((d) =>
                        d.id === "estado" ? { ...d, value: currentState.status } : d
                    );
                    return (
                        <OrderTile
                            key={o.id}
                            id={o.id}
                            item={o.item}
                            image={IMAGES[o.image]}
                            badge={currentState.badge}
                            details={details}
                            selected={selectedId === o.id}
                            disabled={locked}
                            progress={progress[o.id] ?? 0}
                            onSelect={() => setSelectedId(o.id)}
                        />
                    );
                })}
            </div>

            <ResourceCenter icon={ICONS.box} className="actions-center">
                <ActionList actions={actions} disabled={locked} onAction={handleAction} />
            </ResourceCenter>

            {locked && (
                <button className="order-continue" type="button" onClick={onContinue}>
                    {continueLabel}
                </button>
            )}
        </div>
    );
}