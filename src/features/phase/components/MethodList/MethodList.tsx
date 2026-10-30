import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./MethodList.css";

interface MethodListProps {
    methods: string[];
    locked?: boolean;
}

export function MethodList({ methods, locked }: MethodListProps) {
    return (
        <div className="method-list">
            {methods.map((name) => (
                <ResourceChip
                    key={name}
                    className="method-chip"
                    locked={locked}
                    payload={{ groupId: "method", value: name }}
                />
            ))}
        </div>
    );
}