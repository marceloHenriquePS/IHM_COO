import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./BaseClassResources.css";

interface BaseClassResourcesProps {
    attributes: string[];
    types: string[];
    locked?: boolean;
}

export function BaseClassResources({ attributes, types, locked }: BaseClassResourcesProps) {
    return (
        <div className="base-resources">
            {attributes.map((name) => (
                <ResourceChip
                    key={`attribute-${name}`}
                    className="base-chip"
                    locked={locked}
                    payload={{ groupId: "attribute", value: name }}
                />
            ))}

            {types.map((name) => (
                <ResourceChip
                    key={`type-${name}`}
                    className="base-chip"
                    locked={locked}
                    payload={{ groupId: "type", value: name }}
                />
            ))}
        </div>
    );
}