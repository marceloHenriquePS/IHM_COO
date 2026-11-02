import { DropSlot } from "@/features/phase/components/DropSlot/DropSlot";
import "./AnimalRow.css";

interface AnimalRowProps {
    animals: { id: string; label: string; image: string }[];
    values: Record<string, string | null>;
    wrongIds?: string[];
    locked?: boolean;
    onDropSound: (animalId: string, number: string) => void;
    onClear: (animalId: string) => void;
}

export function AnimalRow({
    animals, values, wrongIds = [], locked, onDropSound, onClear,
}: AnimalRowProps) {
    return (
        <ul className="animal-row">
            {animals.map((a) => (
                <li key={a.id} className="animal-card">
                    <img src={a.image} alt={a.label} className="animal-card-image" />

                    <DropSlot
                        accept="sound"
                        value={values[a.id] ?? null}
                        placeholder="?"
                        wrong={wrongIds.includes(a.id)}
                        locked={locked}
                        onDropValue={(n) => onDropSound(a.id, n)}
                        onClear={() => onClear(a.id)}
                    />
                </li>
            ))}
        </ul>
    );
}