import { DropSlot } from "@/features/phase/components/DropSlot/DropSlot";
import type { HierarchyNode } from "@/shared/data/modules";
import "./HierarchyTree.css";

interface HierarchyTreeProps {
    tree: HierarchyNode;
    placed: Record<string, string | null>;
    wrongIds?: string[];
    locked?: boolean;
    onDropClass: (slotId: string, label: string) => void;
    onClear: (slotId: string) => void;
}

type BranchProps = Omit<HierarchyTreeProps, "tree"> & {
    node: HierarchyNode;
    parentFilled: boolean;
};

function Branch({ node, parentFilled, placed, wrongIds = [], locked, onDropClass, onClear }: BranchProps) {
    const filled = Boolean(placed[node.id]);

    return (
        <li>
            <div className={`tree-node ${parentFilled ? "" : "blocked"}`}>
                <DropSlot
                    accept="class"
                    value={placed[node.id] ?? null}
                    wrong={wrongIds.includes(node.id)}
                    locked={locked}
                    onDropValue={(label) => onDropClass(node.id, label)}
                    onClear={() => onClear(node.id)}
                />
            </div>

            {node.children && node.children.length > 0 && (
                <ul>
                    {node.children.map((child) => (
                        <Branch
                            key={child.id}
                            node={child}
                            parentFilled={filled}
                            placed={placed}
                            wrongIds={wrongIds}
                            locked={locked}
                            onDropClass={onDropClass}
                            onClear={onClear}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

export function HierarchyTree({ tree, ...rest }: HierarchyTreeProps) {
    return (
        <div className="hierarchy-scroll">
            <ul className="hierarchy-tree">
                <Branch node={tree} parentFilled {...rest} />
            </ul>
        </div>
    );
}