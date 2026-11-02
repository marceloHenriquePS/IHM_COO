import { ResourceChip } from "@/features/phase/components/ResourceChip/ResourceChip";
import "./WordBar.css";

interface WordBarProps {
    words: string[];
    locked?: boolean;
}

export function WordBar({ words, locked }: WordBarProps) {
    return (
        <div className="word-bar">
            {words.map((w) => (
                <ResourceChip
                    key={w}
                    className="word-chip"
                    locked={locked}
                    payload={{ groupId: "word", value: w }}
                />
            ))}
        </div>
    );
}