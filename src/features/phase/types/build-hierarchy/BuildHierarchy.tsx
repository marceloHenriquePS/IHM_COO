import { useState } from "react";
import type { StepScreenProps } from "../../stepType";
import { ICONS } from "../../icons";
import { ResourceCenter } from "../../components/ResourceCenter/ResourceCenter";
import { flatten } from "./hierarchy";
import { HierarchyTree } from "./components/HierarchyTree/HierarchyTree";
import { ChipPool } from "./components/ChipPool/ChipPool";
import "./BuildHierarchy.css";

export function BuildHierarchy({ step, locked, continueLabel, onComplete, onContinue, showFeedback, clearFeedback }: StepScreenProps) {
    const [placed, setPlaced] = useState<Record<string, string | null>>(() =>
        step.type === "build-hierarchy"
            ? Object.fromEntries(flatten(step.content.tree).map((n) => [n.id, null]))
            : {}
    );
    const [wrongIds, setWrongIds] = useState<string[]>([]);

    if (step.type !== "build-hierarchy") return null;
    const { content } = step;
    const { messages } = content;

    const nodes = flatten(content.tree);
    const placedLabels = Object.values(placed).filter((l): l is string => Boolean(l));
    const available = content.chips.filter((l) => !placedLabels.includes(l));

    function resetResult() {
        setWrongIds([]);
        clearFeedback();
    }

    function handleDrop(slotId: string, label: string) {
        const node = nodes.find((n) => n.id === slotId);
        if (!node || placedLabels.includes(label)) return;

        if (node.parentId && !placed[node.parentId]) {
            showFeedback({ type: "warning", text: messages.needParent });
            return;
        }

        setPlaced((prev) => ({ ...prev, [slotId]: label }));
        resetResult();
    }

    function handleClear(slotId: string) {
        if (locked) return;

        const toClear = new Set<string>([slotId]);
        nodes.forEach((n) => {
            if (n.parentId && toClear.has(n.parentId)) toClear.add(n.id);
        });

        setPlaced((prev) => {
            const next = { ...prev };
            toClear.forEach((id) => { next[id] = null; });
            return next;
        });
        resetResult();
    }

    function handleSubmit() {
        if (locked) {
            onContinue();
            return;
        }

        if (nodes.some((n) => !placed[n.id])) {
            setWrongIds([]);
            showFeedback({ type: "warning", text: messages.incomplete });
            return;
        }

        const expectedParent = new Map(nodes.map((n) => [n.label, n.parentLabel]));

        const wrong = nodes
            .filter((n) => {
                const label = placed[n.id] as string;
                const actualParent = n.parentId ? placed[n.parentId] ?? null : null;
                return !expectedParent.has(label) || expectedParent.get(label) !== actualParent;
            })
            .map((n) => n.id);

        if (wrong.length > 0) {
            setWrongIds(wrong);
            showFeedback({ type: "error", text: messages.wrong });
            return;
        }

        setWrongIds([]);
        showFeedback({ type: "success", text: messages.success });
        onComplete();
    }

    return (
        <div className="build-hierarchy">
            <HierarchyTree
                tree={content.tree}
                placed={placed}
                wrongIds={wrongIds}
                locked={locked}
                onDropClass={handleDrop}
                onClear={handleClear}
            />

            <button type="button" className="hierarchy-submit" onClick={handleSubmit}>
                {locked ? continueLabel : content.submitLabel}
            </button>

            <ResourceCenter icon={ICONS.box} className="hierarchy-center">
                <ChipPool labels={available} emptyText={messages.poolEmpty} locked={locked} />
            </ResourceCenter>
        </div>
    );
}