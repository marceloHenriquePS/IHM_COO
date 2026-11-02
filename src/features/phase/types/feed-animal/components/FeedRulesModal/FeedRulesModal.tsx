import { Modal } from "@/shared/components/Modal/Modal";

interface FeedRulesModalProps {
    open: boolean;
    title: string;
    intro: string;
    signature: string;
    items: string[];
    onClose: () => void;
}

export function FeedRulesModal({ open, title, intro, signature, items, onClose }: FeedRulesModalProps) {
    return (
        <Modal open={open} title={title} onClose={onClose}>
            <p className="rules-modal-intro">{intro}</p>
            <p className="feed-rules-signature">{signature}</p>

            <ul className="feed-rules-list">
                {items.map((text) => (
                    <li key={text}>
                        <b>Animal:</b> {text}
                    </li>
                ))}
            </ul>
        </Modal>
    );
}