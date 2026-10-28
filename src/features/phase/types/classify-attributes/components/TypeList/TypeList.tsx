import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./TypeList.css";

interface TypeListProps {
    types: string[];
    locked?: boolean;
}

export function TypeList({ types, locked }: TypeListProps) {
    return (
        <div className="type-list">
            {types.map((type) => (
                <ResourceChip
                    key={type}
                    className="type-chip"
                    locked={locked}
                    payload={{ groupId: "type", value: type }}
                />
            ))}
        </div>
    );
}