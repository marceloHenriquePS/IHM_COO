
import "./Header.css";
import logo from "@/shared/assets/logo-coo.png";
import homeIcon from "@/shared/assets/house-icon.png";
import soundOffIcon from "@/shared/assets/sound-off-icon.png";
import soundOnIcon from "@/shared/assets/sound-on-icon.png";

interface HeaderProps {
    onHelpClick?: () => void;
    onHomeClick?: () => void;
    muted?: boolean;
    onToggleMute?: () => void;
    showTestMode?: boolean;
    testMode?: boolean;
    onToggleTestMode?: () => void;
}

export function Header({ onHelpClick, onHomeClick, muted, onToggleMute, showTestMode, testMode, onToggleTestMode }: HeaderProps) {
    return (
        <header className="app-header">
            <div className="header-brand">
                <div className="header-logo">
                    <img src={logo} alt="Logo COO" className="header-logo-image" />
                </div>

                <h1>COO - Cidade Orientada a Objetos</h1>
            </div>

            <div className="header-actions">
                {showTestMode && onToggleTestMode && (
                    <button
                        className={`header-action ${testMode ? "test-mode-active" : "test-mode-inactive"}`}
                        type="button"
                        onClick={onToggleTestMode}
                        aria-pressed={testMode}
                    >
                        <span className="header-action-icon">
                            {testMode ? "✓" : "X"}
                        </span>
                        <span>Modo Teste</span>
                    </button>
                )}

                {onToggleMute && (
                    <button
                        className="header-action"
                        type="button"
                        onClick={onToggleMute}
                        aria-pressed={muted}
                        aria-label={muted ? "Ativar música" : "Silenciar música"}
                    >
                        <span className="header-action-icon">
                            <img
                                src={muted ? soundOffIcon : soundOnIcon}
                                alt=""
                                className="header-action-image"
                            />
                        </span>
                        <span>{muted ? "Som off" : "Som"}</span>
                    </button>
                )}

                <button className="header-action" type="button" onClick={onHelpClick}>
                    <span className="header-action-icon">?</span>
                    <span>Ajuda</span>
                </button>

                {onHomeClick && (
                    <button className="header-action" type="button" onClick={onHomeClick} aria-label="Início">
                        <span className="header-action-icon">
                            <img src={homeIcon} className="header-action-image" />
                        </span>
                        <span>Início</span>
                    </button>
                )}
            </div>
        </header>
    );
}
