import { Modal } from "@/shared";
import { DEFAULT_HELP, HELP, type HelpTopic } from "./helpContent";

type HelpModalProps = {
    open: boolean;
    topic?: HelpTopic;
    onClose: () => void;
};

export function HelpModal({ open, topic, onClose }: HelpModalProps) {
    if (!open) return null;

    const pages = (topic && HELP[topic]) || DEFAULT_HELP;


    return (
        <Modal
            title="Ajuda"
            open={open}
            onClose={onClose}
            pages={pages}
        />
    );
}