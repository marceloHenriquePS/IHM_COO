import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { DropSlot } from "../../components/DropSlot/DropSlot";
import { InspectionSheet } from "../../components/InspectionSheet/InspectionSheet";
import { IMAGES } from "./images";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { MethodList } from "../../components/MethodList/MethodList";
import "./RepairVehicle.css";

export function RepairVehicle({
    step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback,
}: StepScreenProps) {
    const [slot, setSlot] = useState<string | null>(null);
    const [doneIds, setDoneIds] = useState<string[]>([]);

    if (step.type !== "repair-vehicle") return null;
    const { content } = step;

    function handleSlotChange(method: string | null) {
        setSlot(method);
        clearFeedback();
    }

    function handleRun() {
        if (locked) {
            onContinue();
            return;
        }

        if (!slot) {
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const task = content.tasks.find((t) => t.method === slot);
        if (!task) return;

        setSlot(null);

        if (doneIds.includes(task.id)) {
            showFeedback({ type: "warning", text: content.messages.alreadyDone });
            return;
        }

        if (!task.needed) {
            showFeedback({ type: "error", text: content.messages.unnecessary });
            return;
        }

        const next = [...doneIds, task.id];
        setDoneIds(next);

        const remaining = content.tasks.filter((t) => t.needed && !next.includes(t.id)).length;

        if (remaining === 0) {
            showFeedback({ type: "success", text: content.messages.success });
            onComplete();
        } else {
            showFeedback({
                type: "success",
                text: content.messages.progress.replace("{n}", String(remaining)),
            });
        }
    }

    return (
        <div className="repair-vehicle">
            <div className="repair-vehicle-top">
                <InspectionSheet
                    title={`${content.sheetTitle} - VEÍCULO #${content.vehicle.number}`}
                    image={IMAGES[content.vehicle.image]}
                    checks={content.tasks.map((t) => ({ id: t.id, label: t.label, value: t.needed }))}
                    doneIds={doneIds}
                />

                <div className="repair-vehicle-action">
                    <p className="repair-vehicle-prompt">{content.prompt}</p>

                    <div className="repair-vehicle-slot">
                        <DropSlot
                            accept="method"
                            value={slot}
                            locked={locked}
                            onDropValue={handleSlotChange}
                            onClear={() => handleSlotChange(null)}
                        />
                    </div>

                    <button type="button" className="repair-vehicle-run" onClick={handleRun}>
                        {locked ? continueLabel : content.runLabel}
                    </button>
                </div>
            </div>

            <ResourceCenter icon={ICONS.box} className="repair-center">
                <MethodList methods={content.methods} locked={locked} />
            </ResourceCenter>
        </div>
    );
}