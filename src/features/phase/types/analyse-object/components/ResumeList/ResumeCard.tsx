import type { Candidate } from "@/shared/data/modules";

export interface ResumeFieldDef {
    id: keyof Candidate;
    label: string;
    icon: string;
}

interface ResumeCardProps {
    candidate: Candidate;
    photo: string;
    fields: ResumeFieldDef[];
    selected: boolean;
    disabled: boolean;
    onToggle: () => void;
}

export function ResumeCard({ candidate, photo, fields, selected, disabled, onToggle }: ResumeCardProps) {
    return (
        <article className={`resume-card ${selected ? "selected" : ""}`}>
            <h3 className="resume-card-title">CURRÍCULO</h3>

            <div className="resume-card-body">
                <img src={photo} alt={`Foto de ${candidate.name}`} className="resume-card-photo" />

                <dl className="resume-card-fields">
                    {fields.map((f) => (
                        <div key={f.id} className="resume-card-row">
                            <dt>
                                <img src={f.icon} alt="" />
                                <span>{f.label}</span>
                            </dt>
                            <dd>{candidate[f.id]}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <button
                type="button"
                className="resume-card-button"
                aria-pressed={selected}
                disabled={disabled}
                onClick={onToggle}
            >
                {selected ? "SELECIONADO" : "SELECIONAR"}
            </button>
        </article>
    );
}