import { Modal } from "@/shared/components/Modal/Modal";
import { renderRichText } from "@/shared/utils/richText";

interface RulesModalProps {
    open: boolean;
    title: string;
    intro: string;
    items: string[];
    onClose: () => void;
}

export function RulesModal({ open, title, intro, items, onClose }: RulesModalProps) {
    return (
        <Modal open={open} title={title} onClose={onClose}>
            <p className="rules-modal-intro">{intro}</p>
            <ol className="rules-modal-list">
                {items.map((text, i) => (
                    <li key={i}>{renderRichText(text)}</li>
                ))}
            </ol>
        </Modal>
    );
}