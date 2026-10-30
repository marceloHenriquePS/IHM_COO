import { useEffect, useId, useRef, type ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({
    open,
    title,
    onClose,
    children,
}: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = ref.current;

        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    return (
        <dialog
            ref={ref}
            className="modal"
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="modal-header">
                <div className="modal-heading">
                    <h2 id={titleId} className="modal-title">
                        {title}
                    </h2>
                </div>

                <button
                    type="button"
                    className="modal-close-icon"
                    onClick={onClose}
                    aria-label="Fechar modal"
                >
                    ×
                </button>
            </div>

            <div className="modal-box">
                {children}
            </div>
        </dialog>
    );
}