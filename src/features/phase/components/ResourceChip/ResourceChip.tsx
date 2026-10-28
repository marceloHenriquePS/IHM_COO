// ResourceGroups/ResourceChip.tsx
import { DRAG_MIME, type DragPayload } from "@/features/phase/dnd";

interface ResourceChipProps {
    payload: DragPayload;
    className?: string;
    locked?: boolean;
}

export function ResourceChip({ payload, className = "", locked }: ResourceChipProps) {
    return (
        <div
            className={`resource-chip ${className}`}
            draggable={!locked}
            onDragStart={(e) => {
                e.dataTransfer.setData(DRAG_MIME, JSON.stringify(payload));
                e.dataTransfer.effectAllowed = "copy";
            }}
        >
            {payload.value}
        </div>
    );
}