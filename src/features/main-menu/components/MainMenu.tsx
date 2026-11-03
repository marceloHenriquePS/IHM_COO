import { Button, Modal } from "@/shared";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-coo.png";
import './MainMenu.css';
import { useState } from "react";

export function MainMenu() {
    const navigate = useNavigate();

    const [aboutOpen, setAboutOpen] = useState(false);
    // const [rateOpen, setRateOpen] = useState(false);

    const handleStartBtn = () => { navigate("/home"); };
    const handleAboutBtn = () => setAboutOpen(true);
    // const handleRateBtn = () => setRateOpen(true);    

    const aboutContent = [
        <>
            <div className="about-content">
                <h3>Conheça o Cidade COO</h3>

                <p>
                    O <b>Cidade COO</b> é um ambiente educacional interativo
                    desenvolvido para auxiliar no aprendizado da <b>Programação Orientada a Objetos (POO).</b>
                </p>

                <br />

                <p>
                    Por meio de desafios e minijogos, o jogador explora
                    conceitos fundamentais da orientação a objetos.
                </p>

                <h4>Objetivo</h4>

                <p>
                    Proporcionar uma experiência de aprendizado dinâmica
                    e interativa, tornando o estudo da programação mais
                    acessível e divertido.
                </p>

                <br />

                <p><b>Autor: </b> Marcelo Henrique Pereira de Sousa</p>
                <p><b>Professor: </b> Richarlyson D’Emery</p>
                <p><b>Disciplina: </b> Interface Homem-Máquina</p>
            </div>
        </>
    ]

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
                        <Button label="INICIAR" onClick={handleStartBtn} />
                    </div>

                    <div className="main-menu__button-row">
                        <span className="main-menu__button-label">BUTTON: </span>
                        <Button label="SOBRE" onClick={handleAboutBtn} />
                    </div>

                    <div className="main-menu__button-row">
                        <span className="main-menu__button-label">BUTTON: </span>
                        <Button label="AVALIE" onClick={() => console.log("Avalie")} />
                    </div>
                </div>

                <span className="main-menu__closing-brace">{'}'}</span>


                <p className="main-menu__console">
                    <span className="main-menu__console-method">System.out.println</span>
                    ("Aprenda Orientação a Objetos gerenciando sua cidade!");
                </p>

                {aboutOpen && (
                    <Modal open={aboutOpen} title="Sobre o Cidade COO" onClose={() => setAboutOpen(false)}>
                        {aboutContent}
                    </Modal>
                )}

            </div>

        </div>
    );
}