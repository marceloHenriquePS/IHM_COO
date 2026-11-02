import { useState } from "react";
import { DRAG_MIME, readPayload } from "@/features/phase/dnd";
import "./AnimalSlot.css";

interface AnimalSlotProps {
    image: string | null;
    label?: string;
    wrong?: boolean;
    locked?: boolean;
    onDropAnimal: (id: string) => void;
    onClear: () => void;
}

export function AnimalSlot({ image, label, wrong, locked, onDropAnimal, onClear }: AnimalSlotProps) {
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
        if (payload && payload.groupId === "animal") onDropAnimal(payload.value);
    }

    return (
        <div
            className={`animal-slot ${image ? "filled" : ""} ${isOver ? "over" : ""} ${wrong ? "wrong" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsOver(false)}
            onDrop={handleDrop}
            onClick={image && !locked ? onClear : undefined}
            title={image && !locked ? "Clique para remover" : undefined}
        >
            {image ? <img src={image} alt={label ?? "Animal escolhido"} /> : <span>?</span>}
        </div>
    );
}