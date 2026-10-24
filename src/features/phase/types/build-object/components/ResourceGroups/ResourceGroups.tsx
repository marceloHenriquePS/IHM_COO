import { ResourceGroup } from "./ResourceGroup";
import "./ResourceGroups.css";

export interface ResourceGroupData {
    id: string;
    label: string;
    icon: string;
    options: string[];
}

export function ResourceGroups({ groups }: { groups: ResourceGroupData[] }) {
    return (
        <div className="resource-groups">
            {groups.map((group) => (
                <ResourceGroup
                    key={group.id}
                    id={group.id}
                    label={group.label}
                    icon={group.icon}
                    options={group.options}
                />
            ))}
        </div>
    );
}