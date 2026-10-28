import { useState } from "react";
import { DRAG_MIME, readPayload } from "@/features/phase/dnd";
import "./MethodQueue.css";

interface MethodQueueProps {
    slots: number;
    items: string[];
    activeIndex: number | null;
    failedIndex: number | null;
    locked?: boolean;
    onDropMethod: (name: string) => void;
}

export function MethodQueue({
    slots, items, activeIndex, failedIndex, locked, onDropMethod,
}: MethodQueueProps) {
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
        if (payload && payload.groupId === "method") onDropMethod(payload.value);
    }

    return (
        <div
            className={`method-queue ${isOver ? "over" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsOver(false)}
            onDrop={handleDrop}
        >
            {Array.from({ length: slots }, (_, i) => {
                const name = items[i];
                const cls = [
                    "method-slot",
                    name ? "filled" : "",
                    activeIndex === i ? "active" : "",
                    failedIndex === i ? "failed" : "",
                ].join(" ");

                return (
                    <div key={i} className={cls}>
                        {name ?? "+"}
                    </div>
                );
            })}
        </div>
    );
}