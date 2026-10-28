import { useState } from "react";
import { DRAG_MIME, readPayload } from "../../dnd";
import "./DropSlot.css";

interface DropSlotProps {
    accept: string;
    value: string | null;
    placeholder?: string;
    wrong?: boolean;
    locked?: boolean;
    onDropValue: (value: string) => void;
    onClear: () => void;
}

export function DropSlot({
    accept, value, placeholder = "+", wrong, locked, onDropValue, onClear,
}: DropSlotProps) {
    const [isOver, setIsOver] = useState(false);

    function handleDragOver(e: React.DragEvent) {
        if (locked) return;
        if (e.dataTransfer.types.includes(DRAG_MIME)) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
            setIsOver(true);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsOver(false);
        if (locked) return;

        const payload = readPayload(e);
        if (payload && payload.groupId === accept) onDropValue(payload.value);
    }

    return (
        <div
            className={`drop-slot ${value ? "filled" : ""} ${isOver ? "over" : ""} ${wrong ? "wrong" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsOver(false)}
            onDrop={handleDrop}
            onClick={value && !locked ? onClear : undefined}
            title={value && !locked ? "Clique para remover" : undefined}
        >
            {value ?? placeholder}
        </div>
    );
}