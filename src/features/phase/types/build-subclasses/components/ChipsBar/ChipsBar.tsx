import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./ChipsBar.css";

interface ChipsBarProps {
    labels: string[];
    locked?: boolean;
}

export function ChipsBar({ labels, locked }: ChipsBarProps) {
    return (
        <div className="chips-bar">
            {labels.map((label) => (
                <ResourceChip
                    key={label}
                    className="subclass-chip"
                    locked={locked}
                    payload={{ groupId: "attribute", value: label }}
                />
            ))}
        </div>
    );
}