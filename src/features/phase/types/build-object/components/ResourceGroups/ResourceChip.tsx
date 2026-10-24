// ResourceGroups/ResourceChip.tsx
import { DRAG_MIME, type DragPayload } from "../../dnd";

interface ResourceChipProps {
    payload: DragPayload;
}

export function ResourceChip({ payload }: ResourceChipProps) {
    return (
        <div
            className="resource-chip"
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData(DRAG_MIME, JSON.stringify(payload));
                e.dataTransfer.effectAllowed = "copy";
            }}
        >
            {payload.value}
        </div>
    );
}