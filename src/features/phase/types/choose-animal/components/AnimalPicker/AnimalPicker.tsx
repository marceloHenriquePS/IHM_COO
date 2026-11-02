import { DRAG_MIME } from "@/features/phase/dnd";
import "./AnimalPicker.css";

interface AnimalPickerProps {
    animals: { id: string; label: string; image: string }[];
    locked?: boolean;
}

export function AnimalPicker({ animals, locked }: AnimalPickerProps) {
    return (
        <ul className="animal-picker">
            {animals.map((a) => (
                <li key={a.id}>
                    <img
                        src={a.image}
                        alt={a.label}
                        className="animal-picker-item"
                        draggable={!locked}
                        onDragStart={(e) => {
                            e.dataTransfer.setData(
                                DRAG_MIME,
                                JSON.stringify({ groupId: "animal", value: a.id })
                            );
                            e.dataTransfer.effectAllowed = "copy";
                        }}
                    />
                </li>
            ))}
        </ul>
    );
}