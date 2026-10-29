import "./ActionList.css";

export interface ActionItem {
    id: string;
    title: string;
    call: string;
    icon: string;
}

interface ActionListProps {
    actions: ActionItem[];
    disabled?: boolean;
    onAction: (id: string) => void;
}

export function ActionList({ actions, disabled, onAction }: ActionListProps) {
    return (
        <div className="action-list">
            {actions.map((a) => (
                <button
                    key={a.id}
                    type="button"
                    className="action-card"
                    disabled={disabled}
                    onClick={() => onAction(a.id)}
                >
                    <img src={a.icon} alt="" className="action-card-icon" />
                    <span className="action-card-text">
                        <b>{a.title}</b>
                        <span>{a.call}</span>
                    </span>
                </button>
            ))}
        </div>
    );
}