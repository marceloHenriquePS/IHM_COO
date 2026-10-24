import { useState } from "react";
import { DRAG_MIME, readPayload } from "../../dnd";

interface FieldSlotProps {
    id: string;
    label: string;
    icon: string;
    value: string | null;
    wrong?: boolean
    onDropValue: (value: string) => void;
    onClear: () => void;

}

export function FieldSlot({ id, label, icon, value, wrong, onDropValue, onClear }: FieldSlotProps) {
    const [isOver, setIsOver] = useState(false);

    function handleDragOver(e: React.DragEvent) {
        if (e.dataTransfer.types.includes(DRAG_MIME)) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
            setIsOver(true);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsOver(false);

        const payload = readPayload(e);
        if (payload && payload.groupId === id) {
            onDropValue(payload.value);
        }
    }

    return (
        <div className="field-slot">
            <div className="field-slot-label">
                <img src={icon} alt="" className="field-slot-icon" />
                <span>{label}</span>
            </div>

            <div
                className={`field-slot-value ${value ? "filled" : ""} ${isOver ? "over" : ""} ${wrong ? "wrong" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={() => setIsOver(false)}
                onDrop={handleDrop}
                onClick={value ? onClear : undefined}
                title={value ? "Clique para remover" : undefined}
            >
                {value ?? "+"}
            </div>
        </div>
    );
}