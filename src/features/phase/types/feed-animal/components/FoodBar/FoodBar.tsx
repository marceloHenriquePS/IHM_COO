import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./FoodBar.css";

interface FoodBarProps {
    foods: string[];
    locked?: boolean;
}

export function FoodBar({ foods, locked }: FoodBarProps) {
    return (
        <div className="food-bar">
            {foods.map((f) => (
                <ResourceChip
                    key={f}
                    className="food-chip"
                    locked={locked}
                    payload={{ groupId: "food", value: f }}
                />
            ))}
        </div>
    );
}