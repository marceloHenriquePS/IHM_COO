import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import "./Modal.css";

interface ModalPage {
    title?: string;
    content: ReactNode;
}

interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    pages?: ModalPage[];
    children?: ReactNode;
    icon?: ReactNode;
}

export function Modal(props: ModalProps) {
    const { open, title, onClose, icon } = props;

    const pages = props.pages ?? [
        { content: props.children }
    ];

    const ref = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = pages.length;
    const page = pages[currentPage];

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);
    
    const nextPage = () => {
        setCurrentPage((current) =>
            Math.min(current + 1, totalPages - 1)
        );
    };

    const previousPage = () => {
        setCurrentPage((current) =>
            Math.max(current - 1, 0)
        );
    };

    return (
        <dialog
            ref={ref}
            className="modal"
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.onClose();
                }
            }}
        >
            <div className="modal-header">
                <div className="modal-heading">
                    {icon && (
                        <span className="modal-icon">
                            {icon}
                        </span>
                    )}

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
                {page && (
                    <>
                        {page.title && (
                            <h3 className="modal-page-title">{page.title}</h3>
                        )}
                        {page.content}
                    </>
                )}
            </div>

            {totalPages > 1 && (
                <div className="modal-footer">
                    <button
                        type="button"
                        className="modal-pagination-button"
                        onClick={previousPage}
                        disabled={currentPage === 0}
                    >
                        Anterior
                    </button>

                    <span className="modal-page-indicator">
                        {currentPage + 1} de {totalPages}
                    </span>

                    <button
                        type="button"
                        className="modal-pagination-button"
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                    >
                        Próximo
                    </button>
                </div>
            )}
        </dialog>
    );
}