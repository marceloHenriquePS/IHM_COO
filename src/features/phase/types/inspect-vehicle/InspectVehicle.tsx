import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { IMAGES } from "./images";
import { InspectionSheet } from "../../components/InspectionSheet/InspectionSheet";
import { RulesPanel } from "./components/RulesPanel/RulesPanel";
import { BooleanPicker } from "./components/BooleanPicker/BooleanPicker";
import "./InspectVehicle.css";

export function InspectVehicle({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [choice, setChoice] = useState<boolean | null>(null);

    if (step.type !== "inspect-vehicle") return null;
    const { content } = step;

    function handleChange(value: boolean) {
        setChoice(value);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        if (choice === null) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        if (choice !== content.answer) {
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="inspect-vehicle">
            <div className="inspect-vehicle-top">
                <InspectionSheet
                    title={`Ficha de Inspeção - VEÍCULO #${content.vehicle.number}`}
                    image={IMAGES[content.vehicle.image]}
                    checks={content.vehicle.checks}
                />
                <RulesPanel/>
            </div>

            <ResourceCenter icon={ICONS.box} className="diagnose-center">
                <BooleanPicker
                    method="estaPronto"
                    value={choice}
                    submitLabel={locked ? continueLabel : content.diagnoseLabel}
                    disabled={locked}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </ResourceCenter>
        </div>
    );
}