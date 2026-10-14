import { Modal } from "@/shared";

type AboutModalProps = {
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export function AboutModal({onClose, onNext, onPrevious} : AboutModalProps) {

    const content: string = "Lorem ipsum dolor sit amet. Qui quam assumenda in unde sint qui corporis optio 33 possimus quia. Ut internos officiis est accusantium odit sit rerum perspiciatis cum temporibus harum eum optio reprehenderit et voluptatem autem. Quo obcaecati sapiente hic sint quisquam qui eligendi autem.";

    return(
        <Modal 
            icon="!" 
            onClose={onClose}
            onNext={onNext}
            onPrevious={onPrevious}
            >
                {content}
        </Modal>
    )
}