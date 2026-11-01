import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./ChipPool.css";

interface ChipPoolProps {
    labels: string[];
    emptyText: string;
    locked?: boolean;
}

export function ChipPool({ labels, emptyText, locked }: ChipPoolProps) {
    return (
        <div className="chip-pool">
            {labels.length === 0 ? (
                <p className="chip-pool-empty">{emptyText}</p>
            ) : (
                labels.map((label) => (
                    <ResourceChip
                        key={label}
                        className="pool-chip"
                        locked={locked}
                        payload={{ groupId: "class", value: label }}
                    />
                ))
            )}
        </div>
    );
}