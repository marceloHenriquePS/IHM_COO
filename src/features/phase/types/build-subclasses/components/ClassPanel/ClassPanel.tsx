import { useState } from "react";
import { DRAG_MIME, readPayload } from "@/features/phase/dnd";
import "./ClassPanel.css";

export type PanelTone = "yellow" | "blue" | "red" | "green";

interface PanelItem {
    label: string;
    text: string;
    wrong?: boolean;
}

interface ClassPanelProps {
    name: string;
    tone: PanelTone;
    tag?: string;
    items: PanelItem[];
    emptyText?: string;
    locked?: boolean;
    onDropAttribute?: (label: string) => void;
    onRemove?: (label: string) => void;
}

export function ClassPanel({
    name, tone, tag, items, emptyText, locked, onDropAttribute, onRemove,
}: ClassPanelProps) {
    const [isOver, setIsOver] = useState(false);
    const droppable = Boolean(onDropAttribute) && !locked;

    function handleDragOver(e: React.DragEvent) {
        if (!droppable) return;
        if (e.dataTransfer.types.includes(DRAG_MIME)) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
            setIsOver(true);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsOver(false);
        if (!droppable) return;

        const payload = readPayload(e);
        if (payload && payload.groupId === "attribute") onDropAttribute?.(payload.value);
    }

    return (
        <section className={`class-panel ${tone} ${isOver ? "over" : ""}`}>
            <header className="class-panel-header">
                <h2>{name}</h2>
                {tag && <span className="class-panel-tag">{tag}</span>}
            </header>

            <div
                className="class-panel-body"
                onDragOver={handleDragOver}
                onDragLeave={() => setIsOver(false)}
                onDrop={handleDrop}
            >
                {items.length === 0 && emptyText ? (
                    <p className="class-panel-empty">{emptyText}</p>
                ) : (
                    <ul className="class-panel-list">
                        {items.map((item) => (
                            <li key={item.label}>
                                {onRemove ? (
                                    <button
                                        type="button"
                                        className={`class-panel-item ${item.wrong ? "wrong" : ""}`}
                                        disabled={locked}
                                        title={locked ? undefined : "Clique para remover"}
                                        onClick={() => onRemove(item.label)}
                                    >
                                        {item.text}
                                    </button>
                                ) : (
                                    <span className="class-panel-item static">{item.text}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}