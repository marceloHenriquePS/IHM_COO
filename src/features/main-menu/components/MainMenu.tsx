import { Button } from "@/shared";
import { useModal } from "@/shared/hooks/useModal";
import { HelpModal } from "@/features/help-modal"
import { AboutModal } from "@/features/about-modal"
import logo from "../assets/logo-coo.png";
import './MainMenu.css';

export function MainMenu() {
    const help = useModal();
    const about = useModal();

    const handleStartBtn = () => {
        console.log("Apertou botão iniciar.")
    };

    const handleOptionsBtn = () => {
        help.open();
    };

    const handleAboutBtn = () => {
        about.open();
    };

    return (
        <div className="main-menu">

            <img src={logo} alt="Logo COO" className="main-menu__logo" />

            <div className="main-menu__content">
                <div className="main-menu__class-line">
                    <span className="main-menu__keyword">CLASS</span>
                    <h1 className="main-menu__title">COO</h1>
                    <span className="main-menu__brace">{'{'}</span>
                </div>

                <div className="main-menu__name-line">
                    <span className="main-menu__label">NAME:</span>
                    <span className="main-menu__subtitle">Cidade Orientada a Objetos</span>
                </div>

                <div className="main-menu__buttons">
                    <div className="main-menu__button-row">
                        <span className="main-menu__button-label">BUTTON: </span>
                        <Button label="INICIAR" onClick={handleStartBtn}/>
                    </div>

                    <div className="main-menu__button-row">
                        <span className="main-menu__button-label">BUTTON: </span>
                        <Button label="OPÇÕES" onClick={handleOptionsBtn}/>
                    </div>

                    <div className="main-menu__button-row">
                        <span className="main-menu__button-label">BUTTON: </span>
                        <Button label="SOBRE" onClick={handleAboutBtn}/>
                    </div>
                </div>
                
                <span className="main-menu__closing-brace">{'}'}</span>


            <p className="main-menu__console">
                <span className="main-menu__console-method">System.out.println</span>
                ("Aprenda Orientação a Objetos gerenciando sua cidade!");
            </p>

            {help.isOpen && (
                <HelpModal
                    onClose={help.close}
                    onNext={() => {}}
                    onPrevious={() => {}}
                />
            )}

            {about.isOpen && (
                <AboutModal
                    onClose={about.close}
                    onNext={() => {}}
                    onPrevious={() => {}}
                />
            )}

            </div>

        </div>
    );
}