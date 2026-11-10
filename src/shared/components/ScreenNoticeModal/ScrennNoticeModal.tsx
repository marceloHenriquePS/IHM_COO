
import { Modal } from "@/shared/components/Modal/Modal";
import "./ScreenNoticeModal.css";

interface ScreenNoticeModalProps {
    open: boolean;
    onClose: () => void;
}

export function ScreenNoticeModal({ open, onClose }: ScreenNoticeModalProps) {
    return (
        <Modal
            open={open}
            title="Atenção: melhor experiência de jogo"
            onClose={onClose}
        >
            <div className="screen-notice">
                <p>
                    Para aproveitar melhor a Cidade COO, recomendamos jogar
                    em um computador ou notebook.
                </p>

                <div className="screen-notice-resolutions">
                    <h3>Resoluções recomendadas:</h3>

                    <ul>
                        <li>1366 × 768 pixels</li>
                        <li>1440 × 900 pixels</li>
                        <li>1920 × 1080 pixels</li>
                    </ul>
                </div>

                <div className="screen-notice-warning">
                    <span className="screen-notice-icon">📱</span>
                    <p>
                        <strong>Atenção:</strong> o jogo não é otimizado para
                        celulares e pode apresentar problemas de visualização
                        e funcionamento em telas menores.
                    </p>
                </div>

                <button
                    type="button"
                    className="screen-notice-button"
                    onClick={onClose}
                >
                    Entendi, vamos jogar!
                </button>
            </div>
        </Modal>
    );
}
