// AnimalLane/AnimalLane.tsx
import { useState } from "react";
import { DRAG_MIME, readPayload } from "@/features/phase/dnd";
import { Carousel } from "@/features/phase/components/Carousel/Carousel";
import type { ClassTone } from "@/shared/data/modules";
import "./AnimalLane.css";

export interface LaneItem {
    id: string;
    label: string;
    image: string;
    wrong?: boolean;
}

interface AnimalLaneProps {
    title: string;
    tone: ClassTone;
    items: LaneItem[];
    emptyText: string;
    locked?: boolean;
    onDropAnimal: (animalId: string) => void;
    onItemClick?: (animalId: string) => void;
}

export function AnimalLane({
    title, tone, items, emptyText, locked, onDropAnimal, onItemClick,
}: AnimalLaneProps) {
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
        if (payload && payload.groupId === "creature") onDropAnimal(payload.value);
    }

    function handleDragStart(e: React.DragEvent, id: string) {
        e.dataTransfer.setData(DRAG_MIME, JSON.stringify({ groupId: "creature", value: id }));
        e.dataTransfer.effectAllowed = "copy";
    }

    return (
        <section className={`animal-lane ${tone} ${isOver ? "over" : ""}`}>
            <h3 className="animal-lane-title">{title}</h3>

            <div
                className="animal-lane-body"
                onDragOver={handleDragOver}
                onDragLeave={() => setIsOver(false)}
                onDrop={handleDrop}
            >
                {items.length === 0 ? (
                    <p className="animal-lane-empty">{emptyText}</p>
                ) : (
                    <Carousel>
                        {items.map((item) => {
                            const cls = `creature ${item.wrong ? "wrong" : ""}`;
                            const img = <img src={item.image} alt="" draggable={false} />;

                            return onItemClick ? (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={cls}
                                    aria-label={`${item.label}: devolver à lista`}
                                    title={locked ? undefined : "Clique para devolver à lista"}
                                    draggable={!locked}
                                    disabled={locked}
                                    onDragStart={(e) => handleDragStart(e, item.id)}
                                    onClick={() => onItemClick(item.id)}
                                >
                                    {img}
                                </button>
                            ) : (
                                <div
                                    key={item.id}
                                    role="img"
                                    aria-label={item.label}
                                    className={cls}
                                    draggable={!locked}
                                    onDragStart={(e) => handleDragStart(e, item.id)}
                                >
                                    {img}
                                </div>
                            );
                        })}
                    </Carousel>
                )}
            </div>
        </section>
    );
}