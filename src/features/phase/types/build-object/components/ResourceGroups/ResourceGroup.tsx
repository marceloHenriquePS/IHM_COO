import { ResourceChip } from "./ResourceChip";

interface ResourceGroupProps {
    id: string;
    label: string;
    icon: string;
    options: string[];
}

export function ResourceGroup({ id, label, icon, options }: ResourceGroupProps) {
    return (
        <div className="resource-group">
            <h3 className="resource-group-title">
                <img src={icon} alt="" className="resource-group-icon" />
                <span>{label}</span>
            </h3>

            <div className="resource-group-list">
                {options.map((value) => (
                    <ResourceChip key={value} payload={{groupId: id, value}} />
                ))}
            </div>
        </div>
    );
}