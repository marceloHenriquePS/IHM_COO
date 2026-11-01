import type { HierarchyNode } from "@/shared/data/modules";

export interface FlatNode {
    id: string;
    label: string;
    parentId: string | null;
    parentLabel: string | null;
}

export function flatten(node: HierarchyNode, parent: HierarchyNode | null = null): FlatNode[] {
    const self: FlatNode = {
        id: node.id,
        label: node.label,
        parentId: parent?.id ?? null,
        parentLabel: parent?.label ?? null,
    };
    return [self, ...(node.children ?? []).flatMap((c) => flatten(c, node))];
}