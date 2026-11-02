import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { IMAGES } from "../match-sounds/images";
import { AnimalLane } from "./components/AnimalLane/AnimalLane";
import "./SortAnimals.css";

const POOL = "pool";

export function SortAnimals({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {
    const [places, setPlaces] = useState<Record<string, string>>(() =>
        step.type === "sort-animals"
            ? Object.fromEntries(step.content.animals.map((a) => [a.id, a.start ?? POOL]))
            : {}
    );
    const [wrongIds, setWrongIds] = useState<string[]>([]);

    if (step.type !== "sort-animals") return null;
    const { content } = step;

    const itemsOf = (laneId: string) =>
        content.animals
            .filter((a) => places[a.id] === laneId)
            .map((a) => ({
                id: a.id,
                label: a.label,
                image: IMAGES[a.image],
                wrong: wrongIds.includes(a.id),
            }));

    function moveTo(laneId: string, animalId: string) {
        setPlaces((prev) => ({ ...prev, [animalId]: laneId }));
        setWrongIds([]);
        clearFeedback();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        if (content.animals.some((a) => places[a.id] === POOL)) {
            setWrongIds([]);
            showFeedback({ type: "warning", text: content.messages.incomplete });
            return;
        }

        const wrong = content.animals
            .filter((a) => places[a.id] !== a.answer)
            .map((a) => a.id);

        if (wrong.length > 0) {
            setWrongIds(wrong);
            showFeedback({ type: "error", text: content.messages.wrong });
            return;
        }

        setWrongIds([]);
        showFeedback({ type: "success", text: content.messages.success });
        onComplete();
    }

    return (
        <div className="sort-animals">
            <ResourceCenter icon={ICONS.box} className="animals-sort-center">
                <div className="sort-animals-lanes">
                    <AnimalLane
                        title={content.poolLabel}
                        tone="yellow"
                        items={itemsOf(POOL)}
                        emptyText="Todos os animais foram separados."
                        locked={locked}
                        onDropAnimal={(id) => moveTo(POOL, id)}
                    />

                    {content.lanes.map((lane) => (
                        <AnimalLane
                            key={lane.id}
                            title={lane.label}
                            tone={lane.tone}
                            items={itemsOf(lane.id)}
                            emptyText="Arraste os animais para cá"
                            locked={locked}
                            onDropAnimal={(id) => moveTo(lane.id, id)}
                            onItemClick={(id) => moveTo(POOL, id)}
                        />
                    ))}
                </div>
            </ResourceCenter>

            <button type="button" className="sort-animals-submit" onClick={handleSubmit}>
                {locked ? continueLabel : content.submitLabel}
            </button>
        </div>
    );
}