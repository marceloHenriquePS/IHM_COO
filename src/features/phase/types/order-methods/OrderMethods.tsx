
import { useEffect, useRef, useState } from "react";
import type { StepScreenProps } from "../../stepType";
import type { OrderTone } from "@/shared/data/modules";
import { IMAGES } from "./images";
import { OrderCard } from "./components/ActionCard/OrderCard";
import { ActionList } from "../../components/ActionList/ActionList";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import "./OrderMethods.css";
import { ICONS } from "../../icons";

const PREPARATE_DELAY_MS = 5000;

type OrderStatus = "pending" | "preparing" | "ready" | "served";

export function OrderMethods({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback, }: StepScreenProps) {
    const [phase, setPhase] = useState<OrderStatus>("pending");
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const [progress, setProgress] = useState(0);

    useEffect(() => () => clearTimeout(timer.current), []);

    if (step.type !== "order-methods") return null;
    const { content } = step;
    const { order, states, messages } = content;

    const badge: { label: string; tone: OrderTone } =
        phase === "pending" ? order.badge : states[phase].badge;

    const details = order.details.map((d) =>
        d.id === "estado" && phase !== "pending"
            ? { ...d, value: states[phase].status }
            : d
    );

    function handleAction(id: string) {
        clearFeedback();

        if (id === "prepare") {
            if (phase === "preparing") return;
            if (phase !== "pending") {
                showFeedback({ type: "warning", text: messages.alreadyPrepared });
                return;
            }

            setProgress(0);
            setPhase("preparing");

            const start = Date.now();

            const interval = setInterval(() => {
                const elapsed = Date.now() - start;
                const percentage = Math.min(
                    (elapsed / PREPARATE_DELAY_MS) * 100,
                    100
                );

                setProgress(percentage);

                if (percentage >= 100) {
                    clearInterval(interval);
                    setPhase("ready");
                }
            }, 50);
            
            timer.current = setTimeout(() => setPhase("ready"), PREPARATE_DELAY_MS);
            return;
        }



        if (id === "serve") {
            if (phase === "preparing") {
                showFeedback({ type: "warning", text: messages.preparing });
                return;
            }
            if (phase !== "ready") {
                showFeedback({ type: "error", text: messages.notReady });
                return;
            }
            setPhase("served");
            showFeedback({ type: "success", text: messages.success });
            onComplete();
        }
    }

    const actions = content.actions.map((a) => ({
        id: a.id,
        title: a.title,
        call: a.call,
        icon: ICONS[a.icon],
    }));

    return (
        <div className="order-methods">
            {content && details && (
                <>
                    <OrderCard
                        number={content.order.id}
                        item={content.order.item}
                        image={IMAGES[content.order.image]}
                        badge={badge}
                        details={details}
                        progress={progress}
                    />

                    <h3 className="order-methods-question">{content.question}</h3>

                    <ResourceCenter className="order-center">
                        <ActionList actions={actions} disabled={locked} onAction={handleAction} />
                    </ResourceCenter>

                    {locked && (
                        <button type="button" className="order-continue" onClick={onContinue}>
                            {continueLabel}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
