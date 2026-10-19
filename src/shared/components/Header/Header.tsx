
import "./Header.css";
import logo from "@/shared/assets/logo-coo.png";
import homeIcon from "@/shared/assets/house-icon.png";

interface HeaderProps {
  onAboutClick?: () => void;
  onHelpClick?: () => void;
  onHomeClick?: () => void;
}

export function Header({onAboutClick,onHelpClick,onHomeClick}: HeaderProps) {
  return (
    <header className="app-header">
        <div className="header-brand">
            <div className="header-logo">
                <img src={logo} alt="Logo COO" className="header-logo-image" />
            </div>

            <h1>COO - Cidade Orientada a Objetos</h1>
        </div>

        <div className="header-actions">
            <button className="header-action" type="button" onClick={onAboutClick}>
                <span className="header-action-icon">!</span>
                <span>Sobre</span>
            </button>

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
