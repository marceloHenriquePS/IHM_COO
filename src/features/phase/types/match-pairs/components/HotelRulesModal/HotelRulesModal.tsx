import { Modal } from "@/shared/components/Modal/Modal";

interface HotelRulesModalProps {
    open: boolean;
    title: string;
    intro: string;
    inherits: string[];
    jobs: { id: string; text: string }[];
    onClose: () => void;
}

export function HotelRulesModal({ open, title, intro, inherits, jobs, onClose }: HotelRulesModalProps) {
    return (
        <Modal open={open} title={title} onClose={onClose}>
            <p className="rules-modal-intro">{intro}</p>

            <ul className="hotel-rules-inherits">
                {inherits.map((t) => <li key={t}>{t}</li>)}
            </ul>

            <ol className="hotel-rules-jobs">
                {jobs.map((j, i) => (
                    <li key={j.id}>
                        <b>Trabalho {i + 1}:</b> {j.text}
                    </li>
                ))}
            </ol>
        </Modal>
    );
}