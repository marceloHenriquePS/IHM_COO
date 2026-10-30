import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { InspectionSheet } from "../../components/InspectionSheet/InspectionSheet";
import { IMAGES } from "./images";
import { PriceTable } from "./components/PriceTable/PriceTable";
import { PaymentInput } from "./components/PaymentInput/PaymentInput";
import "./CalculatePayment.css";

export function CalculatePayment({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [value, setValue] = useState("");

    if (step.type !== "calculate-payment") return null;
    const { content } = step;

    const total = content.tasks
        .filter((t) => t.needed)
        .reduce((sum, t) => sum + t.price, 0);

    function handleChange(next: string) {
        setValue(next);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        const text = value.trim();
        if (!text) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const typed = Number(text.replace(",", "."));
        if (Number.isNaN(typed)) {
            showFeedback({ type: "warning", text: content.messages.invalid });
            return;
        }

        if (typed !== total) {
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="calculate-payment">
            <div className="calculate-payment-top">
                <InspectionSheet
                    title={`${content.sheetTitle} - VEÍCULO #${content.vehicle.number}`}
                    image={IMAGES[content.vehicle.image]}
                    checks={content.tasks.map((t) => ({ id: t.id, label: t.label, value: t.needed }))}
                />

                <PriceTable
                    title={content.priceTitle}
                    image={IMAGES[content.priceImage]}
                    items={content.tasks}
                />
            </div>

            <ResourceCenter icon={ICONS.box} className="payment-center">
                <PaymentInput
                    method={content.method}
                    value={value}
                    submitLabel={locked ? continueLabel : content.submitLabel}
                    disabled={locked}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </ResourceCenter>
        </div>
    );
}