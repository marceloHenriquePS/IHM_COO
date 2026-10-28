export const DRAG_MIME = "application/x-coo-resource";

export interface DragPayload {
    groupId: string;
    value: string;
}

export function readPayload(e: React.DragEvent): DragPayload | null {
    try {
        return JSON.parse(e.dataTransfer.getData(DRAG_MIME));
    } catch {
        return null;
    }
}