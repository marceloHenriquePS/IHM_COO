import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./OptionBar.css";

interface OptionBarProps {
    options: string[];
    locked?: boolean;
}

export function OptionBar({ options, locked }: OptionBarProps) {
    return (
        <div className="option-bar">
            {options.map((o) => (
                <ResourceChip
                    key={o}
                    className="option-chip"
                    locked={locked}
                    payload={{ groupId: "sound", value: o }}
                />
            ))}
        </div>
    );
}