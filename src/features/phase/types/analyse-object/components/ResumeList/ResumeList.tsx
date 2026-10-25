import type { Candidate } from "@/shared/data/modules";
import { ResumeCard, type ResumeFieldDef } from "./ResumeCard";
import "./ResumeList.css";

interface ResumeListProps {
    candidates: Candidate[];
    photos: Record<string, string>;
    fields: ResumeFieldDef[];
    selectedIds: string[];
    maxSelected: number;
    onToggle: (id: string) => void;
}

export function ResumeList({ candidates, photos, fields, selectedIds, maxSelected, onToggle }: ResumeListProps) {
    const limitReached = selectedIds.length >= maxSelected;

    return (
        <div className="resume-list">
            {candidates.map((c) => {
                const selected = selectedIds.includes(c.id);
                return (
                    <ResumeCard
                        key={c.id}
                        candidate={c}
                        photo={photos[c.photo]}
                        fields={fields}
                        selected={selected}
                        disabled={limitReached && !selected}
                        onToggle={() => onToggle(c.id)}
                    />
                );
            })}
        </div>
    );
}